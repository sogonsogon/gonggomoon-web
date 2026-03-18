import Title from '@/shared/components/ui/Title';
import InterviewConditionalPanel from '@/features/interview/components/sections/InterviewConditionalPanel';
import InterviewGuideCard from '@/features/interview/components/ui/InterviewGuideCard';

export default function InterviewCreatePage() {
  return (
    <>
      <div className="flex flex-col gap-8 bg-white font-sans">
        <div className="flex flex-col gap-8 pt-0 pb-10 max-md:gap-6">
          <Title
            title="면접 질문 생성"
            description="포트폴리오를 선택하고 맞춤형 면접 질문을 생성하세요"
          />

          <div className="flex flex-1 gap-7 max-lg:flex-col max-lg:gap-5">
            <InterviewGuideCard />

            <InterviewConditionalPanel />
          </div>
        </div>
      </div>
    </>
  );
}
