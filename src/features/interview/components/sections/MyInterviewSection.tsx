import MyInterviewCard from '@/features/interview/components/ui/MyInterviewCard';
import MyInterviewEmpty from '@/features/interview/components/ui/MyInterviewEmpty';
import MyInterviewError from '@/features/interview/components/ui/MyInterviewError';
import MyInterviewLoading from '@/features/interview/components/ui/MyInterviewLoading';
import { useGetInterviewList } from '@/features/interview/queries';
import { CirclePlusIcon } from 'lucide-react';
import Link from 'next/link';

export default function MyInterviewSection() {
  const { data: interviewData, isLoading, isError, error } = useGetInterviewList();
  const interviews = interviewData?.contents || [];
  const interviewTotalCount = interviewData?.totalCount || interviews.length || 0;

  if (isLoading) {
    return <MyInterviewLoading />;
  }
  if (isError) {
    return <MyInterviewError />;
  }

  return (
    <>
      {/* 면접 질문 개수 표기 */}
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-medium text-gray-600">
          총 {interviewTotalCount}개의 면접 질문
        </span>
      </div>

      {/* 면접 질문 리스트 */}
      {interviewTotalCount === 0 ? (
        <MyInterviewEmpty />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {interviews.map((interview) => (
            <MyInterviewCard key={interview.interviewStrategyId} interview={interview} />
          ))}

          {/* 면접 질문 생성 버튼 */}
          <Link
            href="/interview/create"
            className="flex h-40 flex-col items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50"
          >
            <CirclePlusIcon className="h-4.5 w-4.5 text-gray-500" />
            <span className="text-base font-semibold text-gray-600">면접 질문 생성</span>
          </Link>
        </div>
      )}
    </>
  );
}
