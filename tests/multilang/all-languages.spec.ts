import { test, expect } from '@playwright/test';

const supportedLocales = [
  'en', 'zh-CN', 'zh-TW', 'es', 'ar', 'pt', 'ja', 'ru', 
  'fr', 'de', 'ko', 'hi', 'tr', 'vi', 'th', 'it', 'ur', 
  'pl', 'id', 'nl', 'fa'
];

const testPages = [
  '', '/about', '/personalities', '/blog', '/people', '/test', '/faq'
];

test.describe('多语言支持测试', () => {
  test('所有语言首页加载', async ({ page }) => {
    for (const locale of supportedLocales) {
      await page.goto(`/${locale}`);
      
      // 验证页面加载成功
      await expect(page.locator('h1')).toBeVisible();
      
      // 验证页面标题包含语言相关内容
      const title = await page.title();
      expect(title).toBeTruthy();
      expect(title.length).toBeGreaterThan(0);
      
      // 验证页面内容不是英文（除非是英文）
      if (locale !== 'en') {
        const bodyText = await page.locator('body').textContent();
        // 这里可以添加特定语言的验证逻辑
        expect(bodyText).toBeTruthy();
      }
    }
  });

  test('语言切换功能', async ({ page }) => {
    await page.goto('/en');
    
    // 查找语言切换器
    const languageSwitcher = page.locator('[data-testid="language-switcher"], .language-switcher, [aria-label*="language"], [aria-label*="语言"]').first();
    
    if (await languageSwitcher.isVisible()) {
      await languageSwitcher.click();
      
      // 验证语言选项
      const languageOptions = page.locator('[role="menuitem"], .language-option, [data-language]');
      const optionCount = await languageOptions.count();
      expect(optionCount).toBeGreaterThan(0);
      
      // 测试切换到中文
      const chineseOption = page.locator('[data-language="zh-CN"], [data-locale="zh-CN"], button:has-text("中文")').first();
      if (await chineseOption.isVisible()) {
        await chineseOption.click();
        await page.waitForURL(/zh-CN/);
        await expect(page.locator('h1')).toBeVisible();
      }
    }
  });

  test('RTL 语言支持', async ({ page }) => {
    const rtlLocales = ['ar', 'fa', 'ur'];
    
    for (const locale of rtlLocales) {
      await page.goto(`/${locale}`);
      
      // 验证 RTL 样式
      const htmlElement = page.locator('html');
      const dir = await htmlElement.getAttribute('dir');
      expect(dir).toBe('rtl');
      
      // 验证页面内容
      await expect(page.locator('h1')).toBeVisible();
    }
  });

  test('所有页面多语言支持', async ({ page }) => {
    const testLocales = ['en', 'zh-CN', 'es', 'ar']; // 测试主要语言
    
    for (const locale of testLocales) {
      for (const pagePath of testPages) {
        const url = `/${locale}${pagePath}`;
        await page.goto(url);
        
        // 验证页面加载成功
        await expect(page.locator('h1, h2')).toBeVisible();
        
        // 验证页面内容
        const bodyText = await page.locator('body').textContent();
        expect(bodyText).toBeTruthy();
        expect(bodyText.length).toBeGreaterThan(0);
      }
    }
  });

  test('性格类型页面多语言', async ({ page }) => {
    const testTypes = ['intj', 'enfp', 'istj'];
    const testLocales = ['en', 'zh-CN', 'es', 'ar'];
    
    for (const locale of testLocales) {
      for (const type of testTypes) {
        await page.goto(`/${locale}/personalities/${type}`);
        
        // 验证页面加载成功
        await expect(page.locator('h1, h2')).toContainText(type.toUpperCase());
        
        // 验证性格类型信息
        const personalityInfo = page.locator('[data-testid="personality-info"], .personality-info, .type-info');
        await expect(personalityInfo).toBeVisible();
      }
    }
  });

  test('博客页面多语言', async ({ page }) => {
    const testLocales = ['en', 'zh-CN', 'es'];
    
    for (const locale of testLocales) {
      await page.goto(`/${locale}/blog`);
      
      // 验证页面加载成功
      await expect(page.locator('h1, h2')).toContainText(/博客|Blog|文章/);
      
      // 验证博客列表
      const blogPosts = page.locator('[data-testid="blog-post"], .blog-post, .post-card');
      const postCount = await blogPosts.count();
      expect(postCount).toBeGreaterThan(0);
    }
  });

  test('测试页面多语言', async ({ page }) => {
    const testLocales = ['en', 'zh-CN', 'es'];
    
    for (const locale of testLocales) {
      await page.goto(`/${locale}/test`);
      
      // 验证页面加载成功
      await expect(page.locator('h1, h2')).toContainText(/测试|Test|问卷/);
      
      // 验证测试问题
      const questions = page.locator('[data-testid="question"], .question, .test-question');
      const questionCount = await questions.count();
      expect(questionCount).toBeGreaterThan(0);
    }
  });

  test('SEO 多语言支持', async ({ page }) => {
    const testLocales = ['en', 'zh-CN', 'es', 'ar'];
    
    for (const locale of testLocales) {
      await page.goto(`/${locale}`);
      
      // 验证 hreflang 标签
      const hreflangTags = page.locator('link[rel="alternate"][hreflang]');
      const hreflangCount = await hreflangTags.count();
      expect(hreflangCount).toBeGreaterThan(0);
      
      // 验证语言属性
      const htmlElement = page.locator('html');
      const lang = await htmlElement.getAttribute('lang');
      expect(lang).toBe(locale);
    }
  });

  test('多语言性能测试', async ({ page }) => {
    const testLocales = ['en', 'zh-CN', 'es', 'ar'];
    
    for (const locale of testLocales) {
      const startTime = Date.now();
      await page.goto(`/${locale}`);
      await page.waitForLoadState('networkidle');
      const loadTime = Date.now() - startTime;
      
      // 验证加载时间在合理范围内
      expect(loadTime).toBeLessThan(10000); // 10秒内加载完成
    }
  });

  test('多语言内容一致性', async ({ page }) => {
    const testLocales = ['en', 'zh-CN', 'es'];
    
    // 测试首页内容结构一致性
    for (const locale of testLocales) {
      await page.goto(`/${locale}`);
      
      // 验证主要组件都存在
      const heroSection = page.locator('[data-testid="hero"], .hero, section').first();
      await expect(heroSection).toBeVisible();
      
      const featuresSection = page.locator('[data-testid="features"], .features, section').nth(1);
      await expect(featuresSection).toBeVisible();
      
      const communitySection = page.locator('[data-testid="community"], .community, section').nth(2);
      await expect(communitySection).toBeVisible();
    }
  });
});
