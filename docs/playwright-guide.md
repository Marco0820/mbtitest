# Playwright 使用指南

## 概述

本指南将帮助您在 MBTI 测试平台项目中使用 Playwright 进行端到端测试。Playwright 是一个强大的自动化测试工具，支持多种浏览器和移动设备。

## 安装和配置

### 1. 安装浏览器

首先需要安装 Playwright 浏览器：

```bash
npm run test:install
```

或者手动安装：

```bash
npx playwright install
```

### 2. 配置文件

项目已包含 `playwright.config.ts` 配置文件，包含以下设置：

- **测试目录**: `./tests`
- **基础 URL**: `http://localhost:3000`
- **并行执行**: 启用
- **重试次数**: CI 环境 2 次，本地 0 次
- **报告器**: HTML 报告
- **浏览器**: Chrome、Firefox、Safari、移动端浏览器

## 运行测试

### 基本命令

```bash
# 运行所有测试
npm run test

# 运行特定测试文件
npx playwright test tests/example.spec.ts

# 运行特定测试套件
npx playwright test --grep "登录"
```

### 调试模式

```bash
# 有头模式运行（显示浏览器）
npm run test:headed

# 调试模式
npm run test:debug

# UI 模式（交互式测试运行器）
npm run test:ui
```

### 查看测试报告

```bash
# 查看最新的测试报告
npm run test:report
```

## 测试文件结构

```
tests/
├── example.spec.ts    # 基础功能测试
├── auth.spec.ts       # 认证功能测试
└── api.spec.ts        # API 端点测试
```

## 编写测试

### 基本测试结构

```typescript
import { test, expect } from '@playwright/test';

test('测试名称', async ({ page }) => {
  // 测试代码
  await page.goto('/');
  await expect(page.locator('h1')).toBeVisible();
});
```

### 常用操作

#### 页面导航
```typescript
// 访问页面
await page.goto('/');

// 等待页面加载完成
await page.waitForLoadState('networkidle');

// 等待特定元素出现
await page.waitForSelector('.loading', { state: 'hidden' });
```

#### 元素交互
```typescript
// 点击元素
await page.click('button:has-text("开始测试")');

// 填写表单
await page.fill('input[name="email"]', 'test@example.com');

// 选择下拉选项
await page.selectOption('select[name="language"]', 'zh-CN');

// 上传文件
await page.setInputFiles('input[type="file"]', 'path/to/file.jpg');
```

#### 元素查找和验证
```typescript
// 查找元素
const button = page.locator('button:has-text("提交")');

// 验证元素状态
await expect(button).toBeVisible();
await expect(button).toBeEnabled();
await expect(button).toHaveText('提交');

// 验证页面内容
await expect(page).toHaveTitle('MBTI 测试');
await expect(page).toHaveURL('/test');
```

### 测试套件

```typescript
test.describe('功能模块名称', () => {
  test.beforeEach(async ({ page }) => {
    // 每个测试前的准备工作
    await page.goto('/');
  });

  test('具体测试1', async ({ page }) => {
    // 测试代码
  });

  test('具体测试2', async ({ page }) => {
    // 测试代码
  });
});
```

## 高级功能

### 1. 页面对象模式

创建可重用的页面对象：

```typescript
// tests/pages/HomePage.ts
export class HomePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/');
  }

  async clickStartTest() {
    await this.page.click('button:has-text("开始测试")');
  }

  async getTitle() {
    return await this.page.title();
  }
}

// 在测试中使用
test('使用页面对象', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.clickStartTest();
});
```

### 2. 数据驱动测试

```typescript
const testData = [
  { name: '用户1', email: 'user1@test.com' },
  { name: '用户2', email: 'user2@test.com' },
];

for (const data of testData) {
  test(`测试用户: ${data.name}`, async ({ page }) => {
    await page.goto('/register');
    await page.fill('input[name="name"]', data.name);
    await page.fill('input[name="email"]', data.email);
  });
}
```

### 3. 截图和视频

```typescript
test('截图测试', async ({ page }) => {
  await page.goto('/');
  
  // 全页面截图
  await page.screenshot({ path: 'screenshot.png', fullPage: true });
  
  // 元素截图
  await page.locator('.hero').screenshot({ path: 'hero.png' });
});
```

### 4. 网络拦截

```typescript
test('API 拦截测试', async ({ page }) => {
  // 拦截 API 请求
  await page.route('**/api/personalities', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([{ id: 1, name: 'INTJ' }])
    });
  });

  await page.goto('/');
  // 测试使用模拟数据的页面行为
});
```

## 最佳实践

### 1. 选择器策略

```typescript
// ✅ 推荐：使用语义化选择器
await page.click('button:has-text("开始测试")');
await page.fill('input[name="email"]', 'test@example.com');

// ✅ 推荐：使用 data-testid
await page.click('[data-testid="start-test-button"]');

// ❌ 避免：使用不稳定的选择器
await page.click('.btn.btn-primary.mt-4');
```

### 2. 等待策略

```typescript
// ✅ 推荐：等待特定条件
await page.waitForSelector('.loading', { state: 'hidden' });
await expect(page.locator('.result')).toBeVisible();

// ❌ 避免：硬编码等待
await page.waitForTimeout(5000);
```

### 3. 测试隔离

```typescript
test.beforeEach(async ({ page }) => {
  // 每个测试前清理状态
  await page.context().clearCookies();
  await page.goto('/');
});
```

### 4. 错误处理

```typescript
test('错误处理测试', async ({ page }) => {
  // 监听控制台错误
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('控制台错误:', msg.text());
    }
  });

  // 监听页面错误
  page.on('pageerror', error => {
    console.log('页面错误:', error.message);
  });
});
```

## 调试技巧

### 1. 使用调试模式

```bash
# 启动调试模式
npm run test:debug

# 在代码中添加断点
await page.pause();
```

### 2. 生成测试代码

```bash
# 使用 Playwright Inspector 录制测试
npx playwright codegen localhost:3000
```

### 3. 查看测试痕迹

```bash
# 查看失败的测试痕迹
npx playwright show-trace trace.zip
```

## CI/CD 集成

### GitHub Actions 示例

```yaml
name: Playwright Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: 18
    - run: npm ci
    - run: npx playwright install --with-deps
    - run: npm run test
    - uses: actions/upload-artifact@v3
      if: always()
      with:
        name: playwright-report
        path: playwright-report/
```

## 常见问题

### 1. 测试不稳定

- 使用 `waitForSelector` 而不是 `waitForTimeout`
- 确保测试数据的一致性
- 使用 `test.beforeEach` 重置状态

### 2. 元素找不到

- 检查选择器是否正确
- 等待元素出现
- 使用 `page.locator().count()` 检查元素数量

### 3. 跨浏览器兼容性

- 测试不同浏览器
- 使用 Playwright 的跨浏览器测试功能
- 检查浏览器特定的行为

## 资源链接

- [Playwright 官方文档](https://playwright.dev/)
- [Playwright API 参考](https://playwright.dev/docs/api/class-playwright)
- [最佳实践指南](https://playwright.dev/docs/best-practices)
- [调试指南](https://playwright.dev/docs/debug)

## 总结

Playwright 是一个功能强大的测试工具，可以帮助您确保 MBTI 测试平台的质量和稳定性。通过遵循本指南的最佳实践，您可以编写可靠、可维护的端到端测试。

记住：
- 编写稳定的选择器
- 使用适当的等待策略
- 保持测试的独立性
- 定期运行测试
- 利用调试工具解决问题
