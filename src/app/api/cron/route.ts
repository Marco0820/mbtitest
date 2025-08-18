import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { request } from 'undici';
import { Parser } from 'xml2js';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 300; // 5 minutes

const SEARCHAPI_KEY = process.env.SEARCHAPI_API_KEY;
const PROXY_URL = process.env.HTTPS_PROXY || process.env.HTTP_PROXY;

// This is the definitive, library-free way to handle proxied requests in Node.js
async function proxiedFetch(url: string, options: any = {}) {
  if (!PROXY_URL) {
    return fetch(url, options);
  }

  console.log(`[API] Using undici proxy for URL: ${url}`);
  const { statusCode, body } = await request(url, {
    ...options,
    dispatcher: new (require('undici').ProxyAgent)(PROXY_URL),
  });
  
  // Create a Response-like object from the undici response
  return {
    ok: statusCode >= 200 && statusCode < 300,
    status: statusCode,
    json: async () => JSON.parse(await body.text()),
    text: async () => await body.text(),
  };
}

// Refactored to fetch Google Trends data from RSS feed
async function getGoogleTrends(geo: string): Promise<string[]> {
  console.log(`[API] Fetching Google Trends RSS for geo: ${geo}`);
  const trendsUrl = `https://trends.google.com/trends/trendingsearches/daily/rss?geo=${geo}`;

  const fetchOptions = {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
    }
  };

  const response = await proxiedFetch(trendsUrl, fetchOptions);

  if (!response.ok) {
    const errorBody = await response.text();
    console.error(`[API] Google Trends RSS fetch failed: ${response.status}`, errorBody);
    throw new Error(`Failed to fetch Google Trends RSS data: ${response.status}`);
  }

  const xmlText = await response.text();
  const parser = new Parser();
  const result = await parser.parseStringPromise(xmlText);
  
  const trends = result.rss.channel[0].item.map((item: any) => item.title[0]);
  console.log('[API] Successfully fetched and parsed Google Trends RSS data.');
  return trends.slice(0, 10); // Return top 10 trends
}

async function searchWithSearchApi(query: string, locale: string, geo: string) {
  console.log(`[API] searchWithSearchApi: Searching for "${query}" with locale=${locale}, geo=${geo}`);
  const url = `https://www.searchapi.io/api/v1/search?engine=google&q=${encodeURIComponent(
    query
  )}&location=${
    geo === 'US' ? 'Austin,Texas,United States' : 'Beijing,China'
  }&hl=${locale}&gl=${geo.toLowerCase()}&api_key=${SEARCHAPI_KEY}`;
  
  const response = await proxiedFetch(url);
  if (!response.ok) {
    const errorBody = await response.text();
    console.error(`[API] searchWithSearchApi: Request failed with status ${response.status}: ${errorBody}`);
    throw new Error(`SearchApi request failed with status ${response.status}`);
  }
  console.log(`[API] searchWithSearchApi: Successfully fetched results for "${query}".`);
  return await response.json();
}

export async function GET(request: Request) {
  console.log('[API] Cron job started.');
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'en';

  if (!SEARCHAPI_KEY) {
    console.error('[API] Error: SearchApi key is not configured.');
    return NextResponse.json({ error: 'SearchApi key is not configured. Please check server environment variables.' }, { status: 500 });
  }

  try {
    const geo = locale === 'zh' ? 'CN' : 'US';
    console.log(`[API] Processing job for locale: ${locale}, geo: ${geo}`);
    
    if (PROXY_URL) {
      console.log(`[API] Using proxy: ${PROXY_URL}`);
    }

    console.log('[API] Fetching Google Trends...');
    const trendingSearches = await getGoogleTrends(geo);

    if (trendingSearches.length === 0) {
      console.log('[API] No trends found.');
      return NextResponse.json({ message: 'No trends found, job finished.' });
    }
    console.log(`[API] Found ${trendingSearches.length} trends.`);

    const articles = await Promise.all(
      trendingSearches.map(async (query: string) => {
        try {
          console.log(`[API] Processing trend: "${query}"`);
          const searchResults = await searchWithSearchApi(query, locale, geo);
          
          if (!searchResults.organic_results || searchResults.organic_results.length === 0) {
            console.log(`[API] No organic_results for "${query}", skipping.`);
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
            console.log(`[API] Prepared article for DB: "${articleData.title}"`);
            return articleData;
          }
        } catch (searchError: any) {
          console.error(`[API] Failed to process trend "${query}":`, searchError.message);
        }
        return null;
      })
    );

    const validArticles = articles.filter(Boolean);
    console.log(`[API] Found ${validArticles.length} valid articles to save.`);

    if (validArticles.length > 0) {
      for (const article of validArticles) {
        if (article) {
          try {
            await prisma.blog.upsert({
              where: { sourceUrl: article.sourceUrl },
              update: { ...article },
              create: { ...article },
            });
            console.log(`[API] Successfully upserted: "${article.title}"`);
          } catch (dbError: any) {
            console.error(`[API] Database error for "${article.title}":`, dbError.message);
          }
        }
      }
    }

    console.log('[API] Cron job finished successfully.');
    const responseData = {
      message: 'Successfully updated database.',
      articles_added: validArticles.length,
    };

    return NextResponse.json(responseData);
  } catch (error: any) {
    console.error('[API] A critical, unhandled error occurred in the cron job:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.', details: error.message }, { status: 500 });
  }
} 