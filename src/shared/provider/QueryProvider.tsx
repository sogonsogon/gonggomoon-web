'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            // SSR로 받아온 데이터가 마운트 즉시 재요청되는 것을 방지 (예: 1분 유지)
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false, // 필요에 따라 창 포커스 시 재요청 방지
          },
        },
      }),
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
