import Title from '@/shared/components/ui/Title';
import ExperienceSection from '@/features/experience/components/sections/ExperienceSection';

export default async function ExperiencePage() {
  return (
    <div className="flex flex-col w-full bg-white">
      {/* 메인 영역 */}
      <div className="flex flex-1 flex-col gap-6">
        {/* 페이지 타이틀 */}
        <Title
          title={'내 경험'}
          description={'나의 경험을 기록하고 AI로 의미 있는 단위로 추출해보세요'}
        />
        <ExperienceSection />
      </div>
    </div>
  );
}
