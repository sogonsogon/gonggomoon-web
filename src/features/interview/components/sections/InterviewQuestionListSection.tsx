import { CircleHelp } from 'lucide-react';
import type { InterviewDetail } from '@/features/interview/types';
import InterviewQuestionCard from '@/features/interview/components/ui/InterviewQuestionCard';

interface InterviewQuestionListSectionProps {
  interview: InterviewDetail;
}

export default function InterviewQuestionListSection({
  interview,
}: InterviewQuestionListSectionProps) {
  if (!interview.contents || interview.contents.length === 0) {
    return (
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100">
            <CircleHelp className="h-3.5 w-3.5 text-blue-600" />
          </div>
          <span className="text-[15px] font-bold text-gray-900">면접 질문 목록</span>
        </div>

        <div className="flex flex-1 items-center justify-center py-20">
          <p className="text-gray-400">질문이 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100">
          <CircleHelp className="h-3.5 w-3.5 text-blue-600" />
        </div>
        <span className="text-[15px] font-bold text-gray-900">면접 질문 목록</span>
      </div>

      <div className="flex flex-col gap-2.5">
        {interview.contents.map((question, index) => (
          <InterviewQuestionCard
            key={question.questionId}
            order={index + 1}
            content={question.content}
            questionLevel={question.questionLevel}
          />
        ))}
      </div>
    </div>
  );
}
