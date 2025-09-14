import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import Link from 'next/link';

// Generate metadata for SEO
export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'about' });

  return {
    title: t('seo_title'),
    description: t('seo_description'),
    keywords: ['MBTI test', '16 personalities', 'free personality test', 'accurate MBTI', 'personality types', 'find friends by personality', 'personality compatibility'],
  };
}

export default async function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations('about');
  
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6 py-16 text-gray-800 dark:text-gray-200">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-blue-600 dark:text-blue-400 mb-8 rtl:text-right" dir={locale === 'ar' || locale === 'fa' || locale === 'ur' ? 'rtl' : 'ltr'}>
            {t('title')}
          </h1>

          <div className="prose lg:prose-xl max-w-none dark:prose-invert rtl:text-right" dir={locale === 'ar' || locale === 'fa' || locale === 'ur' ? 'rtl' : 'ltr'}>
            <p className="text-xl leading-relaxed mb-6 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
              {t('intro')}
            </p>

            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mt-12 mb-4 border-b-2 border-blue-500 pb-2">
              {t('mission_title')}
            </h2>
            <p>
              {t('mission_content')}
            </p>

            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mt-12 mb-4 border-b-2 border-blue-500 pb-2">
              {t('vision_title')}
            </h2>
            <p>
              {t('vision_content')}
            </p>

            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mt-12 mb-4 border-b-2 border-blue-500 pb-2">
              {t('community_title')}
            </h2>
            <p>
              {t('community_intro')}
            </p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>
                <strong className="font-semibold">{t('feature1_title')}:</strong> {t('feature1_description')}
              </li>
              <li>
                <strong className="font-semibold">{t('feature2_title')}:</strong> {t('feature2_description')}
              </li>
              <li>
                <strong className="font-semibold">{t('feature3_title')}:</strong> {t('feature3_description')}
              </li>
            </ul>
            <p>
              {t('community_conclusion')}
            </p>

            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mt-12 mb-4 border-b-2 border-blue-500 pb-2">
              {t('team_title')}
            </h2>
            <p>
              {t('team_content')}
            </p>

            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mt-12 mb-4 border-b-2 border-blue-500 pb-2">
              {t('journey_title')}
            </h2>
            <p>
              {t('journey_content')}
            </p>
          </div>

          <div className="text-center mt-16">
            <Link 
              href={`/${locale}/test`} 
              className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-all text-lg"
            >
              {t('cta_button')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 