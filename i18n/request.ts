import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { locales } from '@root/i18n.config';

// Can be imported from a shared config
const allLocales = locales;

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!allLocales.includes(locale as any)) notFound();

  return {
    messages: (await import(`@root/messages/${locale}.json`)).default
  };
}); 