import Title from '@/shared/components/ui/Title';
import ExperienceSection from '@/features/experience/components/sections/ExperienceSection';

export default async function ExperiencePage() {
  return (
    <div className="flex flex-col w-full bg-white">
      {/* 메인 영역 */}
      <div className="flex flex-1 flex-col gap-6">
        {/* 페이지 타이틀 */}
        <Title
          title={'경험 관리'}
          description={'프로젝트, 경력, 수상내역 등의 경험을 관리합니다.'}
        />
        <ExperienceSection />
      </div>
    </div>
  );
}
