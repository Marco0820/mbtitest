export const dynamic = 'error';
export const dynamicParams = false;

import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import PersonalityDetail from '@/components/personalities/PersonalityDetail';
import PersonalityDetailRTL from '@/components/personalities/PersonalityDetailRTL';
import { routing } from '@/routing';

const validTypes = [
  'intj', 'intp', 'entj', 'entp',
  'infj', 'infp', 'enfj', 'enfp',
  'istj', 'isfj', 'estj', 'esfj',
  'istp', 'isfp', 'estp', 'esfp'
];

interface PersonalityPageProps {
  params: {
    locale: string;
    type: string;
  };
}

export function generateStaticParams() {
  const params: { type: string; locale: string }[] = [];
  routing.locales.forEach((locale) => {
    validTypes.forEach((type: string) => {
      params.push({ locale, type });
    });
  });
  return params;
}

export default function PersonalityPage({ params }: PersonalityPageProps) {
  setRequestLocale(params.locale);
  const { type, locale } = params;

  if (!validTypes.includes(type.toLowerCase())) {
    notFound();
  }

  const isRTL = ['ar'].includes(locale);

  return (
    <main>
      {isRTL ? (
        <PersonalityDetailRTL type={type.toLowerCase()} locale={locale} />
      ) : (
        <PersonalityDetail type={type.toLowerCase()} locale={locale} />
      )}
    </main>
  );
}