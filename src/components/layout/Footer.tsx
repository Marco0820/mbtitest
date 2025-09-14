'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { ShareButton } from '@/components/ui/ShareButton';

export function Footer() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 space-y-4 rtl:text-right pr-8">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">MB</span>
              </div>
              <span className="text-xl font-bold">MBTITEST</span>
            </div>
            <p className="text-gray-400 text-sm">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Company Links */}
          <div className="space-y-4 rtl:text-right">
            <h3 className="font-semibold text-lg">{t('footer.company_links')}</h3>
            <div className="flex flex-col space-y-2">
              <Link href={`/${locale}/about`} className="text-gray-400 hover:text-white transition-colors">
                {t('nav.about')}
              </Link>
              <Link href={`/${locale}/blog`} className="text-gray-400 hover:text-white transition-colors">
                {t('nav.blog')}
              </Link>
              <Link href={`/${locale}/contact`} className="text-gray-400 hover:text-white transition-colors">
                {t('footer.contact')}
              </Link>
            </div>
          </div>

          {/* Resources Links */}
          <div className="space-y-4 rtl:text-right">
            <h3 className="font-semibold text-lg">{t('footer.resources')}</h3>
            <div className="flex flex-col space-y-2">
              <Link href={`/${locale}/test`} className="text-gray-400 hover:text-white transition-colors">
                {t('nav.test')}
              </Link>
              <Link href={`/${locale}/personalities`} className="text-gray-400 hover:text-white transition-colors">
                {t('nav.personalities')}
              </Link>
              <Link href={`/${locale}/faq`} className="text-gray-400 hover:text-white transition-colors">
                {t('footer.faq')}
              </Link>
            </div>
          </div>

          {/* Legal Links */}
          <div className="space-y-4 rtl:text-right">
            <h3 className="font-semibold text-lg">{t('footer.legal')}</h3>
            <div className="flex flex-col space-y-2">
              <Link href={`/${locale}/privacy`} className="text-gray-400 hover:text-white transition-colors">
                {t('footer.privacy')}
              </Link>
              <Link href={`/${locale}/terms`} className="text-gray-400 hover:text-white transition-colors">
                {t('footer.terms')}
              </Link>
              <Link href={`/${locale}/cookies`} className="text-gray-400 hover:text-white transition-colors">
                {t('footer.cookies')}
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm text-center sm:text-left">
            {t('footer.company')}
          </p>
          <div className="mt-4 sm:mt-0">
            <ShareButton
              url={typeof window !== 'undefined' ? window.location.origin + `/${locale}` : `https://mbti16personalities.online/${locale}`}
              title={locale === 'zh-CN' ? "MBTITEST - 免费性格测试" : "MBTITEST - Free Personality Test"}
              description={t('footer.tagline')}
              hashtags={['MBTI', 'PersonalityTest', 'Psychology']}
              variant="compact"
              size="medium"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}