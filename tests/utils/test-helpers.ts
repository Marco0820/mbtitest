import { Page, Locator } from '@playwright/test';

/**
 * 测试辅助工具类
 */
export class TestHelpers {
  constructor(private page: Page) {}

  /**
   * 等待页面完全加载
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * 安全点击元素（等待元素可见后再点击）
   */
  async safeClick(selector: string | Locator) {
    const element = typeof selector === 'string' ? this.page.locator(selector) : selector;
    await element.waitFor({ state: 'visible' });
    await element.click();
  }

  /**
   * 安全填写表单（等待输入框可见后再填写）
   */
  async safeFill(selector: string | Locator, value: string) {
    const element = typeof selector === 'string' ? this.page.locator(selector) : selector;
    await element.waitFor({ state: 'visible' });
    await element.fill(value);
  }

  /**
   * 等待并验证元素文本
   */
  async waitForText(selector: string | Locator, expectedText: string, timeout = 10000) {
    const element = typeof selector === 'string' ? this.page.locator(selector) : selector;
    await element.waitFor({ state: 'visible', timeout });
    await expect(element).toContainText(expectedText);
  }

  /**
   * 截图并保存
   */
  async takeScreenshot(name: string, fullPage = false) {
    await this.page.screenshot({ 
      path: `screenshots/${name}-${Date.now()}.png`, 
      fullPage 
    });
  }

  /**
   * 模拟用户输入（逐字符输入）
   */
  async typeSlowly(selector: string | Locator, text: string, delay = 100) {
    const element = typeof selector === 'string' ? this.page.locator(selector) : selector;
    await element.waitFor({ state: 'visible' });
    await element.type(text, { delay });
  }

  /**
   * 滚动到元素
   */
  async scrollToElement(selector: string | Locator) {
    const element = typeof selector === 'string' ? this.page.locator(selector) : selector;
    await element.scrollIntoViewIfNeeded();
  }

  /**
   * 等待并验证 URL
   */
  async waitForURL(expectedURL: string | RegExp, timeout = 10000) {
    await this.page.waitForURL(expectedURL, { timeout });
  }

  /**
   * 清除所有 cookies 和本地存储
   */
  async clearAllData() {
    await this.page.context().clearCookies();
    await this.page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  }

  /**
   * 等待网络请求完成
   */
  async waitForNetworkIdle() {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * 检查元素是否存在
   */
  async elementExists(selector: string | Locator): Promise<boolean> {
    const element = typeof selector === 'string' ? this.page.locator(selector) : selector;
    return await element.count() > 0;
  }

  /**
   * 等待元素消失
   */
  async waitForElementToDisappear(selector: string | Locator, timeout = 10000) {
    const element = typeof selector === 'string' ? this.page.locator(selector) : selector;
    await element.waitFor({ state: 'hidden', timeout });
  }

  /**
   * 获取元素文本内容
   */
  async getElementText(selector: string | Locator): Promise<string> {
    const element = typeof selector === 'string' ? this.page.locator(selector) : selector;
    await element.waitFor({ state: 'visible' });
    return await element.textContent() || '';
  }

  /**
   * 模拟键盘按键
   */
  async pressKey(key: string) {
    await this.page.keyboard.press(key);
  }

  /**
   * 模拟鼠标悬停
   */
  async hover(selector: string | Locator) {
    const element = typeof selector === 'string' ? this.page.locator(selector) : selector;
    await element.hover();
  }

  /**
   * 等待特定时间
   */
  async wait(ms: number) {
    await this.page.waitForTimeout(ms);
  }
}

/**
 * 页面对象基类
 */
export abstract class BasePage {
  protected helpers: TestHelpers;

  constructor(protected page: Page) {
    this.helpers = new TestHelpers(page);
  }

  /**
   * 访问页面
   */
  abstract goto(): Promise<void>;

  /**
   * 等待页面加载完成
   */
  async waitForLoad() {
    await this.helpers.waitForPageLoad();
  }
}

/**
 * 首页页面对象
 */
export class HomePage extends BasePage {
  async goto() {
    await this.page.goto('/');
    await this.waitForLoad();
  }

  async clickStartTest() {
    await this.helpers.safeClick('button:has-text("开始测试"), a:has-text("开始测试")');
  }

  async getTitle() {
    return await this.page.title();
  }

  async isStartButtonVisible() {
    return await this.helpers.elementExists('button:has-text("开始测试"), a:has-text("开始测试")');
  }
}

/**
 * 测试页面对象
 */
export class TestPage extends BasePage {
  async goto() {
    await this.page.goto('/test');
    await this.waitForLoad();
  }

  async selectOption(optionIndex: number) {
    const options = this.page.locator('input[type="radio"], .option, [data-testid="option"]');
    await options.nth(optionIndex).click();
  }

  async clickNext() {
    await this.helpers.safeClick('button:has-text("下一步"), button:has-text("Next")');
  }

  async getCurrentQuestion() {
    return await this.helpers.getElementText('.question, [data-testid="question"]');
  }

  async isTestComplete() {
    return await this.helpers.elementExists('.result, .completion, [data-testid="result"]');
  }
}

/**
 * 认证页面对象
 */
export class AuthPage extends BasePage {
  async gotoLogin() {
    await this.page.goto('/auth/login');
    await this.waitForLoad();
  }

  async gotoRegister() {
    await this.page.goto('/auth/register');
    await this.waitForLoad();
  }

  async login(email: string, password: string) {
    await this.helpers.safeFill('input[name="email"], input[type="email"]', email);
    await this.helpers.safeFill('input[name="password"], input[type="password"]', password);
    await this.helpers.safeClick('button[type="submit"], button:has-text("登录")');
  }

  async register(name: string, email: string, password: string) {
    await this.helpers.safeFill('input[name="name"], input[name="username"]', name);
    await this.helpers.safeFill('input[name="email"], input[type="email"]', email);
    await this.helpers.safeFill('input[name="password"], input[type="password"]', password);
    await this.helpers.safeClick('button[type="submit"], button:has-text("注册")');
  }

  async isLoggedIn() {
    return await this.helpers.elementExists('[data-testid="user-menu"], .user-avatar, .profile-link');
  }
}
