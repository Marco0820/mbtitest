'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Clock, ShieldCheck, Users, ArrowRight } from 'lucide-react';

export function TestStart() {
  const t = useTranslations('test');
  const locale = useLocale();

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50 flex items-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
              {t('title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
              <Clock className="w-8 h-8 text-purple-600" />
              <div className="text-left">
                <div className="font-semibold text-gray-900">{t('feature_quick_title')}</div>
                <div className="text-sm text-gray-600">{t('time')}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
              <ShieldCheck className="w-8 h-8 text-green-600" />
              <div className="text-left">
                <div className="font-semibold text-gray-900">{t('feature_private_title')}</div>
                <div className="text-sm text-gray-600">{t('privacy')}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
              <Users className="w-8 h-8 text-blue-600" />
              <div className="text-left">
                <div className="font-semibold text-gray-900">{t('feature_accurate_title')}</div>
                <div className="text-sm text-gray-600">{t('accuracy')}</div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Link
              href={`/${locale}/test/questions`}
              className="inline-flex items-center bg-purple-600 text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-purple-700 transition-colors shadow-lg group"
            >
              <span>{t('start_button')}</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <p className="text-sm text-gray-500">
              {t('tagline')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}