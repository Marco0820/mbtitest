import { setRequestLocale } from 'next-intl/server';
import { TestStart } from '@/components/test/TestStart';

export default function TestPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return (
    <main>
      <TestStart />
    </main>
  );
}