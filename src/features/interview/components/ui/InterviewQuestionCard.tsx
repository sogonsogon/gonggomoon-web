import { QUESTION_LEVEL_LABEL_MAP } from '@/features/interview/constants/questionLevelOptions';
import type { QuestionLevel } from '@/features/interview/types';

interface InterviewQuestionCardProps {
  order: number;
  content: string;
  questionLevel: QuestionLevel;
}

export default function InterviewQuestionCard({
  order,
  content,
  questionLevel,
}: InterviewQuestionCardProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-gray-100 bg-white px-5 py-4.5">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-blue-600">
          Q{order}
        </span>
        <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-gray-600">
          {QUESTION_LEVEL_LABEL_MAP[questionLevel]}
        </span>
      </div>

      <p className="text-[14px] font-medium leading-[1.6] text-gray-800">{content}</p>
    </div>
  );
}
