'use client';

import { useMemo } from 'react';
import HistorySidebar from '@/shared/components/layout/HistorySidebar';
import type { HistorySidebarItem } from '@/shared/types';
import { useInterviewGenerationStore } from '@/features/interview/stores/useInterviewGenerationStore';
import { useGetInterviewList } from '@/features/interview/queries';
import { createInterviewHistoryItems } from '@/features/interview/utils/createInterviewHistoryItems';

export default function InterviewHistorySidebar() {
  const { data: interviewData } = useGetInterviewList();

  const requests = useInterviewGenerationStore((state) => state.requests);
  const requestOrder = useInterviewGenerationStore((state) => state.requestOrder);

  const processingRequests = useMemo(() => {
    return [...requestOrder]
      .reverse()
      .map((id) => requests[id])
      .filter((request) => request?.status === 'PROCESSING');
  }, [requestOrder, requests]);

  const processingItems: HistorySidebarItem[] = useMemo(() => {
    return processingRequests.map((request) => ({
      title: '생성 중인 질문',
      date: '진행 중',
      href: `/interview/result/${request.id}`,
    }));
  }, [processingRequests]);

  const processingIds = useMemo(() => {
    return new Set(processingRequests.map((request) => request.id));
  }, [processingRequests]);

  const items = useMemo(() => {
    const contents = interviewData?.contents ?? [];

    const filteredContents = contents.filter(
      (interview) => !processingIds.has(interview.interviewStrategyId),
    );

    return createInterviewHistoryItems(filteredContents);
  }, [interviewData?.contents, processingIds]);

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
