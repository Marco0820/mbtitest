import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import PersonalityDetail from '@/components/personalities/PersonalityDetail';
import PersonalityDetailRTL from '@/components/personalities/PersonalityDetailRTL';
import { locales } from '@root/i18n.config';
import { PersonalityProvider } from '@/context/PersonalityContext';
import { getPersonality } from '@/services/personalityService';

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

export function generateStaticParams() {
  const params: { type: string; locale: string }[] = [];
  locales.forEach((locale: string) => {
    validTypes.forEach((type: string) => {
      params.push({ locale, type });
    });
  });
  return params;
}