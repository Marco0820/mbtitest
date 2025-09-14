import { test, expect } from '@playwright/test';

const personalityTypes = [
  'intj', 'intp', 'entj', 'entp',
  'infj', 'infp', 'enfj', 'enfp',
  'istj', 'isfj', 'estj', 'esfj',
  'istp', 'isfp', 'estp', 'esfp'
];

test.describe('性格类型页面测试', () => {
  test('性格类型列表页面', async ({ page }) => {
    await page.goto('/personalities');
    
    // 验证页面标题
    await expect(page.locator('h1, h2')).toContainText(/性格类型|Personality Types|类型/);
    
    // 验证性格类型卡片
    const personalityCards = page.locator('[data-testid="personality-card"], .personality-card, .type-card');
    const cardCount = await personalityCards.count();
    expect(cardCount).toBeGreaterThan(0);
    
    // 验证每个卡片都有必要的元素
    for (let i = 0; i < Math.min(cardCount, 5); i++) {
      const card = personalityCards.nth(i);
      await expect(card).toBeVisible();
      
      // 验证卡片有标题
      const title = card.locator('h3, h4, .title, .name');
      await expect(title).toBeVisible();
      
      // 验证卡片有描述
      const description = card.locator('p, .description, .desc');
      await expect(description).toBeVisible();
    }
  });

  test('性格类型详情页面', async ({ page }) => {
    // 测试几个主要的性格类型
    const testTypes = ['intj', 'enfp', 'istj', 'estp'];
    
    for (const type of testTypes) {
      await page.goto(`/personalities/${type}`);
      
      // 验证页面加载
      await expect(page.locator('h1, h2')).toContainText(type.toUpperCase());
      
      // 验证性格类型信息
      const personalityInfo = page.locator('[data-testid="personality-info"], .personality-info, .type-info');
      await expect(personalityInfo).toBeVisible();
      
      // 验证性格特征
      const characteristics = page.locator('[data-testid="characteristics"], .characteristics, .traits');
      if (await characteristics.isVisible()) {
        await expect(characteristics).toBeVisible();
      }
      
      // 验证职业建议
      const careers = page.locator('[data-testid="careers"], .careers, .job-suggestions');
      if (await careers.isVisible()) {
        await expect(careers).toBeVisible();
      }
      
      // 验证关系建议
      const relationships = page.locator('[data-testid="relationships"], .relationships, .relationship-advice');
      if (await relationships.isVisible()) {
        await expect(relationships).toBeVisible();
      }
    }
  });

  test('性格类型搜索功能', async ({ page }) => {
    await page.goto('/personalities');
    
    // 查找搜索框
    const searchInput = page.locator('input[type="search"], input[placeholder*="搜索"], input[placeholder*="Search"]').first();
    if (await searchInput.isVisible()) {
      // 测试搜索功能
      await searchInput.fill('INTJ');
      await page.waitForTimeout(500);
      
      // 验证搜索结果
      const results = page.locator('[data-testid="search-results"], .search-results, .personality-card');
      await expect(results.first()).toBeVisible();
    }
  });

  test('性格类型筛选功能', async ({ page }) => {
    await page.goto('/personalities');
    
    // 查找筛选器
    const filterButtons = page.locator('[data-testid="filter"], .filter, button[data-filter]');
    const filterCount = await filterButtons.count();
    
    if (filterCount > 0) {
      // 测试筛选功能
      await filterButtons.first().click();
      await page.waitForTimeout(500);
      
      // 验证筛选结果
      const filteredResults = page.locator('[data-testid="personality-card"], .personality-card');
      await expect(filteredResults.first()).toBeVisible();
    }
  });

  test('性格类型比较功能', async ({ page }) => {
    await page.goto('/personalities');
    
    // 查找比较按钮或复选框
    const compareButtons = page.locator('[data-testid="compare"], .compare, input[type="checkbox"]');
    const compareCount = await compareButtons.count();
    
    if (compareCount >= 2) {
      // 选择两个性格类型进行比较
      await compareButtons.nth(0).click();
      await compareButtons.nth(1).click();
      
      // 查找比较按钮
      const compareSubmitButton = page.locator('button:has-text("比较"), button:has-text("Compare")').first();
      if (await compareSubmitButton.isVisible()) {
        await compareSubmitButton.click();
        
        // 验证比较页面
        await expect(page).toHaveURL(/compare/);
        await expect(page.locator('h1, h2')).toContainText(/比较|Compare/);
      }
    }
  });

  test('性格类型页面响应式设计', async ({ page }) => {
    // 移动端测试
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/personalities');
    await expect(page.locator('h1, h2')).toBeVisible();
    
    // 平板端测试
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/personalities');
    await expect(page.locator('h1, h2')).toBeVisible();
  });

  test('性格类型页面可访问性', async ({ page }) => {
    await page.goto('/personalities');
    
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
    
    for (let i = 0; i < Math.min(linkCount, 10); i++) {
      const link = links.nth(i);
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute('aria-label');
      expect(text || ariaLabel).toBeTruthy();
    }
  });

  test('性格类型页面性能', async ({ page }) => {
    await page.goto('/personalities');
    
    // 监听页面加载性能
    const performanceMetrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        loadTime: navigation.loadEventEnd - navigation.loadEventStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      };
    });
    
    expect(performanceMetrics.loadTime).toBeLessThan(5000);
    expect(performanceMetrics.domContentLoaded).toBeLessThan(3000);
  });

  test('性格类型页面 SEO', async ({ page }) => {
    await page.goto('/personalities');
    
    // 验证 meta 标签
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content');
    
    // 验证结构化数据
    const structuredData = page.locator('script[type="application/ld+json"]');
    if (await structuredData.count() > 0) {
      await expect(structuredData).toBeVisible();
    }
  });
});
