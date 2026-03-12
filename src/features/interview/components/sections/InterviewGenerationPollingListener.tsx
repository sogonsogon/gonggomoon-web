'use client';

import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useGenerationPolling } from '@/shared/hooks/useGenerationPolling';
import { useInterviewGenerationStore } from '@/features/interview/stores/useInterviewGenerationStore';
import { GetGenerationStatusResponse } from '@/shared/types';
import { toast } from 'sonner';

export default function InterviewGenerationPollingListener() {
  const router = useRouter();

  const requests = useInterviewGenerationStore((state) => state.requests);
  const requestOrder = useInterviewGenerationStore((state) => state.requestOrder);
  const markRequestFailed = useInterviewGenerationStore((state) => state.markRequestFailed);
  const markRequestCompleted = useInterviewGenerationStore((state) => state.markRequestCompleted);
  const removeRequest = useInterviewGenerationStore((state) => state.removeRequest);

  const processingRequestIds = useMemo(() => {
    return requestOrder.filter((id) => requests[id]?.status === 'PROCESSING');
  }, [requestOrder, requests]);

  const handleCompleted = useCallback(
    (id: number, _response: GetGenerationStatusResponse) => {
      markRequestCompleted(id);

      // TODO: 완료 후 토스트 띄우기
      toast.success('면접 질문 생성이 완료되었어요.', {
        action: {
          label: '결과 보기',
          onClick: () => router.push(`/interview/result/${id}`),
        },
      });

      // 이동 직전/직후 큐에서 제거하고 싶으면 사용
      removeRequest(id);
    },
    [markRequestCompleted, removeRequest, router],
  );

  const handleFailed = useCallback(
    (id: number, error: string) => {
      markRequestFailed(id, error);
    },
    [markRequestFailed],
  );

  useGenerationPolling({
    requestIds: processingRequestIds,
    onCompleted: handleCompleted,
    onFailed: handleFailed,
  });

  return null;
}
