import { test, expect } from '@playwright/test';
import { HomePage, TestPage, AuthPage } from './utils/test-helpers';

test.describe('使用页面对象的测试示例', () => {
  test('首页功能测试', async ({ page }) => {
    const homePage = new HomePage(page);
    
    // 访问首页
    await homePage.goto();
    
    // 验证页面标题
    const title = await homePage.getTitle();
    expect(title).toMatch(/MBTI|性格测试/);
    
    // 验证开始测试按钮可见
    const isStartButtonVisible = await homePage.isStartButtonVisible();
    expect(isStartButtonVisible).toBeTruthy();
    
    // 点击开始测试
    await homePage.clickStartTest();
  });

  test('测试流程测试', async ({ page }) => {
    const testPage = new TestPage(page);
    
    // 访问测试页面
    await testPage.goto();
    
    // 获取当前问题
    const question = await testPage.getCurrentQuestion();
    expect(question).toBeTruthy();
    
    // 选择第一个选项
    await testPage.selectOption(0);
    
    // 点击下一步
    await testPage.clickNext();
  });

  test('用户认证测试', async ({ page }) => {
    const authPage = new AuthPage(page);
    
    // 访问登录页面
    await authPage.gotoLogin();
    
    // 尝试登录（使用测试数据）
    await authPage.login('test@example.com', 'password123');
    
    // 注意：这个测试可能会失败，因为需要真实的认证系统
    // 在实际项目中，您可能需要设置测试数据库或模拟认证
  });
});

test.describe('使用辅助工具的测试示例', () => {
  test('复杂交互测试', async ({ page }) => {
    const homePage = new HomePage(page);
    
    await homePage.goto();
    
    // 使用辅助工具进行复杂操作
    const helpers = homePage['helpers'];
    
    // 截图
    await helpers.takeScreenshot('homepage');
    
    // 滚动到特定元素
    await helpers.scrollToElement('footer');
    
    // 模拟键盘操作
    await helpers.pressKey('Tab');
    await helpers.pressKey('Enter');
    
    // 等待网络空闲
    await helpers.waitForNetworkIdle();
  });
});
