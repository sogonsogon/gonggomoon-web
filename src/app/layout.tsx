import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '@/app/globals.css';
import Header from '@/shared/components/layout/Header';
import QueryProvider from '@/shared/provider/QueryProvider';
import { Toaster } from 'sonner';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { userQueryOptions } from '@/features/user/queries';
import LoginModal from '@/features/auth/components/ui/LoginModal';
import LoginModalTrigger from '@/features/auth/components/ui/LoginModalTrigger';
import ExperienceExtractionPollingListener from '@/features/experience/components/sections/ExperienceExtractionPollingListener';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: '공고문',
  description:
    '직무별 채용 공고를 한눈에. AI 포트폴리오 전략과 모의 면접까지, 취업 준비의 모든 것을 공고문에서 시작하세요.',
};

const pretendard = localFont({
  src: '../shared/assets/fonts/PretendardVariable.woff2',
  display: 'block',
  weight: '100 900',
  variable: '--font-pretendard',
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(userQueryOptions());
  return (
    <html lang="ko" className={`${pretendard.variable} ${pretendard.className}`}>
      <body>
        <QueryProvider>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <Header />
            {children}
            <ExperienceExtractionPollingListener />
            <Toaster richColors position="top-right" />
            <LoginModal />
            <Suspense>
              <LoginModalTrigger />
            </Suspense>
          </HydrationBoundary>
        </QueryProvider>
      </body>
    </html>
  );
}
