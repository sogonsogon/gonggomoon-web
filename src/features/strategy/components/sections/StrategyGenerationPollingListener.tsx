'use client';

import { useCallback, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useGenerationPolling } from '@/shared/hooks/useGenerationPolling';
import { GetGenerationStatusResponse } from '@/shared/types';
import { useStrategyGenerationStore } from '@/features/strategy/stores/useStrategyGenerationStore';

export default function StrategyGenerationPollingListener() {
  const router = useRouter();
  const pathname = usePathname();

  const requests = useStrategyGenerationStore((state) => state.requests);
  const requestOrder = useStrategyGenerationStore((state) => state.requestOrder);
  const markRequestFailed = useStrategyGenerationStore((state) => state.markRequestFailed);
  const markRequestCompleted = useStrategyGenerationStore((state) => state.markRequestCompleted);
  const removeRequest = useStrategyGenerationStore((state) => state.removeRequest);

  const processingRequestIds = useMemo(() => {
    return requestOrder.filter((id) => requests[id]?.status === 'PROCESSING');
  }, [requestOrder, requests]);

  const handleCompleted = useCallback(
    (id: number, _response: GetGenerationStatusResponse) => {
      markRequestCompleted(id);

      if (pathname === `/strategy/result/${id}`) {
        router.refresh();
      }

      toast.success('포폴 전략 생성이 완료되었어요.', {
        action: {
          label: '결과 보기',
          onClick: () => router.push(`/strategy/result/${id}`),
        },
      });

      removeRequest(id);
    },
    [markRequestCompleted, pathname, removeRequest, router],
  );

  const handleFailed = useCallback(
    (id: number, error: string) => {
      markRequestFailed(id, error);
      toast.error(error || '포폴 전략 생성 중 문제가 발생했습니다.');
    },
    [markRequestFailed],
  );

  useGenerationPolling({
    requestIds: processingRequestIds,
    requestType: 'PORTFOLIO_STRATEGY',
    onCompleted: handleCompleted,
    onFailed: handleFailed,
  });

  return null;
}
