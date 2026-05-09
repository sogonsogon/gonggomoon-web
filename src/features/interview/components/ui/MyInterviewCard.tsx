'use client';

import InterviewDeleteDialog from '@/features/interview/components/ui/InterviewDeleteDialog';
import { useInterviewDeleteDialog } from '@/features/interview/stores/useInterviewDeleteDialog';
import { Interview } from '@/features/interview/types';
import { formatInterviewTitle } from '@/features/interview/utils/formatInterviewTitle';
import { Button } from '@/shared/components/ui/button';
import { formatCreatedDate } from '@/shared/utils/formatCreatedDate';
import { CalendarIcon, Trash2Icon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface MyInterviewCardProps {
  interview: Interview;
}

export default function MyInterviewCard({ interview }: MyInterviewCardProps) {
  const { openDialog } = useInterviewDeleteDialog();

  return (
    <div
      key={interview.interviewStrategyId}
      className="overflow-hidden rounded-xl border border-gray-200 bg-white"
    >
      {/* 면접 질문 정보 */}
      <div className="flex h-30 flex-col justify-between px-5 pb-4 pt-5 border-b border-b-gray-100">
        <div className="flex items-center justify-between gap-2">
          <span className="line-clamp-3 text-[15px] font-semibold leading-snug text-gray-900">
            {formatInterviewTitle(interview.createdAt) ?? '면접 질문'}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => openDialog(interview.interviewStrategyId)}
            aria-label="면접 질문 삭제"
            className="mt-0.5 shrink-0 text-gray-400 hover:bg-transparent hover:text-red-500"
          >
            <Trash2Icon className="h-3.75 w-3.75" />
          </Button>
        </div>
        <div className="flex items-center gap-1.5">
          <CalendarIcon className="h-3 w-3" />
          <span className="text-xs">{formatCreatedDate(interview.createdAt)}</span>
        </div>
      </div>

      {/* 보기 버튼 */}
      <Link
        href={`/interview/result/${interview.interviewStrategyId}`}
        className="flex w-full h-9 items-center justify-center rounded-lg py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50"
      >
        보기
      </Link>
    </div>
  );
}
