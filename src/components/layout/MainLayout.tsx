'use client';

import { ReactNode } from 'react';
import { Header } from '@/components/layout/Header';

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-grow">
        {children}
      </main>
    </>
  );
} 