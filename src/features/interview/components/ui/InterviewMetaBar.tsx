import { CircleCheck, CircleHelp, FileText, Layers } from 'lucide-react';
import { formatCreatedDate } from '@/shared/utils/formatCreatedDate';
import InterviewDeleteButton from '@/features/interview/components/ui/InterviewDeleteButton';
import type { InterviewDetail } from '@/features/interview/types';
import { formatInterviewTitle } from '@/features/interview/utils/formatInterviewTitle';

interface InterviewMetaBarProps {
  interview: InterviewDetail;
}

export default function InterviewMetaBar({ interview }: InterviewMetaBarProps) {
  const questionCount = interview.questionTotalCount ?? interview.contents?.length ?? 0;

  return (
    <div className="w-full">
      <div className="rounded-xl border border-gray-100 bg-gray-50 px-5 py-3.5 max-md:px-4 max-md:py-3 xl:flex xl:items-center xl:justify-between">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:flex xl:items-center xl:gap-5">
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] font-medium text-gray-400">면접 제목</span>
            <div className="flex items-center gap-1.5">
              <CircleHelp className="h-3.5 w-3.5 text-[#2272eb]" />
              <span className="min-w-0 truncate text-[13px] font-semibold text-gray-900">
                {formatInterviewTitle(interview.createdAt)}
              </span>
            </div>
          </div>
          <div className="hidden h-7 w-px bg-gray-200 xl:block" />

          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] font-medium text-gray-400">기반 포트폴리오</span>
            <div className="flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-gray-600" />
              <span className="truncate text-[13px] font-semibold text-gray-900">
                {interview.basePortfolio ?? '—'}
              </span>
            </div>
          </div>
          <div className="hidden h-7 w-px bg-gray-200 xl:block" />

          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] font-medium text-gray-400">질문 수</span>
            <div className="flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-gray-600" />
              <span className="text-[13px] font-semibold text-gray-900">{questionCount}개</span>
            </div>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-gray-200 pt-2.5 xl:mt-0 xl:w-auto xl:border-t-0 xl:pt-0">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="flex items-center gap-1.5 rounded-full bg-[#e6f9f2] px-2.5 py-1.5">
              <CircleCheck className="h-3 w-3 text-[#127848]" />
              <span className="text-[11px] font-semibold text-[#127848]">저장됨</span>
            </div>
            <span className="truncate text-[12px] text-gray-400">
              {formatCreatedDate(interview.createdAt)}
            </span>
          </div>

          <InterviewDeleteButton
            interviewStrategyId={interview.interviewStrategyId}
            hideLabelOnMobile
            className="shrink-0 border-gray-200 bg-white px-2.5 py-1.5"
          />
        </div>
      </div>
    </div>
  );
}
