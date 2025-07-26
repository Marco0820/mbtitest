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
import Script from 'next/script';
import { headers } from 'next/headers';

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
      'MBTI', '16型人格', '性格测试', 'personality test', 'career', 'psychology',
      '社交', '交友', '约会', '恋爱', '灵魂伴侣', '性格配对',
      'MBTI dating', 'MBTI compatibility', 'MBTI match', 'MBTI community', 'MBTI forum',
      '16 personalities', 'personality types', 'find friends', 'social app', 'online dating',
      '外向', '内向', 'extrovert', 'introvert', 'social skills', '社交技巧',
      'INFP', 'INFJ', 'ENFP', 'ENFJ', 'INTP', 'INTJ', 'ENTP', 'ENTJ',
      'ISFP', 'ISFJ', 'ESFP', 'ESFJ', 'ISTP', 'ISTJ', 'ESTP', 'ESTJ',
      '调停者', '治愈者', '哲学家', '建筑师', '逻辑学家', '指挥官', '辩论家',
      '提倡者', '主人公', '竞选者', '物流师', '守卫者', '总经理', '执政官',
      '鉴赏家', '探险家', '表演者', '企业家', '星座', '心理学', '自我提升'
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en-US': `${siteUrl}/en`,
        'zh-CN': `${siteUrl}/zh-CN`,
      },
    },
    openGraph: {
      title: t('Layout.title'),
      description: t('Layout.description'),
      url: siteUrl,
      siteName: 'MBTI TEST',
      images: [
        {
          url: `${siteUrl}/logo.png`,
          width: 800,
          height: 600,
        },
      ],
      locale: locale,
      type: 'website',
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
      <body className={`${inter.className} bg-gray-50 flex flex-col min-h-screen`}>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4690050292021329"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
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
      </body>
    </html>
  );
}