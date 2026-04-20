'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { getGenerationStatus } from '@/shared/actions';
import { toast } from 'sonner';
import { useExperienceExtractionStore } from '@/features/experience/stores/useExperienceExtractionStore';

// 폴링 주기
const POLLING_INTERVAL_MS = 2000;
// 실패 시 재시도 횟수
const MAX_REQUEST_RETRIES = 3;

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

  const requestRetryCountsRef = useRef<Map<number, number>>(new Map());

  useEffect(() => {
    if (processingRequestIds.length === 0) return;

    const processingSet = new Set(processingRequestIds);
    for (const id of requestRetryCountsRef.current.keys()) {
      if (!processingSet.has(id)) {
        requestRetryCountsRef.current.delete(id);
      }
    }

    let cancelled = false;
    let timeoutId: number;

    const poll = async () => {
      if (cancelled) return;

      const statusResults = await Promise.allSettled(
        processingRequestIds.map(async (id) => {
          const res = await getGenerationStatus({ id, type: 'EXTRACT_EXPERIENCE' });
          return { id, res };
        }),
      );

      if (cancelled) return;

      for (let i = 0; i < statusResults.length; i++) {
        const settled = statusResults[i];
        const id = processingRequestIds[i];

        // 1. 비동기 작업 자체 실패 (네트워크 오류, 시간 초과 등)
        if (settled.status === 'rejected') {
          const retryCount = (requestRetryCountsRef.current.get(id) ?? 0) + 1;
          requestRetryCountsRef.current.set(id, retryCount);

          console.warn(
            `[경험 추출] (재시도 ${retryCount}/${MAX_REQUEST_RETRIES}):`,
            settled.reason,
          );

          if (retryCount >= MAX_REQUEST_RETRIES) {
            console.error(`[경험 추출] 재시도 횟수 초과`);
            markRequestFailed(id, '네트워크 오류로 상태 조회에 실패했습니다.');
            toast.error('경험 추출 상태 조회에 실패했습니다.');
            requestRetryCountsRef.current.delete(id);
          }
          continue;
        }

        const { res } = settled.value;

        // 2. 서버가 내려준 구조화된 객체 처리: API 비즈니스 로직 상 실패 시
        if (!res.success) {
          const retryCount = (requestRetryCountsRef.current.get(id) ?? 0) + 1;
          requestRetryCountsRef.current.set(id, retryCount);

          console.warn(`[경험 추출] 요청ID(${id}) 에 대한 경험 추출 실패: ${res.message}`);

          if (retryCount >= MAX_REQUEST_RETRIES) {
            console.error(`[경험 추출] 재시도 횟수 초과`);
            markRequestFailed(id, res.message ?? '상태 조회에 실패했습니다.');
            toast.error('경험 추출 상태 조회에 실패했습니다.');
            requestRetryCountsRef.current.delete(id);
          }
          continue;
        }

        // 3. 경험 추출 상태 조회 성공 시 (FAILED, PROCESSING, READY)
        requestRetryCountsRef.current.delete(id);
        const { status, error } = res.data;

        if (status === 'FAILED') {
          console.error(`[경험 추출] 요청ID(${id}): ${error}`);
          markRequestFailed(id, error ?? '경험 추출에 실패했습니다.');
          toast.error('경험 추출에 실패했어요.');
          continue;
        }

        if (status !== 'READY') continue;

        // READY 처리 로직
        markRequestCompleted(id);

        const { requests: latestRequests, batches } = useExperienceExtractionStore.getState();

        const completedBatchEntry = Object.entries(batches).find(([, batch]) =>
          batch.ids.every((batchItemId) => latestRequests[batchItemId]?.status === 'READY'),
        );

        if (!completedBatchEntry) continue;

        const [batchId, batch] = completedBatchEntry;

        removeBatch(batchId);
        batch.ids.forEach((expId) => removeRequest(expId));
        addCompletedExtractionIds(batch.ids);

        toast.success('경험 추출이 완료되었어요.', {
          action: {
            label: '경험 확인하기',
            onClick: () => router.push('/resource/experience'),
          },
        });
      }

      if (!cancelled) {
        timeoutId = window.setTimeout(poll, POLLING_INTERVAL_MS);
      }
    };

    // 첫 폴링 실행
    void poll();

    return () => {
      cancelled = true;
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [
    processingRequestIds,
    markRequestFailed,
    markRequestCompleted,
    removeBatch,
    removeRequest,
    addCompletedExtractionIds,
    router,
  ]);

  return null;
}
