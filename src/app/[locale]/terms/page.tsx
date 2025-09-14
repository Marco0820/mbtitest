import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata({ 
  params 
}: { 
  params: { locale: string } 
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'terms' });
  
  return {
    title: t('seo_title'),
    description: t('seo_description'),
  };
}

export default async function TermsPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  const t = await getTranslations('terms');

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 py-16 text-gray-800 dark:text-gray-200">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            {t('title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {t('effective_date')}: {t('date')}
          </p>

          <div className="prose prose-lg max-w-none dark:prose-invert" dir={locale === 'ar' || locale === 'fa' || locale === 'ur' ? 'rtl' : 'ltr'}>
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 border-b pb-2">
                {t('section1_title')}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {t('section1_content')}
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 border-b pb-2">
                {t('section2_title')}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {t('section2_content')}
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 pl-4">
                <li>{t('service_item1')}</li>
                <li>{t('service_item2')}</li>
                <li>{t('service_item3')}</li>
                <li>{t('service_item4')}</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 border-b pb-2">
                {t('section3_title')}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {t('section3_content')}
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 pl-4">
                <li>{t('acceptable_item1')}</li>
                <li>{t('acceptable_item2')}</li>
                <li>{t('acceptable_item3')}</li>
                <li>{t('acceptable_item4')}</li>
                <li>{t('acceptable_item5')}</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 border-b pb-2">
                {t('section4_title')}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {t('section4_content')}
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 pl-4">
                <li>{t('prohibited_item1')}</li>
                <li>{t('prohibited_item2')}</li>
                <li>{t('prohibited_item3')}</li>
                <li>{t('prohibited_item4')}</li>
                <li>{t('prohibited_item5')}</li>
                <li>{t('prohibited_item6')}</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 border-b pb-2">
                {t('section5_title')}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {t('section5_content')}
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 border-b pb-2">
                {t('section6_title')}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {t('section6_content')}
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 border-b pb-2">
                {t('section7_title')}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {t('section7_content')}
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 border-b pb-2">
                {t('section8_title')}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {t('section8_content')}
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 border-b pb-2">
                {t('section9_title')}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {t('section9_content')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 border-b pb-2">
                {t('contact_title')}
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                {t('contact_content')}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mt-2">
                {t('email')}: huazhenglobal@gmail.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
