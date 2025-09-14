import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.pexels.com', 'www.pexels.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'www.pexels.com',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ]
  },
  experimental: {
    optimizePackageImports: ['lucide-react']
  },
  // 排除系统目录
  webpack: (config, { isServer }) => {
    // 限制webpack扫描范围
    config.resolve = config.resolve || {};
    config.resolve.modules = ['node_modules', 'src'];
    
    // 设置更严格的忽略规则
    config.watchOptions = {
      ignored: [
        '**/node_modules/**',
        '**/.next/**',
        '**/C:/Users/**',
        '**/C:/Program Files/**',
        '**/C:/Program Files (x86)/**',
        '**/C:/Windows/**',
        '**/C:/System Volume Information/**',
        '**/C:/ProgramData/**',
        '**/C:/System32/**',
      ],
      poll: false,
    };
    
    // 限制文件系统访问
    config.snapshot = {
      managedPaths: [/^(.+?[\\/]node_modules[\\/])(.+)$/],
      immutablePaths: [/^(.+?[\\/]node_modules[\\/])(.+)$/],
    };
    
    return config;
  },
  // SEO 优化配置
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
  // 压缩优化
  compress: true,
  // 开启页面缓存
  poweredByHeader: false,
};

export default withNextIntl(nextConfig);