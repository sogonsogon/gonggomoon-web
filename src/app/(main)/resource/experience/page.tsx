import Title from '@/shared/components/ui/Title';
import ExperienceSection from '@/features/experience/components/sections/ExperienceSection';

export default async function ExperiencePage() {
  return (
    <div className="flex flex-col w-full">
      {/* 메인 영역 */}
      <div className="flex flex-1 flex-col gap-6">
        {/* 페이지 타이틀 */}
        <ExperienceSection />
      </div>
    </div>
  );
}
