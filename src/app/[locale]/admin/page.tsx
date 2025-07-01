'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function AdminPage() {
  const t = useTranslations('Admin');
  const [loadingLocale, setLoadingLocale] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const handlePopulate = async (locale: string) => {
    setLoadingLocale(locale);
    setResult(null);
    try {
      const res = await fetch(`/api/cron?locale=${locale}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'An error occurred.');
      }
      setResult(`Success for ${locale}: ${JSON.stringify(data)}`);
    } catch (error: any) {
      setResult(`Error for ${locale}: ${error.message}`);
    } finally {
      setLoadingLocale(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{t('title')}</h1>
      <div className="space-y-4">
        <div>
          <h2 className="text-xl mb-2">{t('populateBlogs')}</h2>
          <div className="flex space-x-4">
            <button
              onClick={() => handlePopulate('en')}
              disabled={loadingLocale === 'en'}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
            >
              {loadingLocale === 'en' ? t('populating') : t('populateEnglish')}
            </button>
            <button
              onClick={() => handlePopulate('zh')}
              disabled={loadingLocale === 'zh'}
              className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-gray-400"
            >
              {loadingLocale === 'zh' ? t('populating') : t('populateChinese')}
            </button>
          </div>
        </div>
        {result && (
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded">
            <h3 className="font-semibold">{t('results')}</h3>
            <pre className="whitespace-pre-wrap break-all">{result}</pre>
          </div>
        )}
      </div>
    </div>
  );
} 