import {getRequestConfig} from 'next-intl/server';
import {locales} from '../i18n.config';
import {notFound} from 'next/navigation';

export default getRequestConfig(async ({locale}) => {
  if (!locales.includes(locale as any)) {
    notFound();
  }

  return {
    messages: {
      ...(await import(`../messages/${locale}.json`)).default,
      ...(await import(`../messages/results.${locale}.json`)).default,
    },
  };
});