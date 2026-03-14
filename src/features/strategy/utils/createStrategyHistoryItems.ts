import type { Strategy } from '@/features/strategy/types';
import type { HistorySidebarItem } from '@/shared/types';
import { JOB_LABEL_MAP } from '@/features/recruitment/constants/jobOptions';
import { formatHistoryDate } from '@/shared/utils/formatHistoryDate';

export function createStrategyHistoryItems(strategies: Strategy[] = []): HistorySidebarItem[] {
  return strategies.map((strategy) => {
    const title = strategy.industryName
      ? `${JOB_LABEL_MAP[strategy.jobType]} · ${strategy.industryName}`
      : JOB_LABEL_MAP[strategy.jobType];

    return {
      title,
      date: formatHistoryDate(strategy.createdAt),
      href: `/strategy/result/${strategy.strategyId}`,
    };
  });
}
