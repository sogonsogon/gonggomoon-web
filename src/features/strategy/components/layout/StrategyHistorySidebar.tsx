'use client';

import { useMemo } from 'react';
import HistorySidebar from '@/shared/components/layout/HistorySidebar';
import { useStrategyGenerationStore } from '@/features/strategy/stores/useStrategyGenerationStore';
import type { HistorySidebarItem } from '@/shared/types';
import { createStrategyHistoryItems } from '@/features/strategy/utils/createStrategyHistoryItems';
import { useGetStrategyList } from '@/features/strategy/queries';

export default function StrategyHistorySidebar() {
  const { data: strategyData } = useGetStrategyList();

  const items = createStrategyHistoryItems(strategyData?.contents ?? []);

  const requests = useStrategyGenerationStore((state) => state.requests);
  const requestOrder = useStrategyGenerationStore((state) => state.requestOrder);

  const processingItems: HistorySidebarItem[] = useMemo(() => {
    return [...requestOrder]
      .reverse()
      .map((id) => requests[id])
      .filter((request) => request?.status === 'PROCESSING')
      .map((request) => ({
        title: '생성 중인 전략',
        date: '진행 중',
        href: `/strategy/result/${request.id}`,
      }));
  }, [requestOrder, requests]);

  return (
    <HistorySidebar
      title="포폴 전략"
      createLabel="새 포폴 전략 생성"
      createHref="/strategy/create"
      manageLabel="포폴 전략 관리"
      manageHref="/my/strategy"
      items={items}
      processingLabel="생성 중"
      processingItems={processingItems}
    />
  );
}
