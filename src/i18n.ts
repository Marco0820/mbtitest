import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Can be imported from a shared config
const locales = [
  'en', 'zh-CN', 'zh-TW', 'es', 'ar', 'pt', 'ja', 'ru', 'fr', 'de',
  'ko', 'hi', 'tr', 'vi', 'th', 'it', 'ur', 'pl', 'id', 'nl', 'fa'
];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
