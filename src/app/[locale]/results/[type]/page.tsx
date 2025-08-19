export const dynamic = 'error';
export const dynamicParams = true;

import { routing } from '@/routing';
import ResultsClientPage from '@/components/results/ResultsClientPage';
import { Suspense } from 'react';
import { getMessages } from 'next-intl/server';
import { createTranslator } from 'next-intl';
import type { Metadata } from 'next';

const validTypes = [
  'intj', 'intp', 'entj', 'entp',
  'infj', 'infp', 'enfj', 'enfp',
  'istj', 'isfj', 'estj', 'esfj',
  'istp', 'isfp', 'estp', 'esfp'
];

export function generateStaticParams() {
  const params: { type: string; locale: string }[] = [];
  routing.locales.forEach((locale) => {
    validTypes.forEach((type) => {
      params.push({ locale, type });
    });
  });
  return params;
}

export async function generateMetadata({ params }: { params: { type: string; locale: string } }): Promise<Metadata> {
  const { type, locale } = params;
  const messages = await getMessages({ locale });
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mbti16personalities.online';
  const canonicalUrl = `${siteUrl}/${locale}/results/${type}`;
  
  const typeCode = type.toLowerCase().split('-')[0];
  
  // Create fallback titles and descriptions
  const title = locale === 'zh-CN' 
    ? `${type.toUpperCase()} 人格类型结果 - MBTI测试`
    : `${type.toUpperCase()} Personality Type Results - MBTI Test`;
    
  const description = locale === 'zh-CN'
    ? `您的MBTI人格测试结果显示您是 ${type.toUpperCase()}。探索您的优势、职业道路和关系兼容性。`
    : `Your MBTI personality test results show you are ${type.toUpperCase()}. Discover your strengths, career paths, and relationship compatibility.`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'MBTI TEST - 16型人格专业测评',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default function ResultPage({ params }: { params: { type: string } }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultsClientPage type={params.type} />
    </Suspense>
  );
}