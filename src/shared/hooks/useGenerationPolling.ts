'use client';

import { useEffect } from 'react';
import { getGenerationStatus } from '@/shared/queries';
import { GetGenerationStatusResponse } from '@/shared/types';

type UseGenerationPollingParams = {
  requestIds: number[];
  enabled?: boolean;
  interval?: number;
  onCompleted: (id: number, response: GetGenerationStatusResponse) => void;
  onFailed: (id: number, error: string, response: GetGenerationStatusResponse) => void;
};

export function useGenerationPolling({
  requestIds,
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
          const response = await getGenerationStatus(id);
          return { id, response };
        }),
      );

      if (cancelled) return;

      results.forEach((result) => {
        if (result.status !== 'fulfilled') return;

        const { id, response } = result.value;

        if (response.status === 'COMPLETED') {
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
  }, [enabled, interval, onCompleted, onFailed, requestIds]);
}
