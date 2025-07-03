'use client';

// No longer need usePathname or Footer here
// import { usePathname } from 'next/navigation';
// import { Footer } from './Footer';

export function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // All conditional logic for footer is removed.
  // This component now acts as a simple wrapper.
  return <>{children}</>;
} 