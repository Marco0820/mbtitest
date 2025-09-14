import 'dotenv/config';
import { prisma } from '../src/lib/db';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { HttpsProxyAgent } from 'https-proxy-agent';

// 添加stealth插件来绕过检测
puppeteer.use(StealthPlugin());

const PROXY_URL = process.env.HTTPS_PROXY || process.env.HTTP_PROXY;

interface ArticleData {
  title: string;
  content: string;
  sourceUrl: string;
  imageUrl?: string;
  category?: string;
  publishedDate?: string;
}

async function scrape16PersonalitiesArticles(): Promise<ArticleData[]> {
  const browser = await puppeteer.launch({
    headless: false, // 设置为false以便调试
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--disable-gpu',
      '--disable-web-security',
      '--disable-features=VizDisplayCompositor',
      '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    ]
  });

  try {
    const page = await browser.newPage();
    
    // 设置代理（如果配置了）
    if (PROXY_URL) {
      await page.authenticate({
        username: process.env.PROXY_USERNAME || '',
        password: process.env.PROXY_PASSWORD || ''
      });
    }

    // 设置视口和用户代理
    await page.setViewport({ width: 1920, height: 1080 });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    console.log('正在访问 mbti16personalities.online/articles...');
    await page.goto('https://www.mbti16personalities.online/articles', { 
      waitUntil: 'networkidle2',
      timeout: 60000 
    });

    // 等待页面加载完成
    await page.waitForTimeout(5000);

    // 检查是否被Cloudflare拦截
    const title = await page.title();
    if (title.includes('请稍候') || title.includes('Just a moment')) {
      console.log('检测到Cloudflare保护，等待验证...');
      await page.waitForTimeout(10000);
    }

    // 提取文章列表
    const articles = await page.evaluate(() => {
      const articleElements = document.querySelectorAll('article, .article, .post, [class*="article"], [class*="post"]');
      const articles: ArticleData[] = [];

      articleElements.forEach((element) => {
        const titleElement = element.querySelector('h1, h2, h3, .title, [class*="title"]');
        const linkElement = element.querySelector('a[href]');
        const imageElement = element.querySelector('img');
        const contentElement = element.querySelector('.excerpt, .summary, .description, p');

        if (titleElement && linkElement) {
          const title = titleElement.textContent?.trim();
          const link = linkElement.getAttribute('href');
          const imageUrl = imageElement?.getAttribute('src');
          const content = contentElement?.textContent?.trim() || '';

          if (title && link) {
            articles.push({
              title,
              content,
              sourceUrl: link.startsWith('http') ? link : `https://www.mbti16personalities.online${link}`,
              imageUrl: imageUrl?.startsWith('http') ? imageUrl : (imageUrl ? `https://www.mbti16personalities.online${imageUrl}` : undefined)
            });
          }
        }
      });

      return articles;
    });

    console.log(`找到 ${articles.length} 篇文章`);

    // 获取每篇文章的详细内容
    const detailedArticles: ArticleData[] = [];
    
    for (let i = 0; i < Math.min(articles.length, 10); i++) { // 限制前10篇文章
      const article = articles[i];
      console.log(`正在获取文章详情: ${article.title}`);
      
      try {
        await page.goto(article.sourceUrl, { 
          waitUntil: 'networkidle2',
          timeout: 30000 
        });

        const articleContent = await page.evaluate(() => {
          // 尝试多种选择器来获取文章内容
          const contentSelectors = [
            '.article-content',
            '.post-content', 
            '.entry-content',
            'article .content',
            '.main-content',
            '[class*="content"]'
          ];

          let content = '';
          for (const selector of contentSelectors) {
            const element = document.querySelector(selector);
            if (element) {
              content = element.innerHTML;
              break;
            }
          }

          // 如果没有找到特定容器，尝试获取body内容
          if (!content) {
            const body = document.querySelector('body');
            if (body) {
              // 移除导航、侧边栏等不需要的元素
              const unwantedSelectors = ['nav', 'header', 'footer', '.sidebar', '.navigation', '.menu'];
              unwantedSelectors.forEach(selector => {
                const elements = body.querySelectorAll(selector);
                elements.forEach(el => el.remove());
              });
              content = body.innerHTML;
            }
          }

          return content;
        });

        detailedArticles.push({
          ...article,
          content: articleContent || article.content
        });

        console.log(`成功获取文章: ${article.title}`);
        
        // 添加延迟避免被限制
        await page.waitForTimeout(2000);
        
      } catch (error) {
        console.error(`获取文章失败 ${article.title}:`, error);
        // 保留基本信息
        detailedArticles.push(article);
      }
    }

    return detailedArticles;

  } finally {
    await browser.close();
  }
}

async function saveArticlesToDatabase(articles: ArticleData[]) {
  console.log(`开始保存 ${articles.length} 篇文章到数据库...`);

  for (const article of articles) {
    try {
      await prisma.blog.upsert({
        where: { sourceUrl: article.sourceUrl },
        update: {
          title: article.title,
          content: article.content,
          imageUrl: article.imageUrl,
          trendingKeyword: '16personalities-article',
          locale: 'en'
        },
        create: {
          title: article.title,
          content: article.content,
          sourceUrl: article.sourceUrl,
          imageUrl: article.imageUrl,
          trendingKeyword: '16personalities-article',
          locale: 'en'
        }
      });
      console.log(`✅ 保存成功: ${article.title}`);
    } catch (error) {
      console.error(`❌ 保存失败 ${article.title}:`, error);
    }
  }
}

async function main() {
  try {
    console.log('🚀 开始爬取 mbti16personalities.online 文章...');
    const articles = await scrape16PersonalitiesArticles();
    
    if (articles.length > 0) {
      await saveArticlesToDatabase(articles);
      console.log(`🎉 成功爬取并保存了 ${articles.length} 篇文章！`);
    } else {
      console.log('❌ 没有找到任何文章');
    }
  } catch (error) {
    console.error('❌ 爬取过程中出现错误:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
