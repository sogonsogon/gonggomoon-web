import type { HistorySidebarItem } from '@/shared/types';
import type { Strategy } from '@/features/strategy/types';
import { formatHistoryDate } from '@/shared/utils/formatHistoryDate';
import { JOB_LABEL_MAP } from '@/features/recruitment/constants/jobOptions';
import { INDUSTRY_LABEL_MAP } from '@/features/industry/constants/industryOptions';

export function getStrategyHistoryItems(strategies: Strategy[]): HistorySidebarItem[] {
  return strategies.map((strategy) => ({
    title: `${JOB_LABEL_MAP[strategy.jobType]} · ${INDUSTRY_LABEL_MAP[strategy.industryType]}`,
    date: formatHistoryDate(strategy.createdDate),
    href: `/strategy/result/${strategy.strategyId}`,
  }));
}
