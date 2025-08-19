import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageLayout } from '@/components/layout/PageLayout';
import AuthProvider from '@/components/AuthProvider';
import { CookieBanner } from '@/components/ui/CookieBanner';
import { CookieManager } from '@/components/ui/CookieManager';
import '../globals.css';
import { createTranslator } from 'next-intl';
import { GoogleAnalytics } from '@next/third-parties/google';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from '@vercel/analytics/react';
import { headers } from 'next/headers';
import { StructuredData } from '@/components/seo/StructuredData';

export const dynamic = 'force-dynamic';

const inter = Inter({ subsets: ['latin'] });

// Metadata is now handled at the page level to avoid conflicts with static generation

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
            <CookieBanner />
            <CookieManager />
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