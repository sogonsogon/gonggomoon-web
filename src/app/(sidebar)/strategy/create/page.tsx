import Title from '@/shared/components/ui/Title';
import StrategyConditionPanel from '@/features/strategy/components/sections/StrategyConditionPanel';
import StrategyExperienceSelectionSection from '@/features/strategy/components/sections/StrategyExperienceSelectionSection';
import MobileStrategyGenerateBar from '@/features/strategy/components/ui/MobileStrategyGenerateBar';

export default async function StrategyCreatePage() {
  return (
    <div className="flex flex-col gap-8 bg-white font-sans">
      <div className="flex flex-col gap-8 pt-0 pb-10 max-md:pb-[calc(env(safe-area-inset-bottom)+13rem)] md:max-lg:pb-[calc(env(safe-area-inset-bottom)+8rem)] max-md:gap-6">
        <Title
          title="포폴 전략 생성"
          description="경험과 조건을 설정하여 나만의 포트폴리오 전략을 생성하세요"
        />

        <div className="flex items-start gap-6 max-lg:flex-col max-lg:items-stretch max-lg:gap-5">
          <div className="w-full">
            <StrategyExperienceSelectionSection />
          </div>

          <div className="max-lg:hidden">
            <StrategyConditionPanel />
          </div>
        </div>

        <MobileStrategyGenerateBar />
      </div>
    </div>
  );
}
