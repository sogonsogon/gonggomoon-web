import { CircleHelp } from 'lucide-react';

export default function InterviewQuestionListSkeleton() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100">
          <CircleHelp className="h-3.5 w-3.5 text-blue-600" />
        </div>
        <span className="text-[15px] font-bold text-gray-900">면접 질문 목록</span>
      </div>

      <div className="flex flex-col gap-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="rounded-3xl border border-gray-100 bg-white px-5 py-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="h-6 w-10 animate-pulse rounded-full bg-gray-100" />
              <div className="h-6 w-14 animate-pulse rounded-full bg-gray-100" />
            </div>

            <div className="flex flex-col gap-2.5">
              <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
              <div className="h-4 w-11/12 animate-pulse rounded bg-gray-100" />
              <div className="h-4 w-9/12 animate-pulse rounded bg-gray-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
