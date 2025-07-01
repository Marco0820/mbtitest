import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Header } from '@/components/layout/Header';
import { PageLayout } from '@/components/layout/PageLayout';
import AuthProvider from '@/components/AuthProvider'; // 确保你已经创建了这个文件
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MBTI Test',
  description: 'An MBTI personality test application',
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale} dir={['ar', 'ur', 'fa'].includes(locale) ? 'rtl' : 'ltr'}>
      <body className={`${inter.className} bg-gray-50 flex flex-col min-h-screen`}>
        <AuthProvider>
          <NextIntlClientProvider messages={messages}>
            <Header />
            <PageLayout>
              <main className="flex-grow">
                {children}
              </main>
            </PageLayout>
          </NextIntlClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}