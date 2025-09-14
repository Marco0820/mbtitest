# Playwright 快速开始指南

## 🚀 5 分钟快速上手

### 1. 安装浏览器

```bash
npm run test:install
```

### 2. 运行示例测试

```bash
# 运行所有测试
npm run test

# 有头模式运行（可以看到浏览器）
npm run test:headed

# 交互式 UI 模式
npm run test:ui
```

### 3. 查看测试报告

```bash
npm run test:report
```

## 📝 编写您的第一个测试

创建 `tests/my-first-test.spec.ts`：

```typescript
import { test, expect } from '@playwright/test';

test('我的第一个测试', async ({ page }) => {
  // 访问首页
  await page.goto('/');
  
  // 检查页面标题
  await expect(page).toHaveTitle(/MBTI/);
  
  // 点击开始测试按钮
  await page.click('button:has-text("开始测试")');
  
  // 验证跳转到测试页面
  await expect(page).toHaveURL(/test/);
});
```

## 🎯 常用测试场景

### 测试表单提交

```typescript
test('用户注册', async ({ page }) => {
  await page.goto('/auth/register');
  
  // 填写表单
  await page.fill('input[name="name"]', '测试用户');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="password"]', 'password123');
  
  // 提交表单
  await page.click('button[type="submit"]');
  
  // 验证结果
  await expect(page.locator('.success-message')).toBeVisible();
});
```

### 测试 API 调用

```typescript
test('API 测试', async ({ request }) => {
  const response = await request.get('/api/personalities');
  expect(response.status()).toBe(200);
  
  const data = await response.json();
  expect(Array.isArray(data)).toBeTruthy();
});
```

### 测试移动端

```typescript
test('移动端测试', async ({ page }) => {
  // 设置移动端视口
  await page.setViewportSize({ width: 375, height: 667 });
  
  await page.goto('/');
  
  // 测试移动端菜单
  await page.click('[data-testid="mobile-menu"]');
  await expect(page.locator('.mobile-nav')).toBeVisible();
});
```

## 🔧 调试技巧

### 1. 使用调试模式

```bash
npm run test:debug
```

### 2. 在代码中添加断点

```typescript
test('调试测试', async ({ page }) => {
  await page.goto('/');
  
  // 暂停执行，打开调试器
  await page.pause();
  
  // 继续执行
  await page.click('button');
});
```

### 3. 截图调试

```typescript
test('截图调试', async ({ page }) => {
  await page.goto('/');
  
  // 截图保存
  await page.screenshot({ path: 'debug.png' });
  
  // 元素截图
  await page.locator('.hero').screenshot({ path: 'hero.png' });
});
```

## 📊 测试报告

运行测试后，查看详细报告：

```bash
npm run test:report
```

报告包含：
- 测试结果概览
- 失败测试的截图
- 执行时间统计
- 浏览器兼容性

## 🎨 最佳实践

### 1. 选择器策略

```typescript
// ✅ 好的选择器
await page.click('button:has-text("开始测试")');
await page.fill('input[name="email"]', 'test@example.com');
await page.click('[data-testid="submit-button"]');

// ❌ 避免的选择器
await page.click('.btn.btn-primary.mt-4');
```

### 2. 等待策略

```typescript
// ✅ 等待特定条件
await page.waitForSelector('.loading', { state: 'hidden' });
await expect(page.locator('.result')).toBeVisible();

// ❌ 避免硬编码等待
await page.waitForTimeout(5000);
```

### 3. 测试组织

```typescript
test.describe('用户认证', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/auth/login');
  });

  test('登录成功', async ({ page }) => {
    // 测试代码
  });

  test('登录失败', async ({ page }) => {
    // 测试代码
  });
});
```

## 🚨 常见问题

### Q: 测试运行很慢？
A: 检查是否有不必要的 `waitForTimeout`，使用更精确的等待条件。

### Q: 元素找不到？
A: 确保选择器正确，使用 `page.locator().count()` 检查元素是否存在。

### Q: 测试不稳定？
A: 确保测试数据一致性，使用 `test.beforeEach` 重置状态。

## 📚 下一步

1. 阅读完整的 [Playwright 使用指南](./playwright-guide.md)
2. 查看 [Playwright 官方文档](https://playwright.dev/)
3. 探索更多高级功能：网络拦截、文件上传、多标签页等

## 🎉 开始测试吧！

现在您已经掌握了 Playwright 的基础用法，开始为您的 MBTI 测试平台编写可靠的端到端测试吧！

```bash
# 立即开始
npm run test:ui
```
