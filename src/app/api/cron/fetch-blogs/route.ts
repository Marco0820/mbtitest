import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import trends from 'google-trends-api';
import axios from 'axios';
import * as cheerio from 'cheerio';

// This is the main function for the cron job
export async function GET() {
  console.log('Cron job started: fetching blogs');

  try {
    // 1. Get daily trending searches from Google Trends for the US
    const trendsData = await trends.dailyTrends({ geo: 'US' });
    let trendsJson;
    try {
      trendsJson = JSON.parse(trendsData);
    } catch (e) {
      console.error("Failed to parse Google Trends data. It's likely HTML, not JSON.", trendsData);
      // Exit gracefully if trends data is not valid JSON
      return NextResponse.json({ message: 'Could not fetch trends, likely due to Google blocking the request.' });
    }
    const trendingKeywords = trendsJson.default.trendingSearchesDays[0].trendingSearches.slice(0, 10).map((t: any) => t.title.query);

    console.log(`Found top 10 trending keywords: ${trendingKeywords.join(', ')}`);

    // 2. For each keyword, search and scrape the first article
    for (const keyword of trendingKeywords) {
      await processKeyword(keyword);
    }

    console.log('Cron job finished successfully.');
    return NextResponse.json({ message: 'Cron job executed successfully.' });

  } catch (error: any) {
    console.error('Error in cron job:', error);
    return NextResponse.json({ message: 'Cron job failed.', error: error.message }, { status: 500 });
  }
}

async function processKeyword(keyword: string) {
  try {
    console.log(`Processing keyword: ${keyword}`);

    // Use SearchApi.io to get Google search results
    // IMPORTANT: You need to get an API key from https://www.searchapi.io/
    // and add it to your .env.local file as SEARCHAPI_KEY
    const searchResponse = await axios.get('https://www.searchapi.io/api/v1/search', {
      params: {
        q: keyword,
        engine: 'google',
        api_key: process.env.SEARCHAPI_KEY, // Make sure to set this in your environment variables
      },
    });

    const firstResultUrl = searchResponse.data.organic_results?.[0]?.link;

    if (!firstResultUrl) {
      console.log(`No search result found for "${keyword}"`);
      return;
    }
    
    // Check if the article from this URL is already in the database
    const existingBlog = await prisma.blog.findUnique({ where: { sourceUrl: firstResultUrl } });
    if (existingBlog) {
      console.log(`Article from ${firstResultUrl} already exists. Skipping.`);
      return;
    }
    
    console.log(`Scraping article from: ${firstResultUrl}`);

    // 3. Scrape the article content
    const { data: pageHtml } = await axios.get(firstResultUrl, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' }});
    const $ = cheerio.load(pageHtml);

    const title = $('h1').first().text() || $('title').text();
    const content = $('article').text() || $('main').text() || $('p').text();
    const imageUrl = $('meta[property="og:image"]').attr('content') || $('article img').first().attr('src');
    
    // Basic content cleanup
    const cleanedContent = content.replace(/\s\s+/g, ' ').trim();
    if (!title || !cleanedContent || cleanedContent.length < 100) {
      console.log(`Could not extract meaningful content from ${firstResultUrl}. Skipping.`);
      return;
    }

    // 4. Save to database
    await prisma.blog.create({
      data: {
        trendingKeyword: keyword,
        title,
        content: cleanedContent,
        sourceUrl: firstResultUrl,
        imageUrl,
      },
    });

    console.log(`Successfully scraped and saved article for keyword: "${keyword}"`);

  } catch (error: any) {
    console.error(`Failed to process keyword "${keyword}":`, error.message);
  }
} 