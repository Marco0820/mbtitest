'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

export function Footer() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">MB</span>
              </div>
              <span className="text-xl font-bold">MBTITEST</span>
            </div>
            <p className="text-gray-400 text-sm">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{t('footer.quick_links')}</h3>
            <div className="flex flex-col space-y-2">
              <Link href={`/${locale}/test`} className="text-gray-400 hover:text-white transition-colors">
                {t('nav.test')}
              </Link>
              <Link href={`/${locale}/personalities`} className="text-gray-400 hover:text-white transition-colors">
                {t('nav.personalities')}
              </Link>
              <Link href={`/${locale}/people`} className="text-gray-400 hover:text-white transition-colors">
                {t('nav.people')}
              </Link>
              <Link href={`/${locale}/blog`} className="text-gray-400 hover:text-white transition-colors">
                {t('nav.blog')}
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{t('footer.support')}</h3>
            <div className="flex flex-col space-y-2">
              <Link href={`/${locale}/about`} className="text-gray-400 hover:text-white transition-colors">
                {t('nav.about')}
              </Link>
              <Link href={`/${locale}/faq`} className="text-gray-400 hover:text-white transition-colors">
                FAQ
              </Link>
              <Link href={`/${locale}/support`} className="text-gray-400 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{t('footer.legal')}</h3>
            <div className="flex flex-col space-y-2">
              <Link href={`/${locale}/privacy`} className="text-gray-400 hover:text-white transition-colors">
                {t('footer.privacy')}
              </Link>
              <Link href={`/${locale}/terms`} className="text-gray-400 hover:text-white transition-colors">
                {t('footer.terms')}
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            {t('footer.company')}
          </p>
        </div>
      </div>
    </footer>
  );
}