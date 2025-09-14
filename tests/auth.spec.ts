import { test, expect } from '@playwright/test';

test.describe('用户认证功能测试', () => {
  test('登录页面访问', async ({ page }) => {
    await page.goto('/auth/login');
    
    // 检查登录页面元素
    await expect(page.locator('h1, h2')).toContainText(/登录|Login|Sign In/);
    
    // 检查登录表单
    const emailInput = page.locator('input[type="email"], input[name="email"]').first();
    const passwordInput = page.locator('input[type="password"], input[name="password"]').first();
    
    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
  });

  test('注册页面访问', async ({ page }) => {
    await page.goto('/auth/register');
    
    // 检查注册页面元素
    await expect(page.locator('h1, h2')).toContainText(/注册|Register|Sign Up/);
    
    // 检查注册表单
    const emailInput = page.locator('input[type="email"], input[name="email"]').first();
    const passwordInput = page.locator('input[type="password"], input[name="password"]').first();
    
    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
  });

  test('表单验证测试', async ({ page }) => {
    await page.goto('/auth/login');
    
    // 尝试提交空表单
    const submitButton = page.locator('button[type="submit"], button:has-text("登录"), button:has-text("Login")').first();
    await submitButton.click();
    
    // 检查是否有验证错误信息
    const errorMessages = page.locator('.error, .invalid, [role="alert"]');
    if (await errorMessages.count() > 0) {
      await expect(errorMessages.first()).toBeVisible();
    }
  });
});
