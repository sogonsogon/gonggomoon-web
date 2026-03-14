import InterviewQuestionListSection from '@/features/interview/components/sections/InterviewQuestionListSection';
import InterviewTipsPanel from '@/features/interview/components/sections/InterviewTipsPanel';
import InterviewMetaBar from '@/features/interview/components/ui/InterviewMetaBar';
import { mockInterviewSets } from '@/mocks/interview.mock';
import Title from '@/shared/components/ui/Title';

interface InterviewResultPageProps {
  params: Promise<{ interviewId: string }>;
}

export default async function InterviewResultPage({ params }: InterviewResultPageProps) {
  const interviewId = Number((await params).interviewId);

  // TODO: 면접 질문 조회 API 호출
  const interview = mockInterviewSets.find((s) => s.interviewStrategyId === interviewId);

  if (!interview) {
    return (
      <div className="flex items-center justify-center rounded-xl border border-gray-100 py-20">
        <p className="text-gray-500">면접 결과를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 bg-white font-sans">
      <div className="flex flex-col gap-8 pt-0 pb-10">
        <Title
          title="면접 질문 생성 결과"
          description="AI가 생성한 맞춤형 면접 질문입니다. 생성 시 자동으로 저장됩니다."
        />

        <InterviewMetaBar interview={interview} />

        <div className="flex flex-1 gap-6">
          <InterviewQuestionListSection interview={interview} />
          <InterviewTipsPanel />
        </div>
      </div>
    </div>
  );
}
