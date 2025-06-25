import { notFound } from 'next/navigation';
import { useTranslations } from 'next-intl';
import PersonalityDetail from '@/components/personalities/PersonalityDetail';

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
  const { type } = params;

  if (!validTypes.includes(type.toLowerCase())) {
    notFound();
  }

  return (
    <main>
      <PersonalityDetail type={type.toLowerCase()} />
    </main>
  );
}

export function generateStaticParams() {
  return validTypes.map((type) => ({
    type: type,
  }));
}