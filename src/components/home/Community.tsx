'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export function Community() {
  const t = useTranslations('home.community');

  return (
    <section className="py-12 bg-white sm:py-16">
      <div className="max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
        <div className="px-8 py-10 bg-gray-100 rounded-2xl sm:p-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-base font-normal leading-7 text-gray-600">
            {t('subtitle')}
          </p>
          <div className="mt-8">
            <Link
              href="/people"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
            >
              {t('cta')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
} 