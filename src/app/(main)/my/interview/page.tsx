import Title from '@/shared/components/ui/Title';
import MyInterviewSection from '@/features/interview/components/sections/MyInterviewSection';

export default async function InterviewPage() {
  return (
    <div className="flex flex-col w-full bg-white">
      {/* 메인 영역 */}
      <div className="flex flex-1 flex-col gap-6">
        {/* 페이지 타이틀 */}
        <Title
          title={'면접 질문'}
          description={'포트폴리오를 기반으로 생성된 면접 질문을 확인하고 관리하세요'}
        />
        <MyInterviewSection />
      </div>
    </div>
  );
}
