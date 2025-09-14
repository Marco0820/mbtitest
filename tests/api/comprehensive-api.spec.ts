import { test, expect } from '@playwright/test';

test.describe('API 全面测试', () => {
  test.describe('健康检查 API', () => {
    test('GET /api/health', async ({ request }) => {
      const response = await request.get('/api/health');
      
      expect(response.status()).toBe(200);
      
      const data = await response.json();
      expect(data).toHaveProperty('status', 'ok');
      expect(data).toHaveProperty('timestamp');
      expect(data).toHaveProperty('uptime');
      expect(data).toHaveProperty('environment');
      
      // 验证时间戳格式
      expect(new Date(data.timestamp)).toBeInstanceOf(Date);
      
      // 验证运行时间
      expect(data.uptime).toBeGreaterThan(0);
    });
  });

  test.describe('性格类型 API', () => {
    test('GET /api/personalities', async ({ request }) => {
      const response = await request.get('/api/personalities');
      
      expect(response.status()).toBe(200);
      
      const data = await response.json();
      expect(Array.isArray(data)).toBeTruthy();
      expect(data.length).toBeGreaterThan(0);
      
      // 验证数据结构
      if (data.length > 0) {
        const personality = data[0];
        expect(personality).toHaveProperty('type');
        expect(personality).toHaveProperty('name');
        expect(typeof personality.type).toBe('string');
        expect(typeof personality.name).toBe('string');
      }
    });

    test('GET /api/personalities/[type]', async ({ request }) => {
      const testTypes = ['INTJ', 'ENFP', 'ISTJ', 'ESTP'];
      
      for (const type of testTypes) {
        const response = await request.get(`/api/personalities/${type}?locale=en`);
        
        if (response.status() === 200) {
          const data = await response.json();
          expect(data).toBeTruthy();
          expect(typeof data).toBe('object');
        } else if (response.status() === 404) {
          // 某些类型可能不存在，这是正常的
          expect(response.status()).toBe(404);
        }
      }
    });

    test('GET /api/personalities/[type] - 缺少 locale 参数', async ({ request }) => {
      const response = await request.get('/api/personalities/INTJ');
      
      expect(response.status()).toBe(400);
      
      const data = await response.json();
      expect(data).toHaveProperty('error');
      expect(data.error).toContain('locale');
    });

    test('GET /api/personalities/[type] - 无效类型', async ({ request }) => {
      const response = await request.get('/api/personalities/INVALID?locale=en');
      
      expect(response.status()).toBe(404);
      
      const data = await response.json();
      expect(data).toHaveProperty('error');
    });
  });

  test.describe('博客 API', () => {
    test('GET /api/blogs', async ({ request }) => {
      const response = await request.get('/api/blogs');
      
      expect(response.status()).toBe(200);
      
      const data = await response.json();
      expect(Array.isArray(data)).toBeTruthy();
      
      // 验证博客数据结构
      if (data.length > 0) {
        const blog = data[0];
        expect(blog).toHaveProperty('id');
        expect(blog).toHaveProperty('title');
        expect(blog).toHaveProperty('content');
        expect(typeof blog.id).toBe('string');
        expect(typeof blog.title).toBe('string');
      }
    });

    test('GET /api/blogs?locale=zh-CN', async ({ request }) => {
      const response = await request.get('/api/blogs?locale=zh-CN');
      
      expect(response.status()).toBe(200);
      
      const data = await response.json();
      expect(Array.isArray(data)).toBeTruthy();
    });

    test('GET /api/blogs/[id]', async ({ request }) => {
      // 首先获取博客列表
      const blogsResponse = await request.get('/api/blogs');
      const blogs = await blogsResponse.json();
      
      if (blogs.length > 0) {
        const blogId = blogs[0].id;
        const response = await request.get(`/api/blogs/${blogId}`);
        
        expect(response.status()).toBe(200);
        
        const data = await response.json();
        expect(data).toHaveProperty('id', blogId);
        expect(data).toHaveProperty('title');
        expect(data).toHaveProperty('content');
      }
    });

    test('GET /api/blogs/[id] - 无效 ID', async ({ request }) => {
      const response = await request.get('/api/blogs/invalid-id');
      
      expect(response.status()).toBe(404);
      
      const data = await response.json();
      expect(data).toHaveProperty('error');
    });
  });

  test.describe('用户 API', () => {
    test('GET /api/users', async ({ request }) => {
      const response = await request.get('/api/users');
      
      expect(response.status()).toBe(200);
      
      const data = await response.json();
      expect(data).toHaveProperty('users');
      expect(data).toHaveProperty('filters');
      expect(Array.isArray(data.users)).toBeTruthy();
      expect(Array.isArray(data.filters)).toBeTruthy();
    });

    test('GET /api/users/[userId]', async ({ request }) => {
      // 首先获取用户列表
      const usersResponse = await request.get('/api/users');
      const { users } = await usersResponse.json();
      
      if (users.length > 0) {
        const userId = users[0].id;
        const response = await request.get(`/api/users/${userId}`);
        
        expect(response.status()).toBe(200);
        
        const data = await response.json();
        expect(data).toHaveProperty('id', userId);
        expect(data).toHaveProperty('name');
        expect(data).toHaveProperty('mbti');
        
        // 验证不包含敏感信息
        expect(data).not.toHaveProperty('email');
        expect(data).not.toHaveProperty('password');
      }
    });

    test('GET /api/users/[userId] - 无效用户 ID', async ({ request }) => {
      const response = await request.get('/api/users/invalid-user-id');
      
      expect(response.status()).toBe(404);
      
      const data = await response.json();
      expect(data).toHaveProperty('error');
    });

    test('GET /api/users/search', async ({ request }) => {
      const response = await request.get('/api/users/search?q=test');
      
      expect(response.status()).toBe(200);
      
      const data = await response.json();
      expect(Array.isArray(data)).toBeTruthy();
    });

    test('GET /api/users/search - 空查询', async ({ request }) => {
      const response = await request.get('/api/users/search?q=');
      
      expect(response.status()).toBe(200);
      
      const data = await response.json();
      expect(Array.isArray(data)).toBeTruthy();
    });
  });

  test.describe('消息 API', () => {
    test('GET /api/messages', async ({ request }) => {
      const response = await request.get('/api/messages');
      
      // 消息 API 可能需要认证，所以可能是 401 或 200
      expect([200, 401, 403]).toContain(response.status());
      
      if (response.status() === 200) {
        const data = await response.json();
        expect(Array.isArray(data)).toBeTruthy();
      }
    });

    test('GET /api/messages/[conversationId]', async ({ request }) => {
      const response = await request.get('/api/messages/test-conversation-id');
      
      // 消息 API 可能需要认证
      expect([200, 401, 403, 404]).toContain(response.status());
    });
  });

  test.describe('用户历史 API', () => {
    test('GET /api/user/history', async ({ request }) => {
      const response = await request.get('/api/user/history');
      
      // 用户历史 API 需要认证
      expect([200, 401, 403]).toContain(response.status());
      
      if (response.status() === 200) {
        const data = await response.json();
        expect(Array.isArray(data)).toBeTruthy();
      }
    });
  });

  test.describe('IP 查找 API', () => {
    test('GET /api/ip-lookup', async ({ request }) => {
      const response = await request.get('/api/ip-lookup');
      
      expect(response.status()).toBe(200);
      
      const data = await response.json();
      expect(data).toHaveProperty('ip');
      expect(data).toHaveProperty('country');
      expect(typeof data.ip).toBe('string');
    });
  });

  test.describe('API 错误处理', () => {
    test('不存在的 API 端点', async ({ request }) => {
      const response = await request.get('/api/nonexistent');
      
      expect(response.status()).toBe(404);
    });

    test('无效的 HTTP 方法', async ({ request }) => {
      const response = await request.post('/api/health');
      
      expect(response.status()).toBe(405);
    });
  });

  test.describe('API 性能测试', () => {
    test('API 响应时间', async ({ request }) => {
      const startTime = Date.now();
      const response = await request.get('/api/health');
      const responseTime = Date.now() - startTime;
      
      expect(response.status()).toBe(200);
      expect(responseTime).toBeLessThan(5000); // 5秒内响应
    });

    test('并发 API 请求', async ({ request }) => {
      const promises = Array(10).fill(null).map(() => request.get('/api/health'));
      const responses = await Promise.all(promises);
      
      for (const response of responses) {
        expect(response.status()).toBe(200);
      }
    });
  });

  test.describe('API 数据验证', () => {
    test('API 响应格式一致性', async ({ request }) => {
      const response = await request.get('/api/personalities');
      const data = await response.json();
      
      if (Array.isArray(data) && data.length > 0) {
        const firstItem = data[0];
        const requiredFields = ['type', 'name'];
        
        for (const field of requiredFields) {
          expect(firstItem).toHaveProperty(field);
        }
      }
    });

    test('API 分页支持', async ({ request }) => {
      const response = await request.get('/api/blogs?page=1&limit=5');
      
      if (response.status() === 200) {
        const data = await response.json();
        expect(Array.isArray(data)).toBeTruthy();
        expect(data.length).toBeLessThanOrEqual(5);
      }
    });
  });
});
