import { mockExperiences } from '@/mocks/experience.mock';
import Title from '@/shared/components/ui/Title';
import StrategyConditionPanel from '@/features/strategy/components/sections/StrategyConditionPanel';
import StrategyExperienceSelectionSection from '@/features/strategy/components/sections/StrategyExperienceSelectionSection';

export default async function StrategyCreatePage() {
  const experiences = mockExperiences;

  return (
    <div className="flex flex-col gap-8 bg-white font-sans">
      <div className="flex flex-col gap-8 pt-0 pb-10">
        <Title
          title="포폴 전략 생성"
          description="경험과 조건을 설정하여 나만의 포트폴리오 전략을 생성하세요"
        />

        <div className="flex items-start gap-6">
          <StrategyExperienceSelectionSection experiences={experiences} />

          <StrategyConditionPanel />
        </div>
      </div>
    </div>
  );
}
