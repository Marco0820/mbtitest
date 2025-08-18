import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata({ 
  params 
}: { 
  params: { locale: string } 
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'privacy' });
  
  return {
    title: t('seo_title'),
    description: t('seo_description'),
  };
}

export default async function PrivacyPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  const t = await getTranslations('privacy');

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 rtl:text-right">
            {t('title')}
          </h1>
          
          <div className="prose prose-lg max-w-none rtl:text-right" dir={locale === 'ar' || locale === 'fa' || locale === 'ur' ? 'rtl' : 'ltr'}>
            <p className="text-gray-600 mb-6">
              {t('effective_date')}: {t('date')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('section1_title')}
              </h2>
              <p className="text-gray-600 mb-4">
                {t('section1_content')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('section2_title')}
              </h2>
              <p className="text-gray-600 mb-4">
                {t('section2_content')}
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>{t('data_item1')}</li>
                <li>{t('data_item2')}</li>
                <li>{t('data_item3')}</li>
                <li>{t('data_item4')}</li>
                <li>{t('data_item5')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('section3_title')}
              </h2>
              <p className="text-gray-600 mb-4">
                {t('section3_content')}
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>{t('use_item1')}</li>
                <li>{t('use_item2')}</li>
                <li>{t('use_item3')}</li>
                <li>{t('use_item4')}</li>
                <li>{t('use_item5')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('section4_title')}
              </h2>
              <p className="text-gray-600 mb-4">
                {t('section4_content')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('section5_title')}
              </h2>
              <p className="text-gray-600 mb-4">
                {t('section5_content')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('section6_title')}
              </h2>
              <p className="text-gray-600 mb-4">
                {t('section6_content')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('section7_title')}
              </h2>
              <p className="text-gray-600 mb-4">
                {t('section7_content')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('section8_title')}
              </h2>
              <p className="text-gray-600 mb-4">
                {t('section8_content')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('contact_title')}
              </h2>
              <p className="text-gray-600">
                {t('contact_content')}
              </p>
              <p className="text-gray-600 mt-2">
                {t('email')}: huazhenglobal@gmail.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
