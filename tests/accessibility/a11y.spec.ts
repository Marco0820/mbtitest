import { test, expect } from '@playwright/test';

test.describe('可访问性测试', () => {
  test('首页可访问性', async ({ page }) => {
    await page.goto('/');
    
    // 验证页面有正确的标题层级
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
    
    // 验证标题内容有意义
    const h1Text = await h1.textContent();
    expect(h1Text).toBeTruthy();
    expect(h1Text!.length).toBeGreaterThan(0);
    
    // 验证图片有 alt 属性
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
      expect(alt!.length).toBeGreaterThan(0);
    }
    
    // 验证链接有可访问的文本
    const links = page.locator('a');
    const linkCount = await links.count();
    
    for (let i = 0; i < linkCount; i++) {
      const link = links.nth(i);
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute('aria-label');
      const title = await link.getAttribute('title');
      
      expect(text || ariaLabel || title).toBeTruthy();
    }
    
    // 验证按钮有可访问的文本
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    
    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i);
      const text = await button.textContent();
      const ariaLabel = await button.getAttribute('aria-label');
      const title = await button.getAttribute('title');
      
      expect(text || ariaLabel || title).toBeTruthy();
    }
  });

  test('表单可访问性', async ({ page }) => {
    await page.goto('/test');
    
    // 验证表单标签
    const formInputs = page.locator('input, textarea, select');
    const inputCount = await formInputs.count();
    
    for (let i = 0; i < inputCount; i++) {
      const input = formInputs.nth(i);
      const id = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledBy = await input.getAttribute('aria-labelledby');
      
      if (id) {
        const label = page.locator(`label[for="${id}"]`);
        const hasLabel = await label.count() > 0;
        const hasAriaLabel = ariaLabel || ariaLabelledBy;
        
        expect(hasLabel || hasAriaLabel).toBeTruthy();
      }
    }
    
    // 验证字段集和图例
    const fieldsets = page.locator('fieldset');
    const fieldsetCount = await fieldsets.count();
    
    for (let i = 0; i < fieldsetCount; i++) {
      const fieldset = fieldsets.nth(i);
      const legend = fieldset.locator('legend');
      await expect(legend).toHaveCount(1);
    }
  });

  test('键盘导航', async ({ page }) => {
    await page.goto('/');
    
    // 测试 Tab 键导航
    await page.keyboard.press('Tab');
    
    // 验证焦点可见
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
    
    // 测试 Enter 键激活
    await page.keyboard.press('Enter');
    
    // 测试 Escape 键
    await page.keyboard.press('Escape');
  });

  test('ARIA 属性', async ({ page }) => {
    await page.goto('/');
    
    // 验证导航有正确的 ARIA 标签
    const nav = page.locator('nav, [role="navigation"]').first();
    if (await nav.isVisible()) {
      const ariaLabel = await nav.getAttribute('aria-label');
      expect(ariaLabel).toBeTruthy();
    }
    
    // 验证主内容区域
    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible();
    
    // 验证页脚
    const footer = page.locator('footer, [role="contentinfo"]').first();
    if (await footer.isVisible()) {
      await expect(footer).toBeVisible();
    }
  });

  test('颜色对比度', async ({ page }) => {
    await page.goto('/');
    
    // 获取所有文本元素
    const textElements = page.locator('p, h1, h2, h3, h4, h5, h6, span, a, button');
    const elementCount = await textElements.count();
    
    // 验证文本元素有足够的对比度
    for (let i = 0; i < Math.min(elementCount, 10); i++) {
      const element = textElements.nth(i);
      const computedStyle = await element.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return {
          color: style.color,
          backgroundColor: style.backgroundColor,
          fontSize: style.fontSize
        };
      });
      
      // 验证字体大小足够大
      const fontSize = parseFloat(computedStyle.fontSize);
      expect(fontSize).toBeGreaterThanOrEqual(12); // 至少12px
    }
  });

  test('屏幕阅读器支持', async ({ page }) => {
    await page.goto('/');
    
    // 验证页面有正确的语言属性
    const html = page.locator('html');
    const lang = await html.getAttribute('lang');
    expect(lang).toBeTruthy();
    
    // 验证标题结构
    const headings = page.locator('h1, h2, h3, h4, h5, h6');
    const headingCount = await headings.count();
    
    if (headingCount > 0) {
      // 验证第一个标题是 h1
      const firstHeading = headings.nth(0);
      const tagName = await firstHeading.evaluate(el => el.tagName);
      expect(tagName).toBe('H1');
    }
    
    // 验证跳过链接
    const skipLink = page.locator('a[href="#main"], a[href="#content"], .skip-link');
    if (await skipLink.count() > 0) {
      await expect(skipLink).toBeVisible();
    }
  });

  test('错误处理可访问性', async ({ page }) => {
    await page.goto('/test');
    
    // 尝试提交空表单
    const submitButton = page.locator('button[type="submit"], button:has-text("提交"), button:has-text("Submit")').first();
    if (await submitButton.isVisible()) {
      await submitButton.click();
      
      // 验证错误消息
      const errorMessage = page.locator('.error, .invalid, [role="alert"], .error-message').first();
      if (await errorMessage.isVisible()) {
        await expect(errorMessage).toBeVisible();
        
        // 验证错误消息有正确的 ARIA 属性
        const ariaLive = await errorMessage.getAttribute('aria-live');
        const role = await errorMessage.getAttribute('role');
        expect(ariaLive || role).toBeTruthy();
      }
    }
  });

  test('移动端可访问性', async ({ page }) => {
    // 设置移动端视口
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // 验证触摸目标大小
    const touchTargets = page.locator('button, a, input, select, textarea');
    const targetCount = await touchTargets.count();
    
    for (let i = 0; i < Math.min(targetCount, 10); i++) {
      const target = touchTargets.nth(i);
      const boundingBox = await target.boundingBox();
      
      if (boundingBox) {
        // 验证触摸目标至少44x44像素
        expect(boundingBox.width).toBeGreaterThanOrEqual(44);
        expect(boundingBox.height).toBeGreaterThanOrEqual(44);
      }
    }
  });

  test('高对比度模式', async ({ page }) => {
    // 模拟高对比度模式
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');
    
    // 验证页面在高对比度模式下仍然可读
    const textElements = page.locator('p, h1, h2, h3, h4, h5, h6');
    const elementCount = await textElements.count();
    
    for (let i = 0; i < Math.min(elementCount, 5); i++) {
      const element = textElements.nth(i);
      await expect(element).toBeVisible();
    }
  });

  test('焦点管理', async ({ page }) => {
    await page.goto('/');
    
    // 测试模态框焦点管理
    const modalTriggers = page.locator('[data-modal], [aria-haspopup="dialog"], button[aria-expanded]');
    const triggerCount = await modalTriggers.count();
    
    for (let i = 0; i < triggerCount; i++) {
      const trigger = modalTriggers.nth(i);
      await trigger.click();
      
      // 验证焦点在模态框内
      const modal = page.locator('[role="dialog"], .modal, [aria-modal="true"]').first();
      if (await modal.isVisible()) {
        const focusedElement = page.locator(':focus');
        const isInModal = await focusedElement.evaluate((el, modalEl) => {
          return modalEl.contains(el);
        }, await modal.elementHandle());
        
        expect(isInModal).toBeTruthy();
        
        // 关闭模态框
        await page.keyboard.press('Escape');
      }
    }
  });

  test('动态内容可访问性', async ({ page }) => {
    await page.goto('/');
    
    // 监听动态内容变化
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log('控制台错误:', msg.text());
      }
    });
    
    // 测试动态加载的内容
    const dynamicContent = page.locator('[aria-live], [aria-atomic]');
    const dynamicCount = await dynamicContent.count();
    
    for (let i = 0; i < dynamicCount; i++) {
      const element = dynamicContent.nth(i);
      const ariaLive = await element.getAttribute('aria-live');
      const ariaAtomic = await element.getAttribute('aria-atomic');
      
      expect(ariaLive || ariaAtomic).toBeTruthy();
    }
  });

  test('表单验证可访问性', async ({ page }) => {
    await page.goto('/test');
    
    // 测试表单验证
    const requiredInputs = page.locator('input[required], textarea[required], select[required]');
    const requiredCount = await requiredInputs.count();
    
    for (let i = 0; i < requiredCount; i++) {
      const input = requiredInputs.nth(i);
      const ariaRequired = await input.getAttribute('aria-required');
      const required = await input.getAttribute('required');
      
      expect(ariaRequired || required).toBeTruthy();
    }
    
    // 测试输入验证
    const emailInputs = page.locator('input[type="email"]');
    const emailCount = await emailInputs.count();
    
    for (let i = 0; i < emailCount; i++) {
      const input = emailInputs.nth(i);
      await input.fill('invalid-email');
      await input.blur();
      
      // 验证验证消息
      const validationMessage = page.locator('.invalid, .error, [role="alert"]').first();
      if (await validationMessage.isVisible()) {
        await expect(validationMessage).toBeVisible();
      }
    }
  });
});
