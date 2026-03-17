import { getInterview } from '@/features/interview/actions';
import InterviewQuestionListSection from '@/features/interview/components/sections/InterviewQuestionListSection';
import InterviewQuestionListSkeleton from '@/features/interview/components/sections/InterviewQuestionListSkeleton';
import InterviewTipsPanel from '@/features/interview/components/sections/InterviewTipsPanel';
import InterviewMetaBar from '@/features/interview/components/ui/InterviewMetaBar';
import InterviewMetaBarSkeleton from '@/features/interview/components/ui/InterviewMetaBarSkeleton';

import Title from '@/shared/components/ui/Title';

interface InterviewResultPageProps {
  params: Promise<{ interviewId: string }>;
}

export default async function InterviewResultPage({ params }: InterviewResultPageProps) {
  const interviewId = Number((await params).interviewId);

  const result = await getInterview(interviewId);
  const interview = result.success ? result.data : null;

  return (
    <div className="flex flex-col gap-8 bg-white font-sans">
      <div className="flex flex-col gap-8 pt-0 pb-10">
        <Title
          title="면접 질문 결과"
          description="AI가 생성한 맞춤형 면접 질문입니다. 생성 시 자동으로 저장됩니다."
        />

        {interview ? <InterviewMetaBar interview={interview} /> : <InterviewMetaBarSkeleton />}

        <div className="flex flex-1 gap-6">
          {interview ? (
            <InterviewQuestionListSection interview={interview} />
          ) : (
            <InterviewQuestionListSkeleton />
          )}
          <InterviewTipsPanel />
        </div>
      </div>
    </div>
  );
}
