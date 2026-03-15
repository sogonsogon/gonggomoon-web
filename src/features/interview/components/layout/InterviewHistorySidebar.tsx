'use client';

import { useMemo } from 'react';
import HistorySidebar from '@/shared/components/layout/HistorySidebar';
import type { HistorySidebarItem } from '@/shared/types';
import { useInterviewGenerationStore } from '@/features/interview/stores/useInterviewGenerationStore';
import { useGetInterviewList } from '@/features/interview/queries';
import { createInterviewHistoryItems } from '@/features/interview/utils/createInterviewHistoryItems';

export default function InterviewHistorySidebar() {
  const { data: interviewData } = useGetInterviewList();

  const items = createInterviewHistoryItems(interviewData?.contents ?? []);

  const requests = useInterviewGenerationStore((state) => state.requests);
  const requestOrder = useInterviewGenerationStore((state) => state.requestOrder);

  const processingItems: HistorySidebarItem[] = useMemo(() => {
    return [...requestOrder]
      .reverse()
      .map((id) => requests[id])
      .filter((request) => request?.status === 'PROCESSING')
      .map((request) => ({
        title: '생성 중인 질문',
        date: '진행 중',
        href: `/interview/result/${request.id}`,
      }));
  }, [requestOrder, requests]);

  return (
    <HistorySidebar
      title="면접 질문"
      createLabel="새 면접 질문 생성"
      createHref="/interview/create"
      manageLabel="면접 질문 관리"
      manageHref="/my/interview"
      items={items}
      processingLabel="생성 중"
      processingItems={processingItems}
    />
  );
}
