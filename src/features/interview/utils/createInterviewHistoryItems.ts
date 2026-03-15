import type { HistorySidebarItem } from '@/shared/types';
import { formatHistoryDate } from '@/shared/utils/formatHistoryDate';
import { Interview } from '@/features/interview/types';
import { formatInterviewTitle } from '@/features/interview/utils/formatInterviewTitle';

export function createInterviewHistoryItems(interviews: Interview[]): HistorySidebarItem[] {
  return [...interviews]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .map((interview) => ({
      title: formatInterviewTitle(interview.createdAt),
      date: formatHistoryDate(interview.createdAt),
      href: `/interview/result/${interview.interviewStrategyId}`,
    }));
}
