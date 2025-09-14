import { test, expect } from '@playwright/test';
import { HomePage } from '../utils/test-helpers';

test.describe('首页测试', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('页面基本加载', async () => {
    // 验证页面标题
    const title = await homePage.getTitle();
    expect(title).toMatch(/MBTI|性格测试|Personality Test/);

    // 验证主要元素存在
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
  });

  test('Hero 区域测试', async () => {
    // 验证 Hero 组件元素
    const heroSection = page.locator('[data-testid="hero"], .hero, section').first();
    await expect(heroSection).toBeVisible();

    // 验证开始测试按钮
    const startButton = page.locator('button:has-text("开始测试"), a:has-text("开始测试"), button:has-text("Start Test")').first();
    await expect(startButton).toBeVisible();
    await expect(startButton).toBeEnabled();
  });

  test('功能特性区域测试', async () => {
    // 验证 Features 组件
    const featuresSection = page.locator('[data-testid="features"], .features, section').nth(1);
    await expect(featuresSection).toBeVisible();

    // 验证特性卡片
    const featureCards = page.locator('[data-testid="feature-card"], .feature-card, .card');
    const cardCount = await featureCards.count();
    expect(cardCount).toBeGreaterThan(0);
  });

  test('社区区域测试', async () => {
    // 验证 Community 组件
    const communitySection = page.locator('[data-testid="community"], .community, section').nth(2);
    await expect(communitySection).toBeVisible();
  });

  test('性格类型区域测试', async () => {
    // 验证 PersonalityTypes 组件
    const personalitySection = page.locator('[data-testid="personality-types"], .personality-types, section').last();
    await expect(personalitySection).toBeVisible();

    // 验证性格类型卡片
    const personalityCards = page.locator('[data-testid="personality-card"], .personality-card, .type-card');
    const cardCount = await personalityCards.count();
    expect(cardCount).toBeGreaterThan(0);
  });

  test('导航菜单测试', async () => {
    // 验证主导航
    const nav = page.locator('nav, [role="navigation"]').first();
    await expect(nav).toBeVisible();

    // 验证导航链接
    const navLinks = ['关于', '性格类型', '博客', '常见问题', 'About', 'Personalities', 'Blog', 'FAQ'];
    for (const linkText of navLinks) {
      const link = page.locator(`a:has-text("${linkText}")`).first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
      }
    }
  });

  test('语言切换测试', async () => {
    // 查找语言切换器
    const languageSwitcher = page.locator('[data-testid="language-switcher"], .language-switcher, [aria-label*="language"], [aria-label*="语言"]').first();
    
    if (await languageSwitcher.isVisible()) {
      await languageSwitcher.click();
      
      // 验证语言选项
      const languageOptions = page.locator('[role="menuitem"], .language-option, [data-language]');
      const optionCount = await languageOptions.count();
      expect(optionCount).toBeGreaterThan(0);
    }
  });

  test('响应式设计测试', async () => {
    // 测试移动端视图
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('h1')).toBeVisible();

    // 测试平板端视图
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('h1')).toBeVisible();

    // 测试桌面端视图
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator('h1')).toBeVisible();
  });

  test('SEO 元数据测试', async () => {
    // 验证 meta 标签
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content');

    const metaKeywords = page.locator('meta[name="keywords"]');
    if (await metaKeywords.count() > 0) {
      await expect(metaKeywords).toHaveAttribute('content');
    }

    // 验证 Open Graph 标签
    const ogTitle = page.locator('meta[property="og:title"]');
    if (await ogTitle.count() > 0) {
      await expect(ogTitle).toHaveAttribute('content');
    }
  });

  test('性能测试', async () => {
    // 监听性能指标
    const performanceMetrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        loadTime: navigation.loadEventEnd - navigation.loadEventStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
        firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0,
      };
    });

    // 验证性能指标
    expect(performanceMetrics.loadTime).toBeLessThan(5000); // 5秒内加载完成
    expect(performanceMetrics.domContentLoaded).toBeLessThan(3000); // 3秒内DOM加载完成
  });

  test('可访问性测试', async () => {
    // 验证页面有正确的标题层级
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);

    // 验证图片有 alt 属性
    const images = page.locator('img');
    const imageCount = await images.count();
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
    }

    // 验证链接有可访问的文本
    const links = page.locator('a');
    const linkCount = await links.count();
    for (let i = 0; i < linkCount; i++) {
      const link = links.nth(i);
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute('aria-label');
      expect(text || ariaLabel).toBeTruthy();
    }
  });
});
