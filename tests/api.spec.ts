import { test, expect } from '@playwright/test';

test.describe('API 端点测试', () => {
  test('健康检查端点', async ({ request }) => {
    // 测试 API 健康检查
    const response = await request.get('/api/health');
    
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data).toHaveProperty('status', 'ok');
    expect(data).toHaveProperty('timestamp');
  });

  test('性格类型 API', async ({ request }) => {
    // 测试性格类型 API
    const response = await request.get('/api/personalities');
    
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(Array.isArray(data)).toBeTruthy();
  });

  test('博客 API', async ({ request }) => {
    // 测试博客 API
    const response = await request.get('/api/blogs');
    
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(Array.isArray(data)).toBeTruthy();
  });

  test('用户 API 需要认证', async ({ request }) => {
    // 测试需要认证的 API
    const response = await request.get('/api/user');
    
    // 应该返回 401 或 403（未认证）
    expect([401, 403, 404]).toContain(response.status());
  });
});
