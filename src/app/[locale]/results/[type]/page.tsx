'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { PersonalityResult } from '@/types/mbti';
import { BarChart, CheckCircle, AlertTriangle, Home } from 'lucide-react';
import Link from 'next/link';

// A simple component to render a dimension bar
function DimensionBar({ name, value }: { name: string; value: number }) {
  const t = useTranslations('results');
  const isHigh = value >= 50;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1 text-sm font-medium">
        <span className={`font-bold ${!isHigh ? 'text-purple-600' : 'text-gray-500'}`}>{t(`${name.toLowerCase()}_low`)}</span>
        <span className={`font-bold ${isHigh ? 'text-purple-600' : 'text-gray-500'}`}>{t(`${name.toLowerCase()}_high`)}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 relative overflow-hidden">
        <div
          className="bg-purple-600 h-4 rounded-full"
          style={{ width: `${value}%` }}
        />
        <div
          className="absolute top-0 left-0 w-full h-full flex justify-center items-center text-xs font-bold"
          style={{ color: value > 40 && value < 60 ? '#4a0e63' : 'white' }}
        >
          {Math.round(value)}%
        </div>
      </div>
    </div>
  );
}


export default function ResultPage() {
  const params = useParams();
  const router = useRouter();
  const locale = useLocale();
  const t_results = useTranslations('results');
  const t_personalities = useTranslations('personalities');

  const [result, setResult] = useState<PersonalityResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedResult = sessionStorage.getItem('mbtiResult');
    if (storedResult) {
      const parsedResult = JSON.parse(storedResult);
      // Validate that the stored result matches the URL type
      if (parsedResult.type === params.type) {
        setResult(parsedResult);
      } else {
        // If not, maybe redirect to the correct result page or show an error
        router.replace(`/${locale}/results/${parsedResult.type}`);
      }
    }
    setIsLoading(false);
  }, [params.type, locale, router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center px-4">
        <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
        <h1 className="text-3xl font-bold mb-2">{t_results('no_result_title')}</h1>
        <p className="text-gray-600 mb-6">{t_results('no_result_description')}</p>
        <Link href={`/${locale}/test`} className="flex items-center bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
          <Home className="w-5 h-5 mr-2" />
          {t_results('take_test_button')}
        </Link>
      </div>
    );
  }

  const { type, scores, confidence, consistency, anomalies } = result;
  const fourLetterType = type.split('-')[0].toLowerCase();

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <p className="text-lg text-purple-600 font-semibold">{t_results('your_personality_type')}</p>
          <h1 className="text-6xl font-extrabold text-gray-900 mt-2">{type}</h1>
          <p className="text-2xl text-gray-700 font-light mt-4">{t_personalities(`${fourLetterType}.name`)}</p>
        </header>

        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
            <BarChart className="w-8 h-8 mr-3 text-purple-500" />
            {t_results('breakdown_title')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            <DimensionBar name="extraversion" value={scores.extraversion} />
            <DimensionBar name="intuition" value={scores.intuition} />
            <DimensionBar name="feeling" value={scores.feeling} />
            <DimensionBar name="judging" value={scores.judging} />
            <DimensionBar name="assertive" value={scores.assertive} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <CheckCircle className="w-6 h-6 mr-2 text-green-500" />
              {t_results('confidence_title')}
            </h3>
            <p className="text-gray-600">
              {t_results('confidence_description', { confidence: Math.round(confidence * 100) })}
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <CheckCircle className="w-6 h-6 mr-2 text-green-500" />
              {t_results('consistency_title')}
            </h3>
            <p className="text-gray-600">
             {t_results('consistency_description', { consistency: Math.round(consistency * 100) })}
            </p>
          </div>
        </div>

        {anomalies.length > 0 && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg mt-8 shadow-md">
            <div className="flex">
              <div className="py-1">
                <AlertTriangle className="h-6 w-6 text-yellow-500 mr-3" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-yellow-800 mb-2">{t_results('anomalies_title')}</h3>
                <ul className="list-disc list-inside text-yellow-700">
                  {anomalies.map((anomaly: string) => <li key={anomaly}>{t_results(anomaly as any)}</li>)}
                </ul>
              </div>
            </div>
          </div>
        )}
         <div className="mt-12 text-center">
            <Link href={`/${locale}/personalities/${type.split('-')[0].toLowerCase()}`} className="bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-700 transition-colors shadow-lg">
                {t_results('view_full_profile_button', { type })}
            </Link>
        </div>
      </div>
    </div>
  );
}