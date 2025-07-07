import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // 你支持的所有语言
  locales: ['en', 'zh-CN', 'zh-TW', 'es', 'ar', 'pt', 'ja', 'ru', 'fr', 'de', 'ko', 'hi', 'tr', 'vi', 'th', 'it', 'ur', 'pl', 'id', 'nl', 'fa'],
  
  // 默认语言
  defaultLocale: 'en',
  
  // 可选：自定义路径名
  pathnames: {
    '/': '/',
    '/about': '/about',
    '/personalities': '/personalities',
    // 添加其他路径
  }
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number]; 