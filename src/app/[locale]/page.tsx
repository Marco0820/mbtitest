import { Hero } from '@/components/home/Hero';
import { Features } from '@/components/home/Features';
import { PersonalityTypes } from '@/components/home/PersonalityTypes';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Features />
      <PersonalityTypes />
    </main>
  );
}