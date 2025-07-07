export const dynamic = 'error';
export const dynamicParams = false;

import { routing } from '@/routing';
import ResultsClientPage from '@/components/results/ResultsClientPage';

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

export default function ResultPage({ params }: { params: { type: string } }) {
  return <ResultsClientPage type={params.type} />;
}