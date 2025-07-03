import { notFound } from 'next/navigation';
import { useTranslations } from 'next-intl';
import PersonalityDetail from '@/components/personalities/PersonalityDetail';
import PersonalityDetailRTL from '@/components/personalities/PersonalityDetailRTL';

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
  return validTypes.map((type) => ({
    type: type,
  }));
}