'use client';

import { usePathname } from 'next/navigation';
import { Footer } from './Footer';

export function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isMessagesPage = pathname ? pathname.includes('/messages') : false;

  return (
    <>
      {children}
      {!isMessagesPage && <Footer />}
    </>
  );
} 