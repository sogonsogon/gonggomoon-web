import Link from 'next/link';
import { CirclePlusIcon } from 'lucide-react';
import { mockInterviewSets } from '@/mocks/interview.mock';
import Title from '@/shared/components/ui/Title';
import MyInterviewEmpty from '@/features/interview/components/ui/MyInterviewEmpty';
import MyInterviewCard from '@/features/interview/components/ui/MyInterviewCard';

export default function InterviewPage() {
  const interviews = mockInterviewSets;

  return (
    <div className="flex flex-col w-full bg-white">
      {/* 메인 영역 */}
      <div className="flex flex-1 flex-col gap-8">
        {/* 페이지 타이틀 */}
        <Title
          title={'면접 질문'}
          description={'포트폴리오를 기반으로 생성된 면접 질문을 확인하고 관리하세요'}
        />

        {/* 면접 질문 개수 표기 */}
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-medium text-gray-600">
            총 {interviews.length}개의 면접 질문
          </span>
        </div>

        {/* 면접 질문 리스트 */}
        {interviews.length === 0 ? (
          <MyInterviewEmpty />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {interviews.map((interview) => (
              <MyInterviewCard key={interview.interviewSetId} interview={interview} />
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
      </div>
    </div>
  );
}
