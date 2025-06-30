import { NextResponse } from 'next/server';
import { getJson } from "serpapi";
import googleTrends from 'google-trends-api';
import { prisma } from '@/lib/db';

const SERPAPI_KEY = process.env.SERPAPI_API_KEY;

interface CacheData {
  message: string;
}

// A simple in-memory cache to avoid spamming APIs during development
const cache: { data: CacheData | null, timestamp: number } = {
  data: null,
  timestamp: 0,
};

const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const locale = searchParams.get('locale') || 'en';
  
  if (!SERPAPI_KEY) {
    return NextResponse.json({ error: 'SerpAPI key is not configured.' }, { status: 500 });
  }

  // Use cache in development to avoid hitting API limits
  if (process.env.NODE_ENV === 'development') {
      const now = Date.now();
      if (now - cache.timestamp < CACHE_DURATION && cache.data) {
        console.log("Serving from cache");
        return NextResponse.json(cache.data);
      }
  }

  try {
    const geo = locale === 'zh' ? 'CN' : 'US';
    
    console.log(`Fetching trends for geo: ${geo}`);
    const trends = await googleTrends.dailyTrends({ geo });
    const trendsJSON = JSON.parse(trends);
    const trendingSearches = trendsJSON.default.trendingSearchesDays[0]?.trendingSearches.slice(0, 10) || [];
    
    if (trendingSearches.length === 0) {
        return NextResponse.json({ message: 'No trends found.' }, { status: 200 });
    }

    console.log(`Found ${trendingSearches.length} trends.`);

    const articles = await Promise.all(
      trendingSearches.map(async (trend: any) => {
        try {
          const query = trend.title.query;
          console.log(`Searching for: ${query}`);

          const searchResults = await getJson({
            engine: "google",
            q: query,
            api_key: SERPAPI_KEY,
            location: geo === 'US' ? 'Austin, Texas, United States' : 'Beijing, China',
            hl: locale,
            gl: geo.toLowerCase(),
          });
          
          const firstResult = searchResults.organic_results?.[0];

          if (firstResult) {
            return {
              trendingKeyword: query,
              title: firstResult.title,
              content: firstResult.snippet || "No snippet available.",
              sourceUrl: firstResult.link,
              imageUrl: firstResult.thumbnail || null,
              locale: locale
            };
          }
        } catch (searchError) {
          console.error(`Failed to search for ${trend.title.query}:`, searchError);
        }
        return null;
      })
    );

    const validArticles = articles.filter(Boolean);
    console.log(`Found ${validArticles.length} valid articles.`);

    for (const article of validArticles) {
      if (article) {
         await prisma.blog.upsert({
            where: { sourceUrl: article.sourceUrl },
            update: { ...article },
            create: { ...article },
        });
      }
    }
    
    console.log("Successfully updated database.");
    
    const responseData = { message: `Successfully populated ${validArticles.length} articles for locale '${locale}'.` };
    
    if (process.env.NODE_ENV === 'development') {
      cache.data = responseData;
      cache.timestamp = Date.now();
    }
    
    return NextResponse.json(responseData);

  } catch (error) {
    console.error('Cron job failed:', error);
    return NextResponse.json({ error: 'Failed to fetch trends or articles' }, { status: 500 });
  }
} 