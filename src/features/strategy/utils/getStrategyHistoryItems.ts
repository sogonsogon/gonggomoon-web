import { mockStrategies } from '@/mocks/strategy.mock';
import { formatHistoryDate } from '@/shared/utils/formatHistoryDate';
import { JOB_LABEL_MAP } from '@/features/recruitment/constants/jobOptions';
import { INDUSTRY_LABEL_MAP } from '@/features/industry/constants/industryOptions';
import { HistorySidebarItem } from '@/shared/types';

export function getStrategyHistoryItems(): HistorySidebarItem[] {
  return mockStrategies.map((strategy) => ({
    title: `${JOB_LABEL_MAP[strategy.jobType]} · ${INDUSTRY_LABEL_MAP[strategy.industryType]}`,
    date: formatHistoryDate(strategy.createdDate),
    href: `/strategy/result/${strategy.strategyId}`,
  }));
}
