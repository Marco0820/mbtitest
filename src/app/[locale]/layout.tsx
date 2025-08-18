import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageLayout } from '@/components/layout/PageLayout';
import AuthProvider from '@/components/AuthProvider';
import '../globals.css';
import { createTranslator } from 'next-intl';
import { GoogleAnalytics } from '@next/third-parties/google';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from '@vercel/analytics/react';
import { headers } from 'next/headers';
import { StructuredData } from '@/components/seo/StructuredData';

export const dynamic = 'force-dynamic';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const messages = await getMessages({ locale });
  const t = createTranslator({ locale, messages });

  const headersList = headers();
  const pathname = headersList.get('x-next-pathname') || '';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-website.com';
  const canonicalUrl = `${siteUrl}${pathname}`;

  return {
    title: {
      default: t('Layout.title'),
      template: `%s | ${t('Layout.title')}`,
    },
    description: t('Layout.description'),
    keywords: [
      // 核心MBTI关键词
      'MBTI测试', 'MBTI性格测试', '免费MBTI测试', '16型人格', '16personalities',
      'Myers-Briggs', '迈尔斯布里格斯', '性格类型测试', '人格测试',
      
      // 长尾关键词
      'MBTI职业规划', 'MBTI恋爱配对', 'MBTI人际关系', 'MBTI性格分析',
      '哪种MBTI类型适合我', '如何知道自己的MBTI类型', 'MBTI测试准确吗',
      
      // 具体类型关键词
      'INTJ建筑师', 'ENFP竞选者', 'INFJ倡导者', 'ESTP企业家',
      'ISFJ守护者', 'ENTP辩论家', 'INFP调停者', 'ESTJ执行官',
      'ISTP鉴赏家', 'ENFJ主人公', 'INTP逻辑学家', 'ESFP表演者',
      'ISTJ物流师', 'ENTJ指挥官', 'ISFP冒险家', 'ESFJ领事',
      
      // 社交和应用场景
      '性格测试社交', 'MBTI交友', 'MBTI约会', '同城找人', '性格匹配',
      '心理测试', '职业性格测试', '团队协作测试', '婚恋匹配',
      
      // 心理学相关
      '心理学测试', '认知功能', '性格特征', '心理类型学', '人格心理学',
      '内向外向测试', '直觉感觉测试', '思维情感测试', '判断感知测试'
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: {
              'en-US': `${siteUrl}/en`,
      'zh-CN': `${siteUrl}/zh-CN`,
      'ja': `${siteUrl}/ja`,
      'ko': `${siteUrl}/ko`,
      'es': `${siteUrl}/es`,
      'fr': `${siteUrl}/fr`,
      'de': `${siteUrl}/de`,
      'ru': `${siteUrl}/ru`,
      'pt': `${siteUrl}/pt`,
      'ar': `${siteUrl}/ar`,
      'hi': `${siteUrl}/hi`,
      'it': `${siteUrl}/it`,
      'th': `${siteUrl}/th`,
      'vi': `${siteUrl}/vi`,
      'tr': `${siteUrl}/tr`,
      'pl': `${siteUrl}/pl`,
      'nl': `${siteUrl}/nl`,
      'sv': `${siteUrl}/sv`,
      'id': `${siteUrl}/id`,
      'ur': `${siteUrl}/ur`,
      'fa': `${siteUrl}/fa`,
      'zh-TW': `${siteUrl}/zh-TW`,
      },
    },
    openGraph: {
      title: t('Layout.title'),
      description: t('Layout.description'),
      url: canonicalUrl,
      siteName: 'MBTI TEST - 16型人格专业测评',
      images: [
        {
          url: `${siteUrl}/logo.png`,
          width: 1200,
          height: 630,
          alt: 'MBTI性格测试 - 16型人格测评',
        },
      ],
      locale: locale,
      type: 'website',
      tags: ['MBTI测试', '性格测试', '16型人格', '心理测试'],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('Layout.title'),
      description: t('Layout.description'),
      images: [`${siteUrl}/logo.png`],
    },
    icons: {
      icon: '/logo.png',
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  await setRequestLocale(locale);
  const messages = await getMessages();
  const isRTL = ['ar'].includes(locale);

  return (
    <html lang={locale} className={isRTL ? 'rtl' : ''}>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4690050292021329"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={`${inter.className} bg-gray-50 flex flex-col min-h-screen`}>
        {/* <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4690050292021329"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        /> */}
        <AuthProvider>
          <NextIntlClientProvider messages={messages}>
            <Header />
            <PageLayout>
              <main className="flex-grow">
                {children}
              </main>
            </PageLayout>
            <Footer />
          </NextIntlClientProvider>
        </AuthProvider>
        <SpeedInsights />
        <Analytics />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID as string} />
        <StructuredData type="website" />
        <StructuredData type="organization" />
      </body>
    </html>
  );
}