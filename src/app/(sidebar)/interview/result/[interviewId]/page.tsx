import { getInterview } from '@/features/interview/actions';
import InterviewQuestionListSection from '@/features/interview/components/sections/InterviewQuestionListSection';
import InterviewTipsPanel from '@/features/interview/components/sections/InterviewTipsPanel';
import InterviewMetaBar from '@/features/interview/components/ui/InterviewMetaBar';
import GenerationPendingState from '@/shared/components/ui/GenerationPendingState';
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
      <div className="flex flex-col gap-8 pt-0 pb-10 max-md:gap-6">
        {interview ? (
          <>
            <Title
              title="면접 질문 결과"
              description="AI가 생성한 맞춤형 면접 질문입니다. 생성 시 자동으로 저장됩니다."
            />

            <InterviewMetaBar interview={interview} />

            <div className="flex flex-1 gap-6 max-lg:flex-col max-lg:gap-5">
              <InterviewQuestionListSection interview={interview} />
              <InterviewTipsPanel />
            </div>
          </>
        ) : (
          <GenerationPendingState
            title="면접 질문을 생성하고 있어요"
            description="AI가 공고와 입력 정보를 바탕으로 맞춤 면접 질문을 만들고 있어요."
            tips={[
              '질문을 확인한 뒤에는 STAR 구조로 답변 흐름을 정리해보면 좋아요.',
              '경험, 직무 역량, 협업 상황으로 나누어 답변을 준비해보세요.',
              '질문 의도까지 함께 생각해보면 답변 준비에 더 도움이 돼요.',
            ]}
          />
        )}
      </div>
    </div>
  );
}
