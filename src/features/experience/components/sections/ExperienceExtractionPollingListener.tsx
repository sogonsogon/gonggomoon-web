'use client';

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { getGenerationStatus } from '@/shared/actions';
import { toast } from 'sonner';
import { useExperienceExtractionStore } from '@/features/experience/stores/useExperienceExtractionStore';

const POLLING_INTERVAL_MS = 2000;

export default function ExperienceExtractionPollingListener() {
  const router = useRouter();

  const requests = useExperienceExtractionStore((state) => state.requests);
  const requestOrder = useExperienceExtractionStore((state) => state.requestOrder);
  const markRequestFailed = useExperienceExtractionStore((state) => state.markRequestFailed);
  const markRequestCompleted = useExperienceExtractionStore((state) => state.markRequestCompleted);
  const removeRequest = useExperienceExtractionStore((state) => state.removeRequest);
  const removeBatch = useExperienceExtractionStore((state) => state.removeBatch);
  const addCompletedExtractionIds = useExperienceExtractionStore(
    (state) => state.addCompletedExtractionIds,
  );

  const processingRequestIds = useMemo(
    () => requestOrder.filter((id) => requests[id]?.status === 'PROCESSING'),
    [requestOrder, requests],
  );

  useEffect(() => {
    if (processingRequestIds.length === 0) return;

    let cancelled = false;

    const poll = async () => {
      if (cancelled) return;

      const statusResults = await Promise.allSettled(
        processingRequestIds.map(async (id) => {
          const res = await getGenerationStatus({ id, type: 'EXTRACT_EXPERIENCE' });
          return { id, res };
        }),
      );

      if (cancelled) return;

      for (const settled of statusResults) {
        if (settled.status !== 'fulfilled') continue;

        const { id, res } = settled.value;

        if (!res.success) {
          markRequestFailed(id, res.message ?? '상태 조회에 실패했습니다.');
          toast.error('경험 추출 상태 조회에 실패했습니다.');
          continue;
        }

        const { status, error } = res.data;

        if (status === 'FAILED') {
          markRequestFailed(id, error ?? '경험 추출에 실패했습니다.');
          toast.error('경험 추출에 실패했어요.');
          continue;
        }

        if (status !== 'READY') continue;

        markRequestCompleted(id);

        const { requests: latestRequests, batches } = useExperienceExtractionStore.getState();

        const completedBatchEntry = Object.entries(batches).find(([, batch]) =>
          batch.ids.every((batchItemId) => latestRequests[batchItemId]?.status === 'READY'),
        );

        if (!completedBatchEntry) continue;

        const [batchId, batch] = completedBatchEntry;

        removeBatch(batchId);
        batch.ids.forEach((expId) => removeRequest(expId));

        // 완료된 추출 ID를 store에 저장 — 페이지에서 소비
        addCompletedExtractionIds(batch.ids);

        toast.success('경험 추출이 완료되었어요.', {
          action: {
            label: '경험 확인하기',
            onClick: () => router.push('/my/experience'),
          },
        });
      }
    };

    void poll();
    const timer = window.setInterval(() => void poll(), POLLING_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [
    processingRequestIds,
    markRequestCompleted,
    markRequestFailed,
    removeBatch,
    removeRequest,
    addCompletedExtractionIds,
    router,
  ]);

  return null;
}
