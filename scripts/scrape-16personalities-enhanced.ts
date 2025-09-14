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
  excerpt?: string;
}

// 16Personalities 文章分类页面
const CATEGORY_URLS = [
  'https://www.mbti16personalities.online/articles?sortByOrder=desc&sortBy=popularity&category=romance',
  'https://www.mbti16personalities.online/articles?sortByOrder=desc&sortBy=popularity&category=careers',
  'https://www.mbti16personalities.online/articles?sortByOrder=desc&sortBy=popularity&category=relationships',
  'https://www.mbti16personalities.online/articles?sortByOrder=desc&sortBy=popularity&category=personal-growth',
  'https://www.mbti16personalities.online/articles?sortByOrder=desc&sortBy=popularity&category=workplace',
  'https://www.mbti16personalities.online/articles?sortByOrder=desc&sortBy=popularity&category=parenting',
  'https://www.mbti16personalities.online/articles?sortByOrder=desc&sortBy=popularity&category=education',
  'https://www.mbti16personalities.online/articles?sortByOrder=desc&sortBy=popularity&category=health',
  'https://www.mbti16personalities.online/articles?sortByOrder=desc&sortBy=popularity&category=technology',
  'https://www.mbti16personalities.online/articles?sortByOrder=desc&sortBy=popularity&category=entertainment'
];

async function scrapeArticlesFromPage(page: any, url: string, category: string): Promise<ArticleData[]> {
  console.log(`正在访问分类页面: ${category}`);
  
  try {
    await page.goto(url, { 
      waitUntil: 'networkidle2',
      timeout: 60000 
    });

    // 等待页面加载完成
    await page.waitForTimeout(3000);

    // 检查是否被Cloudflare拦截
    const title = await page.title();
    if (title.includes('请稍候') || title.includes('Just a moment')) {
      console.log('检测到Cloudflare保护，等待验证...');
      await page.waitForTimeout(10000);
    }

    // 滚动页面加载更多内容
    await page.evaluate(() => {
      return new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 100;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if(totalHeight >= scrollHeight){
            clearInterval(timer);
            resolve(undefined);
          }
        }, 100);
      });
    });

    // 提取文章列表
    const articles = await page.evaluate((categoryName: string) => {
      const articles: ArticleData[] = [];
      
      // 尝试多种选择器来找到文章链接
      const linkSelectors = [
        'a[href*="/articles/"]',
        '.article-link',
        '.post-link',
        '[class*="article"] a',
        '[class*="post"] a'
      ];

      let articleLinks: string[] = [];
      
      for (const selector of linkSelectors) {
        const links = document.querySelectorAll(selector);
        if (links.length > 0) {
          links.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.includes('/articles/') && !articleLinks.includes(href)) {
              articleLinks.push(href);
            }
          });
        }
      }

      // 如果没有找到特定链接，尝试从页面结构中提取
      if (articleLinks.length === 0) {
        const allLinks = document.querySelectorAll('a[href]');
        allLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href && href.includes('/articles/') && !articleLinks.includes(href)) {
            articleLinks.push(href);
          }
        });
      }

      // 为每个链接创建文章数据
      articleLinks.forEach(link => {
        const fullUrl = link.startsWith('http') ? link : `https://www.mbti16personalities.online${link}`;
        
        // 尝试找到对应的标题
        const linkElement = document.querySelector(`a[href="${link}"]`);
        let title = '';
        let excerpt = '';
        let imageUrl = '';

        if (linkElement) {
          // 查找标题
          const titleElement = linkElement.querySelector('h1, h2, h3, h4, .title, [class*="title"]') || 
                               linkElement.closest('article, .article, .post, [class*="article"], [class*="post"]')?.querySelector('h1, h2, h3, h4, .title, [class*="title"]');
          
          if (titleElement) {
            title = titleElement.textContent?.trim() || '';
          }

          // 查找摘要
          const excerptElement = linkElement.querySelector('.excerpt, .summary, .description, p') ||
                                linkElement.closest('article, .article, .post, [class*="article"], [class*="post"]')?.querySelector('.excerpt, .summary, .description, p');
          
          if (excerptElement) {
            excerpt = excerptElement.textContent?.trim() || '';
          }

          // 查找图片
          const imageElement = linkElement.querySelector('img') ||
                              linkElement.closest('article, .article, .post, [class*="article"], [class*="post"]')?.querySelector('img');
          
          if (imageElement) {
            const src = imageElement.getAttribute('src');
            imageUrl = src ? (src.startsWith('http') ? src : `https://www.mbti16personalities.online${src}`) : '';
          }
        }

        if (title) {
          articles.push({
            title,
            content: excerpt,
            sourceUrl: fullUrl,
            imageUrl: imageUrl || undefined,
            category: categoryName,
            excerpt
          });
        }
      });

      return articles;
    }, category);

    console.log(`从 ${category} 分类找到 ${articles.length} 篇文章`);
    return articles;

  } catch (error) {
    console.error(`访问分类页面失败 ${category}:`, error);
    return [];
  }
}

async function scrapeArticleContent(page: any, article: ArticleData): Promise<ArticleData> {
  try {
    console.log(`正在获取文章详情: ${article.title}`);
    
    await page.goto(article.sourceUrl, { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });

    await page.waitForTimeout(2000);

    const articleContent = await page.evaluate(() => {
      // 尝试多种选择器来获取文章内容
      const contentSelectors = [
        '.article-content',
        '.post-content', 
        '.entry-content',
        'article .content',
        '.main-content',
        '[class*="content"]',
        '.article-body',
        '.post-body'
      ];

      let content = '';
      for (const selector of contentSelectors) {
        const element = document.querySelector(selector);
        if (element) {
          content = element.innerHTML;
          break;
        }
      }

      // 如果没有找到特定容器，尝试获取文章主体
      if (!content) {
        const articleElement = document.querySelector('article, .article, .post');
        if (articleElement) {
          // 移除不需要的元素
          const unwantedSelectors = ['nav', 'header', 'footer', '.sidebar', '.navigation', '.menu', '.comments', '.social-share'];
          unwantedSelectors.forEach(selector => {
            const elements = articleElement.querySelectorAll(selector);
            elements.forEach(el => el.remove());
          });
          content = articleElement.innerHTML;
        }
      }

      // 如果还是没有内容，尝试获取页面主要内容
      if (!content) {
        const mainElement = document.querySelector('main, .main, #main');
        if (mainElement) {
          content = mainElement.innerHTML;
        }
      }

      return content;
    });

    return {
      ...article,
      content: articleContent || article.content || article.excerpt || ''
    };

  } catch (error) {
    console.error(`获取文章内容失败 ${article.title}:`, error);
    return article;
  }
}

async function scrape16PersonalitiesArticles(): Promise<ArticleData[]> {
  const browser = await puppeteer.launch({
    headless: true, // 设置为true以提高性能
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

    const allArticles: ArticleData[] = [];
    const processedUrls = new Set<string>();

    // 遍历所有分类页面
    for (const categoryUrl of CATEGORY_URLS) {
      const category = categoryUrl.split('category=')[1] || 'general';
      const articles = await scrapeArticlesFromPage(page, categoryUrl, category);
      
      // 去重并添加到总列表
      articles.forEach(article => {
        if (!processedUrls.has(article.sourceUrl)) {
          processedUrls.add(article.sourceUrl);
          allArticles.push(article);
        }
      });

      // 添加延迟避免被限制
      await page.waitForTimeout(3000);
    }

    console.log(`总共找到 ${allArticles.length} 篇唯一文章`);

    // 获取每篇文章的详细内容
    const detailedArticles: ArticleData[] = [];
    const maxArticles = Math.min(allArticles.length, 100); // 限制最多100篇
    
    for (let i = 0; i < maxArticles; i++) {
      const article = allArticles[i];
      const detailedArticle = await scrapeArticleContent(page, article);
      detailedArticles.push(detailedArticle);
      
      // 添加延迟避免被限制
      await page.waitForTimeout(1500);
      
      // 每10篇文章显示一次进度
      if ((i + 1) % 10 === 0) {
        console.log(`已处理 ${i + 1}/${maxArticles} 篇文章`);
      }
    }

    return detailedArticles;

  } finally {
    await browser.close();
  }
}

async function saveArticlesToDatabase(articles: ArticleData[]) {
  console.log(`开始保存 ${articles.length} 篇文章到数据库...`);

  let successCount = 0;
  let skipCount = 0;

  for (const article of articles) {
    try {
      // 检查文章是否已存在
      const existingArticle = await prisma.blog.findUnique({
        where: { sourceUrl: article.sourceUrl }
      });

      if (existingArticle) {
        console.log(`⏭️  文章已存在，跳过: ${article.title}`);
        skipCount++;
        continue;
      }

      await prisma.blog.create({
        data: {
          title: article.title,
          content: article.content,
          sourceUrl: article.sourceUrl,
          imageUrl: article.imageUrl,
          trendingKeyword: `16personalities-${article.category || 'article'}`,
          locale: 'en'
        }
      });
      
      console.log(`✅ 保存成功: ${article.title}`);
      successCount++;
      
    } catch (error) {
      console.error(`❌ 保存失败 ${article.title}:`, error);
    }
  }

  console.log(`\n📊 保存统计:`);
  console.log(`✅ 成功保存: ${successCount} 篇`);
  console.log(`⏭️  跳过重复: ${skipCount} 篇`);
  console.log(`❌ 失败: ${articles.length - successCount - skipCount} 篇`);
}

async function getCurrentArticleCount(): Promise<number> {
  try {
    const count = await prisma.blog.count({
      where: {
        trendingKeyword: {
          startsWith: '16personalities-'
        }
      }
    });
    return count;
  } catch (error) {
    console.error('获取文章数量失败:', error);
    return 0;
  }
}

async function main() {
  try {
    console.log('🚀 开始增强版 mbti16personalities.online 文章爬取...');
    
    const currentCount = await getCurrentArticleCount();
    console.log(`📊 当前数据库中已有 ${currentCount} 篇 16personalities 文章`);
    
    if (currentCount >= 100) {
      console.log('🎉 已达到100篇文章的目标！');
      return;
    }

    const articles = await scrape16PersonalitiesArticles();
    
    if (articles.length > 0) {
      await saveArticlesToDatabase(articles);
      
      const newCount = await getCurrentArticleCount();
      console.log(`🎉 爬取完成！当前总共有 ${newCount} 篇 16personalities 文章`);
      
      if (newCount >= 100) {
        console.log('🎯 恭喜！已达到100篇文章的目标！');
      } else {
        console.log(`📈 还需要 ${100 - newCount} 篇文章才能达到目标`);
      }
    } else {
      console.log('❌ 没有找到任何新文章');
    }
  } catch (error) {
    console.error('❌ 爬取过程中出现错误:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
