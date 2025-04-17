
import { Header } from '@/shared/components/shared';
import type { Metadata } from 'next';
import { Suspense } from 'react';


export const metadata: Metadata = {
  title: 'Мельникова | Главная',
};

export default function HomeLayout({
  children,
  winmodal,
}: Readonly<{
  children: React.ReactNode
  winmodal: React.ReactNode
}>) {
  return (

    <main className="min-h-screen">
      <Suspense>
        <Header />
      </Suspense>
      {winmodal}
      {children}
    </main>
  );
}

