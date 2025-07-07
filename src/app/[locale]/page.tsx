import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/home/Hero';
import { Features } from '@/components/home/Features';
import { PersonalityTypes } from '@/components/home/PersonalityTypes';
import { routing } from '@/routing';

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return (
    <main>
      <Hero />
      <Features />
      <PersonalityTypes />
    </main>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}