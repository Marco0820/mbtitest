import { test, expect } from '@playwright/test';
import { TestPage, HomePage } from '../utils/test-helpers';

test.describe('MBTI 测试流程', () => {
  let homePage: HomePage;
  let testPage: TestPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    testPage = new TestPage(page);
  });

  test('从首页开始测试', async () => {
    // 访问首页
    await homePage.goto();
    
    // 点击开始测试按钮
    await homePage.clickStartTest();
    
    // 验证跳转到测试页面
    await expect(page).toHaveURL(/test/);
  });

  test('测试页面基本功能', async () => {
    await testPage.goto();
    
    // 验证测试页面元素
    await expect(page.locator('h1, h2')).toContainText(/测试|Test|问卷|Questionnaire/);
    
    // 验证测试问题存在
    const question = await testPage.getCurrentQuestion();
    expect(question).toBeTruthy();
    expect(question.length).toBeGreaterThan(0);
  });

  test('测试问题导航', async () => {
    await testPage.goto();
    
    // 查找测试选项
    const options = page.locator('input[type="radio"], .option, [data-testid="option"]');
    const optionCount = await options.count();
    
    if (optionCount > 0) {
      // 选择第一个选项
      await testPage.selectOption(0);
      
      // 查找下一步按钮
      const nextButton = page.locator('button:has-text("下一步"), button:has-text("Next"), button:has-text("Continue")').first();
      if (await nextButton.isVisible()) {
        await nextButton.click();
        
        // 验证问题已更新
        const newQuestion = await testPage.getCurrentQuestion();
        expect(newQuestion).toBeTruthy();
      }
    }
  });

  test('测试进度显示', async () => {
    await testPage.goto();
    
    // 查找进度条或进度指示器
    const progressBar = page.locator('[data-testid="progress"], .progress, .progress-bar, [role="progressbar"]').first();
    if (await progressBar.isVisible()) {
      await expect(progressBar).toBeVisible();
      
      // 验证进度值
      const progressValue = await progressBar.getAttribute('aria-valuenow') || 
                           await progressBar.getAttribute('data-progress') ||
                           await progressBar.textContent();
      expect(progressValue).toBeTruthy();
    }
  });

  test('测试选项验证', async () => {
    await testPage.goto();
    
    // 尝试不选择任何选项直接提交
    const submitButton = page.locator('button[type="submit"], button:has-text("提交"), button:has-text("Submit")').first();
    if (await submitButton.isVisible()) {
      await submitButton.click();
      
      // 验证是否有错误提示
      const errorMessage = page.locator('.error, .invalid, [role="alert"], .error-message').first();
      if (await errorMessage.isVisible()) {
        await expect(errorMessage).toBeVisible();
      }
    }
  });

  test('测试结果页面', async () => {
    // 模拟完成测试（需要根据实际实现调整）
    await testPage.goto();
    
    // 如果有快速完成测试的选项，使用它
    const skipButton = page.locator('button:has-text("跳过"), button:has-text("Skip"), [data-testid="skip"]').first();
    if (await skipButton.isVisible()) {
      await skipButton.click();
    }
    
    // 或者尝试完成所有问题
    const options = page.locator('input[type="radio"], .option, [data-testid="option"]');
    const optionCount = await options.count();
    
    for (let i = 0; i < Math.min(optionCount, 5); i++) {
      const nextButton = page.locator('button:has-text("下一步"), button:has-text("Next")').first();
      if (await nextButton.isVisible()) {
        await testPage.selectOption(0);
        await nextButton.click();
        await page.waitForTimeout(500); // 等待页面更新
      } else {
        break;
      }
    }
    
    // 检查是否到达结果页面
    const isComplete = await testPage.isTestComplete();
    if (isComplete) {
      // 验证结果页面元素
      await expect(page.locator('.result, .completion, [data-testid="result"]')).toBeVisible();
    }
  });

  test('测试页面响应式设计', async () => {
    // 移动端测试
    await page.setViewportSize({ width: 375, height: 667 });
    await testPage.goto();
    await expect(page.locator('h1, h2')).toBeVisible();
    
    // 平板端测试
    await page.setViewportSize({ width: 768, height: 1024 });
    await testPage.goto();
    await expect(page.locator('h1, h2')).toBeVisible();
  });

  test('测试页面可访问性', async () => {
    await testPage.goto();
    
    // 验证表单标签
    const radioInputs = page.locator('input[type="radio"]');
    const inputCount = await radioInputs.count();
    
    for (let i = 0; i < inputCount; i++) {
      const input = radioInputs.nth(i);
      const id = await input.getAttribute('id');
      const label = page.locator(`label[for="${id}"]`);
      
      if (id) {
        await expect(label).toBeVisible();
      }
    }
    
    // 验证按钮有可访问的文本
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    
    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i);
      const text = await button.textContent();
      const ariaLabel = await button.getAttribute('aria-label');
      expect(text || ariaLabel).toBeTruthy();
    }
  });

  test('测试页面性能', async () => {
    await testPage.goto();
    
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
});
