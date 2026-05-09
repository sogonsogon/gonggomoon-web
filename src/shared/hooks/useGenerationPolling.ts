'use client';

import { useEffect } from 'react';
import { getGenerationStatus } from '@/shared/actions';
import { GenerationRequestType, GetGenerationStatusResponse } from '@/shared/types/generation';

type UseGenerationPollingParams = {
  requestIds: number[];
  requestType: GenerationRequestType;
  enabled?: boolean;
  interval?: number;
  onCompleted: (id: number, response: GetGenerationStatusResponse) => void;
  onFailed: (id: number, error: string, response?: GetGenerationStatusResponse) => void;
};

export function useGenerationPolling({
  requestIds,
  requestType,
  enabled = true,
  interval = 2000,
  onCompleted,
  onFailed,
}: UseGenerationPollingParams) {
  useEffect(() => {
    if (!enabled || requestIds.length === 0) return;

    let cancelled = false;

    const poll = async () => {
      const results = await Promise.allSettled(
        requestIds.map(async (id) => {
          const result = await getGenerationStatus({ id, type: requestType });
          return { id, result };
        }),
      );

      if (cancelled) return;

      results.forEach((result) => {
        if (result.status !== 'fulfilled') return;

        const { id, result: apiResponse } = result.value;

        if (!apiResponse.success || !apiResponse.data) {
          onFailed(id, apiResponse.message ?? '생성 상태 조회에 실패했습니다.');
          return;
        }

        const response = apiResponse.data;

        if (response.status === 'READY') {
          onCompleted(id, response);
          return;
        }

        if (response.status === 'FAILED') {
          onFailed(id, response.error ?? '생성에 실패했습니다.', response);
        }
      });
    };

    void poll();

    const timer = window.setInterval(() => {
      void poll();
    }, interval);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [enabled, interval, onCompleted, onFailed, requestIds, requestType]);
}
