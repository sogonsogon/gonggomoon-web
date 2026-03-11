'use client';

import HistorySidebar from '@/shared/components/layout/HistorySidebar';
import { useStrategyGenerationStore } from '@/features/strategy/stores/useStrategyGenerationStore';
import type { HistorySidebarItem } from '@/shared/types';

interface StrategyHistorySidebarProps {
  items: HistorySidebarItem[];
}

export default function StrategyHistorySidebar({ items }: StrategyHistorySidebarProps) {
  const generationStatus = useStrategyGenerationStore((state) => state.generationStatus);
  const currentStrategyId = useStrategyGenerationStore((state) => state.currentStrategyId);

  const processingItems: HistorySidebarItem[] =
    generationStatus === 'PROCESSING' && currentStrategyId
      ? [
          {
            title: '생성 중인 전략',
            date: '진행 중',
            href: `/strategy/result/${currentStrategyId}`,
          },
        ]
      : [];

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
