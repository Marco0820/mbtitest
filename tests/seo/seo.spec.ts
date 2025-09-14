import { test, expect } from '@playwright/test';

test.describe('SEO 测试', () => {
  test('首页 SEO 元数据', async ({ page }) => {
    await page.goto('/');
    
    // 验证页面标题
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(10);
    expect(title.length).toBeLessThan(60);
    
    // 验证 meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content');
    const description = await metaDescription.getAttribute('content');
    expect(description).toBeTruthy();
    expect(description!.length).toBeGreaterThan(120);
    expect(description!.length).toBeLessThan(160);
    
    // 验证 meta keywords
    const metaKeywords = page.locator('meta[name="keywords"]');
    if (await metaKeywords.count() > 0) {
      const keywords = await metaKeywords.getAttribute('content');
      expect(keywords).toBeTruthy();
      expect(keywords!.length).toBeGreaterThan(0);
    }
  });

  test('Open Graph 标签', async ({ page }) => {
    await page.goto('/');
    
    // 验证 Open Graph 标签
    const ogTitle = page.locator('meta[property="og:title"]');
    if (await ogTitle.count() > 0) {
      await expect(ogTitle).toHaveAttribute('content');
      const title = await ogTitle.getAttribute('content');
      expect(title).toBeTruthy();
    }
    
    const ogDescription = page.locator('meta[property="og:description"]');
    if (await ogDescription.count() > 0) {
      await expect(ogDescription).toHaveAttribute('content');
      const description = await ogDescription.getAttribute('content');
      expect(description).toBeTruthy();
    }
    
    const ogImage = page.locator('meta[property="og:image"]');
    if (await ogImage.count() > 0) {
      await expect(ogImage).toHaveAttribute('content');
      const image = await ogImage.getAttribute('content');
      expect(image).toBeTruthy();
      expect(image).toMatch(/^https?:\/\//);
    }
    
    const ogUrl = page.locator('meta[property="og:url"]');
    if (await ogUrl.count() > 0) {
      await expect(ogUrl).toHaveAttribute('content');
      const url = await ogUrl.getAttribute('content');
      expect(url).toBeTruthy();
      expect(url).toMatch(/^https?:\/\//);
    }
    
    const ogType = page.locator('meta[property="og:type"]');
    if (await ogType.count() > 0) {
      await expect(ogType).toHaveAttribute('content');
      const type = await ogType.getAttribute('content');
      expect(type).toBeTruthy();
    }
  });

  test('Twitter Card 标签', async ({ page }) => {
    await page.goto('/');
    
    // 验证 Twitter Card 标签
    const twitterCard = page.locator('meta[name="twitter:card"]');
    if (await twitterCard.count() > 0) {
      await expect(twitterCard).toHaveAttribute('content');
      const card = await twitterCard.getAttribute('content');
      expect(card).toBeTruthy();
    }
    
    const twitterTitle = page.locator('meta[name="twitter:title"]');
    if (await twitterTitle.count() > 0) {
      await expect(twitterTitle).toHaveAttribute('content');
      const title = await twitterTitle.getAttribute('content');
      expect(title).toBeTruthy();
    }
    
    const twitterDescription = page.locator('meta[name="twitter:description"]');
    if (await twitterDescription.count() > 0) {
      await expect(twitterDescription).toHaveAttribute('content');
      const description = await twitterDescription.getAttribute('content');
      expect(description).toBeTruthy();
    }
    
    const twitterImage = page.locator('meta[name="twitter:image"]');
    if (await twitterImage.count() > 0) {
      await expect(twitterImage).toHaveAttribute('content');
      const image = await twitterImage.getAttribute('content');
      expect(image).toBeTruthy();
      expect(image).toMatch(/^https?:\/\//);
    }
  });

  test('结构化数据', async ({ page }) => {
    await page.goto('/');
    
    // 验证 JSON-LD 结构化数据
    const jsonLdScripts = page.locator('script[type="application/ld+json"]');
    const scriptCount = await jsonLdScripts.count();
    
    if (scriptCount > 0) {
      for (let i = 0; i < scriptCount; i++) {
        const script = jsonLdScripts.nth(i);
        const content = await script.textContent();
        expect(content).toBeTruthy();
        
        // 验证 JSON 格式
        try {
          const jsonData = JSON.parse(content!);
          expect(jsonData).toBeTruthy();
          expect(typeof jsonData).toBe('object');
        } catch (error) {
          expect.fail('结构化数据 JSON 格式无效');
        }
      }
    }
  });

  test('标题层级结构', async ({ page }) => {
    await page.goto('/');
    
    // 验证标题层级
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
    
    const h1Text = await h1.textContent();
    expect(h1Text).toBeTruthy();
    expect(h1Text!.length).toBeGreaterThan(0);
    
    // 验证标题顺序
    const headings = page.locator('h1, h2, h3, h4, h5, h6');
    const headingCount = await headings.count();
    
    let currentLevel = 0;
    for (let i = 0; i < headingCount; i++) {
      const heading = headings.nth(i);
      const tagName = await heading.evaluate(el => el.tagName);
      const level = parseInt(tagName.substring(1));
      
      if (i === 0) {
        expect(level).toBe(1); // 第一个标题应该是 h1
      } else {
        expect(level - currentLevel).toBeLessThanOrEqual(1); // 标题层级不能跳跃
      }
      
      currentLevel = level;
    }
  });

  test('图片 SEO 优化', async ({ page }) => {
    await page.goto('/');
    
    // 验证图片 alt 属性
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      const src = await img.getAttribute('src');
      
      expect(alt).toBeTruthy();
      expect(alt!.length).toBeGreaterThan(0);
      expect(src).toBeTruthy();
      
      // 验证图片文件名有意义
      if (src && !src.startsWith('data:')) {
        expect(src).toMatch(/\.(jpg|jpeg|png|webp|svg)$/i);
      }
    }
  });

  test('内部链接结构', async ({ page }) => {
    await page.goto('/');
    
    // 验证内部链接
    const internalLinks = page.locator('a[href^="/"], a[href^="./"], a[href^="../"]');
    const linkCount = await internalLinks.count();
    
    expect(linkCount).toBeGreaterThan(0);
    
    for (let i = 0; i < Math.min(linkCount, 10); i++) {
      const link = internalLinks.nth(i);
      const href = await link.getAttribute('href');
      const text = await link.textContent();
      
      expect(href).toBeTruthy();
      expect(text).toBeTruthy();
      expect(text!.length).toBeGreaterThan(0);
    }
  });

  test('页面加载速度 SEO', async ({ page }) => {
    await page.goto('/');
    
    // 获取页面加载性能指标
    const performanceMetrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        loadTime: navigation.loadEventEnd - navigation.loadEventStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        totalTime: navigation.loadEventEnd - navigation.navigationStart,
      };
    });
    
    // 验证页面加载速度符合 SEO 要求
    expect(performanceMetrics.loadTime).toBeLessThan(3000); // 3秒内加载完成
    expect(performanceMetrics.domContentLoaded).toBeLessThan(2000); // 2秒内DOM加载完成
    expect(performanceMetrics.totalTime).toBeLessThan(5000); // 5秒内完全加载
  });

  test('移动端 SEO', async ({ page }) => {
    // 设置移动端视口
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // 验证移动端视口设置
    const viewport = page.locator('meta[name="viewport"]');
    await expect(viewport).toHaveAttribute('content');
    const viewportContent = await viewport.getAttribute('content');
    expect(viewportContent).toContain('width=device-width');
    expect(viewportContent).toContain('initial-scale=1');
    
    // 验证移动端友好性
    const textElements = page.locator('p, h1, h2, h3, h4, h5, h6');
    const elementCount = await textElements.count();
    
    for (let i = 0; i < Math.min(elementCount, 5); i++) {
      const element = textElements.nth(i);
      await expect(element).toBeVisible();
    }
  });

  test('多语言 SEO', async ({ page }) => {
    const testLocales = ['en', 'zh-CN', 'es', 'ar'];
    
    for (const locale of testLocales) {
      await page.goto(`/${locale}`);
      
      // 验证语言属性
      const html = page.locator('html');
      const lang = await html.getAttribute('lang');
      expect(lang).toBe(locale);
      
      // 验证 hreflang 标签
      const hreflangTags = page.locator('link[rel="alternate"][hreflang]');
      const hreflangCount = await hreflangTags.count();
      expect(hreflangCount).toBeGreaterThan(0);
      
      // 验证页面标题
      const title = await page.title();
      expect(title).toBeTruthy();
      expect(title.length).toBeGreaterThan(0);
    }
  });

  test('博客页面 SEO', async ({ page }) => {
    await page.goto('/blog');
    
    // 验证博客页面标题
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title).toMatch(/博客|Blog|文章/);
    
    // 验证博客文章链接
    const blogLinks = page.locator('a[href*="/blog/"]');
    const linkCount = await blogLinks.count();
    
    if (linkCount > 0) {
      for (let i = 0; i < Math.min(linkCount, 5); i++) {
        const link = blogLinks.nth(i);
        const href = await link.getAttribute('href');
        const text = await link.textContent();
        
        expect(href).toBeTruthy();
        expect(text).toBeTruthy();
        expect(text!.length).toBeGreaterThan(0);
      }
    }
  });

  test('性格类型页面 SEO', async ({ page }) => {
    const testTypes = ['intj', 'enfp', 'istj'];
    
    for (const type of testTypes) {
      await page.goto(`/personalities/${type}`);
      
      // 验证页面标题包含性格类型
      const title = await page.title();
      expect(title).toBeTruthy();
      expect(title).toMatch(new RegExp(type, 'i'));
      
      // 验证 meta description
      const metaDescription = page.locator('meta[name="description"]');
      if (await metaDescription.count() > 0) {
        const description = await metaDescription.getAttribute('content');
        expect(description).toBeTruthy();
        expect(description!.length).toBeGreaterThan(120);
      }
    }
  });

  test('站点地图和 robots.txt', async ({ page }) => {
    // 验证 robots.txt
    const robotsResponse = await page.goto('/robots.txt');
    if (robotsResponse && robotsResponse.status() === 200) {
      const robotsContent = await robotsResponse.text();
      expect(robotsContent).toBeTruthy();
    }
    
    // 验证站点地图
    const sitemapResponse = await page.goto('/sitemap.xml');
    if (sitemapResponse && sitemapResponse.status() === 200) {
      const sitemapContent = await sitemapResponse.text();
      expect(sitemapContent).toBeTruthy();
      expect(sitemapContent).toContain('<?xml');
    }
  });

  test('面包屑导航', async ({ page }) => {
    await page.goto('/personalities/intj');
    
    // 验证面包屑导航
    const breadcrumb = page.locator('[aria-label*="breadcrumb"], .breadcrumb, nav[aria-label*="breadcrumb"]');
    if (await breadcrumb.count() > 0) {
      await expect(breadcrumb).toBeVisible();
      
      // 验证面包屑链接
      const breadcrumbLinks = breadcrumb.locator('a');
      const linkCount = await breadcrumbLinks.count();
      expect(linkCount).toBeGreaterThan(0);
    }
  });
});
