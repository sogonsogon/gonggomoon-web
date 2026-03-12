import { mockExperiences } from '@/mocks/experience.mock';
import Title from '@/shared/components/ui/Title';
import ExperienceSection from '@/features/experience/components/sections/ExperienceSection';
import { mockFiles } from '@/mocks/file.mock';
import { Experience } from '@/features/experience/types';

export default function ExperiencePage() {
  const experiences: Experience[] = mockExperiences;
  const files = mockFiles;

  return (
    <div className="flex flex-col w-full bg-white">
      {/* 메인 영역 */}
      <div className="flex flex-1 flex-col gap-8">
        {/* 페이지 타이틀 */}
        <Title
          title={'내 경험'}
          description={'나의 경험을 기록하고 AI로 의미 있는 단위로 추출해보세요'}
        />

        <ExperienceSection initialExperiences={experiences} files={files} />
      </div>
    </div>
  );
}
