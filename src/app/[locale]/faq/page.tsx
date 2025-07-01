'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function FaqPage() {
  const t = useTranslations('faq');
  const faqs = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6'];

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            {t('title')}
          </h1>
        </div>
        <div className="max-w-4xl mx-auto space-y-8">
          {faqs.map((faqKey) => (
            <Card key={faqKey} className="overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  {t(`${faqKey}_title`)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  {t(`${faqKey}_text`)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 