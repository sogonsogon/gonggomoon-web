'use client';

import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useGenerationPolling } from '@/shared/hooks/useGenerationPolling';
import { useInterviewGenerationStore } from '@/features/interview/stores/useInterviewGenerationStore';
import { GetGenerationStatusResponse } from '@/shared/types';

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

      toast.success('면접 질문 생성이 완료되었어요.', {
        action: {
          label: '결과 보기',
          onClick: () => router.push(`/interview/result/${id}`),
        },
      });

      removeRequest(id);
    },
    [markRequestCompleted, removeRequest, router],
  );

  const handleFailed = useCallback(
    (id: number, error: string) => {
      markRequestFailed(id, error);

      toast.error(error || '면접 질문 생성 중 문제가 발생했습니다.');
    },
    [markRequestFailed],
  );

  useGenerationPolling({
    requestIds: processingRequestIds,
    requestType: 'INTERVIEW',
    onCompleted: handleCompleted,
    onFailed: handleFailed,
  });

  return null;
}
