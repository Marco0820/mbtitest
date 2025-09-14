import { test, expect } from '@playwright/test';

test.describe('MBTI 测试平台 - 基础功能测试', () => {
  test('首页加载和基本元素检查', async ({ page }) => {
    // 访问首页
    await page.goto('/');
    
    // 等待页面加载完成
    await page.waitForLoadState('networkidle');
    
    // 检查页面标题
    await expect(page).toHaveTitle(/MBTI|性格测试/);
    
    // 检查主要元素是否存在
    await expect(page.locator('h1')).toBeVisible();
    
    // 检查是否有开始测试按钮
    const startButton = page.locator('button:has-text("开始测试"), a:has-text("开始测试")').first();
    await expect(startButton).toBeVisible();
  });

  test('导航菜单功能测试', async ({ page }) => {
    await page.goto('/');
    
    // 检查导航菜单项
    const navItems = ['关于', '性格类型', '博客', '常见问题'];
    
    for (const item of navItems) {
      const navLink = page.locator(`a:has-text("${item}")`).first();
      await expect(navLink).toBeVisible();
    }
  });

  test('语言切换功能测试', async ({ page }) => {
    await page.goto('/');
    
    // 查找语言切换器
    const languageSwitcher = page.locator('[data-testid="language-switcher"], .language-switcher').first();
    
    if (await languageSwitcher.isVisible()) {
      await languageSwitcher.click();
      
      // 检查是否有语言选项
      const languageOptions = page.locator('[role="menuitem"], .language-option');
      await expect(languageOptions.first()).toBeVisible();
    }
  });
});

test.describe('MBTI 测试流程', () => {
  test('开始测试流程', async ({ page }) => {
    await page.goto('/');
    
    // 点击开始测试按钮
    const startButton = page.locator('button:has-text("开始测试"), a:has-text("开始测试")').first();
    await startButton.click();
    
    // 等待测试页面加载
    await page.waitForLoadState('networkidle');
    
    // 检查是否进入测试页面
    await expect(page).toHaveURL(/test|quiz/);
    
    // 检查测试问题是否存在
    const question = page.locator('.question, [data-testid="question"]').first();
    await expect(question).toBeVisible();
  });

  test('测试问题导航', async ({ page }) => {
    await page.goto('/test');
    
    // 等待测试页面加载
    await page.waitForLoadState('networkidle');
    
    // 查找测试选项
    const options = page.locator('input[type="radio"], .option, [data-testid="option"]');
    const optionCount = await options.count();
    
    if (optionCount > 0) {
      // 选择第一个选项
      await options.first().click();
      
      // 查找下一步按钮
      const nextButton = page.locator('button:has-text("下一步"), button:has-text("Next")').first();
      if (await nextButton.isVisible()) {
        await nextButton.click();
      }
    }
  });
});

test.describe('响应式设计测试', () => {
  test('移动端视图测试', async ({ page }) => {
    // 设置移动端视口
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // 检查移动端菜单
    const mobileMenu = page.locator('[data-testid="mobile-menu"], .mobile-menu').first();
    if (await mobileMenu.isVisible()) {
      await mobileMenu.click();
    }
    
    // 检查页面在移动端是否正常显示
    await expect(page.locator('h1')).toBeVisible();
  });

  test('平板端视图测试', async ({ page }) => {
    // 设置平板端视口
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    
    // 检查页面在平板端是否正常显示
    await expect(page.locator('h1')).toBeVisible();
  });
});
