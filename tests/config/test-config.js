// 测试配置文件
module.exports = {
  // 测试环境配置
  environments: {
    development: {
      baseURL: 'http://localhost:3000',
      timeout: 30000,
      retries: 2
    },
    staging: {
      baseURL: 'https://staging.mbti16personalities.online',
      timeout: 60000,
      retries: 3
    },
    production: {
      baseURL: 'https://www.mbti16personalities.online',
      timeout: 60000,
      retries: 3
    }
  },

  // 测试数据配置
  testData: {
    users: {
      valid: {
        name: 'Test User',
        email: 'test@example.com',
        password: 'TestPassword123!'
      },
      invalid: {
        name: '',
        email: 'invalid-email',
        password: '123'
      }
    },
    personalities: ['INTJ', 'ENFP', 'ISTJ', 'ESTP'],
    locales: ['en', 'zh-CN', 'es', 'ar']
  },

  // 性能测试阈值
  performance: {
    thresholds: {
      loadTime: 3000,        // 3秒
      domContentLoaded: 2000, // 2秒
      firstContentfulPaint: 1500, // 1.5秒
      totalTime: 5000        // 5秒
    }
  },

  // 可访问性测试配置
  accessibility: {
    minTouchTargetSize: 44,  // 最小触摸目标大小（像素）
    minFontSize: 12,         // 最小字体大小（像素）
    maxHeadingLevel: 6       // 最大标题层级
  },

  // SEO 测试配置
  seo: {
    titleLength: {
      min: 10,
      max: 60
    },
    descriptionLength: {
      min: 120,
      max: 160
    }
  }
};
