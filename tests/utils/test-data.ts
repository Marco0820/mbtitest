// 测试数据工具类
export class TestData {
  // 生成随机用户数据
  static generateUser(overrides: Partial<UserData> = {}): UserData {
    const timestamp = Date.now();
    return {
      name: `Test User ${timestamp}`,
      email: `test${timestamp}@example.com`,
      password: 'TestPassword123!',
      ...overrides
    };
  }

  // 生成随机博客数据
  static generateBlog(overrides: Partial<BlogData> = {}): BlogData {
    const timestamp = Date.now();
    return {
      title: `Test Blog Post ${timestamp}`,
      content: `This is a test blog post content created at ${new Date().toISOString()}`,
      excerpt: `Test excerpt for blog post ${timestamp}`,
      ...overrides
    };
  }

  // 获取测试用的性格类型
  static getPersonalityTypes(): string[] {
    return ['INTJ', 'ENFP', 'ISTJ', 'ESTP', 'INFP', 'ENTJ', 'ISFJ', 'ESTP'];
  }

  // 获取支持的语言
  static getSupportedLocales(): string[] {
    return ['en', 'zh-CN', 'zh-TW', 'es', 'ar', 'pt', 'ja', 'ru', 'fr', 'de', 'ko', 'hi', 'tr', 'vi', 'th', 'it', 'ur', 'pl', 'id', 'nl', 'fa'];
  }

  // 生成随机字符串
  static randomString(length: number = 10): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  // 生成随机邮箱
  static randomEmail(): string {
    const domains = ['example.com', 'test.com', 'demo.org'];
    const domain = domains[Math.floor(Math.random() * domains.length)];
    return `${this.randomString(8)}@${domain}`;
  }

  // 生成随机 URL
  static randomUrl(): string {
    const paths = ['/test', '/demo', '/sample', '/example'];
    const path = paths[Math.floor(Math.random() * paths.length)];
    return `https://example.com${path}/${this.randomString(5)}`;
  }

  // 获取测试用的设备配置
  static getDeviceConfigs() {
    return {
      desktop: { width: 1920, height: 1080 },
      tablet: { width: 768, height: 1024 },
      mobile: { width: 375, height: 667 },
      largeMobile: { width: 414, height: 896 }
    };
  }

  // 获取测试用的网络配置
  static getNetworkConfigs() {
    return {
      fast: { download: 10000, upload: 5000, latency: 10 },
      slow: { download: 1000, upload: 500, latency: 100 },
      offline: { offline: true }
    };
  }
}

// 类型定义
export interface UserData {
  name: string;
  email: string;
  password: string;
  mbti?: string;
  bio?: string;
  country?: string;
  state?: string;
  city?: string;
  gender?: string;
}

export interface BlogData {
  title: string;
  content: string;
  excerpt: string;
  author?: string;
  publishedAt?: Date;
  tags?: string[];
}

export interface TestConfig {
  baseURL: string;
  timeout: number;
  retries: number;
  headless: boolean;
  viewport: {
    width: number;
    height: number;
  };
}

// 测试环境配置
export const testEnvironments = {
  development: {
    baseURL: 'http://localhost:3000',
    timeout: 30000,
    retries: 2,
    headless: true,
    viewport: { width: 1920, height: 1080 }
  },
  staging: {
    baseURL: 'https://staging.mbti16personalities.online',
    timeout: 60000,
    retries: 3,
    headless: true,
    viewport: { width: 1920, height: 1080 }
  },
  production: {
    baseURL: 'https://www.mbti16personalities.online',
    timeout: 60000,
    retries: 3,
    headless: true,
    viewport: { width: 1920, height: 1080 }
  }
};

// 性能测试阈值
export const performanceThresholds = {
  loadTime: 3000,        // 3秒
  domContentLoaded: 2000, // 2秒
  firstContentfulPaint: 1500, // 1.5秒
  totalTime: 5000,       // 5秒
  apiResponseTime: 1000, // 1秒
  databaseQueryTime: 2000 // 2秒
};

// 可访问性测试配置
export const accessibilityConfig = {
  minTouchTargetSize: 44,  // 最小触摸目标大小（像素）
  minFontSize: 12,         // 最小字体大小（像素）
  maxHeadingLevel: 6,      // 最大标题层级
  requiredAriaAttributes: ['aria-label', 'aria-labelledby', 'aria-describedby']
};

// SEO 测试配置
export const seoConfig = {
  titleLength: { min: 10, max: 60 },
  descriptionLength: { min: 120, max: 160 },
  requiredMetaTags: ['title', 'description', 'viewport'],
  requiredOpenGraphTags: ['og:title', 'og:description', 'og:type'],
  requiredTwitterTags: ['twitter:card', 'twitter:title', 'twitter:description']
};
