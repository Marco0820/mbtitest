import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata({ 
  params 
}: { 
  params: { locale: string } 
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'cookies' });
  
  return {
    title: t('seo_title'),
    description: t('seo_description'),
  };
}

export default async function CookiePolicyPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  const t = await getTranslations('cookies');

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 rtl:text-right">
            {t('policy_title')}
          </h1>
          
          <div className="prose prose-lg max-w-none rtl:text-right" dir={locale === 'ar' || locale === 'fa' || locale === 'ur' ? 'rtl' : 'ltr'}>
            <p className="text-gray-600 mb-6">
              {t('last_updated')}: {t('update_date')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('what_are_cookies_title')}
              </h2>
              <p className="text-gray-600 mb-4">
                {t('what_are_cookies_content')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('why_we_use_cookies_title')}
              </h2>
              <p className="text-gray-600 mb-4">
                {t('why_we_use_cookies_content')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('cookie_types_title')}
              </h2>
              
              <div className="space-y-6">
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {t('necessary_title')}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    {t('necessary_description')}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>{t('examples')}:</strong> {t('necessary_examples')}
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {t('analytics_title')}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    {t('analytics_description')}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>{t('examples')}:</strong> {t('analytics_examples')}
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {t('functional_title')}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    {t('functional_description')}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>{t('examples')}:</strong> {t('functional_examples')}
                  </p>
                </div>

                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {t('marketing_title')}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    {t('marketing_description')}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>{t('examples')}:</strong> {t('marketing_examples')}
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('third_party_cookies_title')}
              </h2>
              <p className="text-gray-600 mb-4">
                {t('third_party_cookies_content')}
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li><strong>Google Analytics:</strong> {t('google_analytics_desc')}</li>
                <li><strong>Google Ads:</strong> {t('google_ads_desc')}</li>
                <li><strong>Social Media:</strong> {t('social_media_desc')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('manage_cookies_title')}
              </h2>
              <p className="text-gray-600 mb-4">
                {t('manage_cookies_content')}
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-blue-800 text-sm">
                  <strong>{t('note')}:</strong> {t('disable_cookies_warning')}
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('browser_settings_title')}
              </h2>
              <p className="text-gray-600 mb-4">
                {t('browser_settings_content')}
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
                <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
                <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('data_retention_title')}
              </h2>
              <p className="text-gray-600 mb-4">
                {t('data_retention_content')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('policy_updates_title')}
              </h2>
              <p className="text-gray-600 mb-4">
                {t('policy_updates_content')}
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
