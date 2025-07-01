import 'dotenv/config';
import googleTrends from 'google-trends-api';
import { prisma } from '../src/lib/db';
import { HttpsProxyAgent } from 'https-proxy-agent';

const SEARCHAPI_KEY = process.env.SEARCHAPI_API_KEY;
const PROXY_URL = process.env.HTTPS_PROXY || process.env.HTTP_PROXY;

const agent = PROXY_URL ? new HttpsProxyAgent(PROXY_URL) : undefined;

async function searchWithSearchApi(query: string, locale: string, geo: string) {
  const url = `https://www.searchapi.io/api/v1/search?engine=google&q=${encodeURIComponent(
    query
  )}&location=${
    geo === 'US' ? 'Austin,Texas,United States' : 'Beijing,China'
  }&hl=${locale}&gl=${geo.toLowerCase()}&api_key=${SEARCHAPI_KEY}`;
  
  const fetchOptions: RequestInit = {};
  if (agent) {
    (fetchOptions as any).agent = agent;
  }

  const response = await fetch(url, fetchOptions);
  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`SearchApi request failed with status ${response.status}: ${errorBody}`);
  }
  return await response.json();
}

async function main() {
  const locale = process.argv[2] || 'en'; // Get locale from command line argument
  
  if (!SEARCHAPI_KEY) {
    console.error('[CRON] Error: SearchApi key is not configured. Please check your .env file.');
    return;
  }

  try {
    const geo = locale === 'zh' ? 'CN' : 'US';

    console.log(`[CRON] Starting job for locale: ${locale}, geo: ${geo}`);
    if (PROXY_URL) {
      console.log(`[CRON] Using proxy: ${PROXY_URL}`);
    }
    console.log(`[CRON] SEARCHAPI_KEY loaded: ${SEARCHAPI_KEY ? 'Yes' : 'No'}`);

    const trends = await googleTrends.dailyTrends({ geo }, {
      agent: agent,
    });
    const trendsJSON = JSON.parse(trends);
    console.log('[CRON] Fetched trends data successfully.');

    const trendingSearches =
      trendsJSON.default.trendingSearchesDays[0]?.trendingSearches.slice(
        0,
        10
      ) || [];

    if (trendingSearches.length === 0) {
      console.log('[CRON] No trends found.');
      return;
    }

    console.log(`[CRON] Found ${trendingSearches.length} trends.`);

    const articles = await Promise.all(
      trendingSearches.map(async (trend: any) => {
        const query = trend.title.query;
        try {
          console.log(`[CRON] Searching for: ${query}`);
          const searchResults = await searchWithSearchApi(query, locale, geo);
          
          if (!searchResults.organic_results) {
             console.log(`[CRON] No organic_results for "${query}", skipping. Full response:`, JSON.stringify(searchResults, null, 2));
             return null;
          }

          const firstResult = searchResults.organic_results[0];

          if (firstResult) {
            const articleData = {
              trendingKeyword: query,
              title: firstResult.title,
              content: firstResult.snippet || 'No snippet available.',
              sourceUrl: firstResult.link,
              imageUrl: firstResult.thumbnail || null,
              locale: locale,
            };
            console.log(`[CRON] Prepared article for DB: "${articleData.title}"`);
            return articleData;
          }
        } catch (searchError) {
          console.error(`[CRON] Failed to search for ${query}:`, searchError);
        }
        return null;
      })
    );

    const validArticles = articles.filter(Boolean);
    console.log(`[CRON] Found ${validArticles.length} valid articles to save.`);

    if (validArticles.length > 0) {
      for (const article of validArticles) {
        if (article) {
          try {
            await prisma.blog.upsert({
              where: { sourceUrl: article.sourceUrl },
              update: { ...article },
              create: { ...article },
            });
            console.log(`[CRON] Successfully upserted: "${article.title}"`);
          } catch (dbError) {
            console.error(`[CRON] Database error for "${article.title}":`, dbError);
          }
        }
      }
    }

    console.log('[CRON] Job finished. Successfully updated database.');

  } catch (error) {
    console.error('[CRON] A critical error occurred:', error);
  } finally {
    await prisma.$disconnect();
    console.log('[CRON] Disconnected from database.');
  }
}

main(); 