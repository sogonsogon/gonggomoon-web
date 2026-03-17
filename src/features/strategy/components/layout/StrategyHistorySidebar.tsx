'use client';

import { useMemo } from 'react';
import HistorySidebar from '@/shared/components/layout/HistorySidebar';
import { useStrategyGenerationStore } from '@/features/strategy/stores/useStrategyGenerationStore';
import type { HistorySidebarItem } from '@/shared/types';
import { createStrategyHistoryItems } from '@/features/strategy/utils/createStrategyHistoryItems';
import { useGetStrategyList } from '@/features/strategy/queries';

export default function StrategyHistorySidebar() {
  const { data: strategyData } = useGetStrategyList();

  const requests = useStrategyGenerationStore((state) => state.requests);
  const requestOrder = useStrategyGenerationStore((state) => state.requestOrder);

  const processingRequests = useMemo(() => {
    return [...requestOrder]
      .reverse()
      .map((id) => requests[id])
      .filter((request) => request?.status === 'PROCESSING');
  }, [requestOrder, requests]);

  const processingItems: HistorySidebarItem[] = useMemo(() => {
    return processingRequests.map((request) => ({
      title: '생성 중인 전략',
      date: '진행 중',
      href: `/strategy/result/${request.id}`,
    }));
  }, [processingRequests]);

  const processingIds = useMemo(() => {
    return new Set(processingRequests.map((request) => request.id));
  }, [processingRequests]);

  const items = useMemo(() => {
    const contents = strategyData?.contents ?? [];

    const filteredContents = contents.filter((strategy) => !processingIds.has(strategy.strategyId));

    return createStrategyHistoryItems(filteredContents);
  }, [strategyData?.contents, processingIds]);

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
