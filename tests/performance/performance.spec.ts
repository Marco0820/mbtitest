import { test, expect } from '@playwright/test';

test.describe('性能测试', () => {
  test('首页加载性能', async ({ page }) => {
    // 开始性能监控
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // 获取性能指标
    const performanceMetrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paintEntries = performance.getEntriesByType('paint');
      
      return {
        // 页面加载时间
        loadTime: navigation.loadEventEnd - navigation.loadEventStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        
        // 首次绘制时间
        firstPaint: paintEntries.find(entry => entry.name === 'first-paint')?.startTime || 0,
        firstContentfulPaint: paintEntries.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0,
        
        // 资源加载时间
        resourceLoadTime: navigation.loadEventEnd - navigation.fetchStart,
        
        // 总时间
        totalTime: navigation.loadEventEnd - navigation.navigationStart,
      };
    });
    
    // 验证性能指标
    expect(performanceMetrics.loadTime).toBeLessThan(3000); // 3秒内加载完成
    expect(performanceMetrics.domContentLoaded).toBeLessThan(2000); // 2秒内DOM加载完成
    expect(performanceMetrics.firstContentfulPaint).toBeLessThan(1500); // 1.5秒内首次内容绘制
    expect(performanceMetrics.totalTime).toBeLessThan(5000); // 5秒内完全加载
  });

  test('测试页面性能', async ({ page }) => {
    await page.goto('/test', { waitUntil: 'networkidle' });
    
    const performanceMetrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        loadTime: navigation.loadEventEnd - navigation.loadEventStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        totalTime: navigation.loadEventEnd - navigation.navigationStart,
      };
    });
    
    expect(performanceMetrics.loadTime).toBeLessThan(3000);
    expect(performanceMetrics.domContentLoaded).toBeLessThan(2000);
    expect(performanceMetrics.totalTime).toBeLessThan(5000);
  });

  test('性格类型页面性能', async ({ page }) => {
    await page.goto('/personalities', { waitUntil: 'networkidle' });
    
    const performanceMetrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        loadTime: navigation.loadEventEnd - navigation.loadEventStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        totalTime: navigation.loadEventEnd - navigation.navigationStart,
      };
    });
    
    expect(performanceMetrics.loadTime).toBeLessThan(3000);
    expect(performanceMetrics.domContentLoaded).toBeLessThan(2000);
    expect(performanceMetrics.totalTime).toBeLessThan(5000);
  });

  test('博客页面性能', async ({ page }) => {
    await page.goto('/blog', { waitUntil: 'networkidle' });
    
    const performanceMetrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        loadTime: navigation.loadEventEnd - navigation.loadEventStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        totalTime: navigation.loadEventEnd - navigation.navigationStart,
      };
    });
    
    expect(performanceMetrics.loadTime).toBeLessThan(3000);
    expect(performanceMetrics.domContentLoaded).toBeLessThan(2000);
    expect(performanceMetrics.totalTime).toBeLessThan(5000);
  });

  test('移动端性能', async ({ page }) => {
    // 模拟移动端设备
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/', { waitUntil: 'networkidle' });
    
    const performanceMetrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        loadTime: navigation.loadEventEnd - navigation.loadEventStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        totalTime: navigation.loadEventEnd - navigation.navigationStart,
      };
    });
    
    // 移动端性能要求可能更宽松
    expect(performanceMetrics.loadTime).toBeLessThan(5000);
    expect(performanceMetrics.domContentLoaded).toBeLessThan(3000);
    expect(performanceMetrics.totalTime).toBeLessThan(8000);
  });

  test('网络慢速环境性能', async ({ page }) => {
    // 模拟慢速网络
    await page.route('**/*', route => {
      // 添加延迟模拟慢速网络
      setTimeout(() => route.continue(), 100);
    });
    
    await page.goto('/', { waitUntil: 'networkidle' });
    
    const performanceMetrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        loadTime: navigation.loadEventEnd - navigation.loadEventStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        totalTime: navigation.loadEventEnd - navigation.navigationStart,
      };
    });
    
    // 慢速网络下的性能要求
    expect(performanceMetrics.loadTime).toBeLessThan(10000);
    expect(performanceMetrics.domContentLoaded).toBeLessThan(8000);
    expect(performanceMetrics.totalTime).toBeLessThan(15000);
  });

  test('内存使用情况', async ({ page }) => {
    await page.goto('/');
    
    const memoryUsage = await page.evaluate(() => {
      if ('memory' in performance) {
        return (performance as any).memory;
      }
      return null;
    });
    
    if (memoryUsage) {
      // 验证内存使用在合理范围内
      expect(memoryUsage.usedJSHeapSize).toBeLessThan(50 * 1024 * 1024); // 50MB
      expect(memoryUsage.totalJSHeapSize).toBeLessThan(100 * 1024 * 1024); // 100MB
    }
  });

  test('资源加载优化', async ({ page }) => {
    await page.goto('/');
    
    // 获取资源加载信息
    const resourceMetrics = await page.evaluate(() => {
      const resources = performance.getEntriesByType('resource');
      const resourceTypes = {
        script: 0,
        stylesheet: 0,
        image: 0,
        font: 0,
        other: 0
      };
      
      let totalSize = 0;
      
      resources.forEach((resource: any) => {
        const type = resource.initiatorType;
        if (type in resourceTypes) {
          resourceTypes[type as keyof typeof resourceTypes]++;
        } else {
          resourceTypes.other++;
        }
        
        if (resource.transferSize) {
          totalSize += resource.transferSize;
        }
      });
      
      return {
        resourceTypes,
        totalSize,
        resourceCount: resources.length
      };
    });
    
    // 验证资源数量合理
    expect(resourceMetrics.resourceCount).toBeLessThan(100);
    
    // 验证总资源大小合理
    expect(resourceMetrics.totalSize).toBeLessThan(5 * 1024 * 1024); // 5MB
  });

  test('Core Web Vitals', async ({ page }) => {
    await page.goto('/');
    
    // 等待页面完全加载
    await page.waitForLoadState('networkidle');
    
    const webVitals = await page.evaluate(() => {
      return new Promise((resolve) => {
        const vitals = {
          LCP: 0,
          FID: 0,
          CLS: 0
        };
        
        // 模拟 Core Web Vitals 测量
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'largest-contentful-paint') {
              vitals.LCP = entry.startTime;
            }
            if (entry.entryType === 'first-input') {
              vitals.FID = entry.processingStart - entry.startTime;
            }
            if (entry.entryType === 'layout-shift') {
              vitals.CLS += (entry as any).value;
            }
          }
        });
        
        observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
        
        // 5秒后返回结果
        setTimeout(() => {
          observer.disconnect();
          resolve(vitals);
        }, 5000);
      });
    });
    
    // 验证 Core Web Vitals 指标
    expect(webVitals.LCP).toBeLessThan(2500); // 2.5秒内最大内容绘制
    expect(webVitals.FID).toBeLessThan(100); // 100ms内首次输入延迟
    expect(webVitals.CLS).toBeLessThan(0.1); // 0.1的累积布局偏移
  });

  test('并发用户性能', async ({ browser }) => {
    // 模拟多个并发用户
    const contexts = await Promise.all([
      browser.newContext(),
      browser.newContext(),
      browser.newContext(),
      browser.newContext(),
      browser.newContext()
    ]);
    
    const pages = await Promise.all(contexts.map(context => context.newPage()));
    
    // 同时访问页面
    const startTime = Date.now();
    await Promise.all(pages.map(page => page.goto('/')));
    const endTime = Date.now();
    
    // 验证并发访问性能
    expect(endTime - startTime).toBeLessThan(10000); // 10秒内所有页面加载完成
    
    // 清理资源
    await Promise.all(contexts.map(context => context.close()));
  });

  test('API 性能', async ({ request }) => {
    const startTime = Date.now();
    const response = await request.get('/api/health');
    const endTime = Date.now();
    
    expect(response.status()).toBe(200);
    expect(endTime - startTime).toBeLessThan(1000); // 1秒内API响应
  });

  test('数据库查询性能', async ({ request }) => {
    const startTime = Date.now();
    const response = await request.get('/api/personalities');
    const endTime = Date.now();
    
    expect(response.status()).toBe(200);
    expect(endTime - startTime).toBeLessThan(2000); // 2秒内数据库查询完成
  });
});
