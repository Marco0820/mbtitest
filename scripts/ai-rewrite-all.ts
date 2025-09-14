import dotenv from 'dotenv';
import path from 'path';
import { PrismaClient, Prisma } from '../src/generated/prisma'; // Corrected import path
import axios from 'axios';

// --- Configuration ---
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY; // Reverted to use environment variable
const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';
let prisma: PrismaClient; // Defer initialization

// --- Main Execution ---
async function main() {
    if (!DEEPSEEK_API_KEY) {
        console.error("FATAL ERROR: DEEPSEEK_API_KEY is not set. Please check your .env.local file.");
        return;
    }
    console.log("DeepSeek API Key loaded successfully.");
    
    prisma = new PrismaClient(); // Initialize after env vars are loaded

    try {
        await modifyAllPersonalities();
        await modifyAllArticles();
        console.log("\n✅ All content modification tasks are complete.");
    } catch (error) {
        console.error("An error occurred during the main execution:", error);
    } finally {
        if (prisma) {
            await prisma.$disconnect();
            console.log('\nDatabase connection closed.');
        }
    }
}

// --- Personality Details Modifier ---
async function modifyAllPersonalities() {
    console.log('\n--- Starting to process all personality details ---');
    try {
        const personalities = await prisma.personalityDetails.findMany({ where: { locale: 'en' } });
        console.log(`Found ${personalities.length} English personality profiles to process.`);
        for (const personality of personalities) {
            console.log(`\nProcessing personality type: ${personality.type}`);
            const rewrittenDetails = await rewriteJsonObject(personality.details as Prisma.JsonObject);
            await prisma.personalityDetails.update({
                where: { type_locale: { type: personality.type, locale: personality.locale }},
                data: { details: rewrittenDetails },
            });
            console.log(`  -> Successfully updated personality: ${personality.type}`);
            await new Promise(resolve => setTimeout(resolve, 1000)); // Rate limit delay
        }
        console.log('✅ All personality details have been processed!');
    } catch (error) {
        console.error('❌ An error occurred while processing personalities:', error);
    }
}

async function rewriteJsonObject(obj: any): Promise<any> {
    if (Array.isArray(obj)) {
        return Promise.all(obj.map(item => rewriteJsonObject(item)));
    } else if (typeof obj === 'object' && obj !== null) {
        const newObj: { [key: string]: any } = {};
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                newObj[key] = await rewriteJsonObject(obj[key]);
            }
        }
        return newObj;
    } else if (typeof obj === 'string' && obj.length > 20) {
        return await rewritePersonalityText(obj);
    } else {
        return obj;
    }
}

async function rewritePersonalityText(text: string): Promise<string> {
    const systemPrompt = "You are a professional editor. Your task is to polish and enhance the following text related to personality types. Preserve the original meaning and key information, but improve readability, engagement, and overall quality. Return only the revised text, nothing else.";
    return await callDeepSeekAPI(systemPrompt, text);
}

// --- Blog Article Modifier ---
async function modifyAllArticles() {
    console.log('\n--- Starting to process all blog articles ---');
    try {
        const articles = await prisma.blog.findMany({ where: { locale: 'en' } });
        console.log(`Found ${articles.length} English articles to process.`);
        for (const article of articles) {
            if (!article.content || article.content.length < 100) {
                console.log(`\nSkipping short or empty article: ${article.title}`);
                continue;
            }
            console.log(`\nProcessing article: ${article.title}`);
            const rewrittenContent = await rewriteArticleContent(article.title, article.content);
            if (rewrittenContent && rewrittenContent !== article.content) {
                await prisma.blog.update({
                    where: { id: article.id },
                    data: { content: rewrittenContent },
                });
                console.log(`  -> Successfully updated article: ${article.title}`);
            } else {
                console.log(`  -> Content unchanged, skipping update for: ${article.title}`);
            }
            await new Promise(resolve => setTimeout(resolve, 1000)); // Rate limit delay
        }
        console.log('✅ All blog articles have been processed!');
    } catch (error) {
        console.error('❌ An error occurred while processing articles:', error);
    }
}

async function rewriteArticleContent(title: string, content: string): Promise<string> {
    const systemPrompt = "You are a professional editor specializing in psychology and personal growth. Your task is to polish and enhance the following article content. You must preserve the original meaning, structure, and key information. Your goal is to improve readability, engagement, and overall quality without altering the core message. The output must be the revised content in the original HTML format, and nothing else. Do not add any introductory or concluding text.";
    return await callDeepSeekAPI(systemPrompt, `Article Title: ${title}\n\n${content}`);
}

// --- Unified DeepSeek API Caller ---
async function callDeepSeekAPI(systemPrompt: string, userContent: string): Promise<string> {
    console.log(`  -> Calling DeepSeek API...`);
    try {
        const response = await axios.post(DEEPSEEK_API_URL, {
            model: "deepseek-chat",
            messages: [{ role: "system", content: systemPrompt }, { role: "user", content: userContent }],
            temperature: 0.7,
            stream: false,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
            }
        });
        const rewrittenText = response.data.choices[0].message.content;
        if (rewrittenText) {
            console.log(`  -> AI rewrite complete.`);
            return rewrittenText.trim();
        } else {
            throw new Error("DeepSeek API did not return content.");
        }
    } catch (error: any) {
        console.error(`  -> Failed to call DeepSeek API:`, error.response ? error.response.data : error.message);
        return userContent; // Return original on failure
    }
}

main();
