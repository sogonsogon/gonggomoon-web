import Title from '@/shared/components/ui/Title';
import StrategyConditionPanel from '@/features/strategy/components/sections/StrategyConditionPanel';
import StrategyExperienceSelectionSection from '@/features/strategy/components/sections/StrategyExperienceSelectionSection';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { experienceListQueryOptions } from '@/features/experience/queries';

export default async function StrategyCreatePage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(experienceListQueryOptions);

  return (
    <div className="flex flex-col gap-8 bg-white font-sans">
      <div className="flex flex-col gap-8 pt-0 pb-10">
        <Title
          title="포폴 전략 생성"
          description="경험과 조건을 설정하여 나만의 포트폴리오 전략을 생성하세요"
        />

        <div className="flex items-start gap-6">
          <HydrationBoundary state={dehydrate(queryClient)}>
            <StrategyExperienceSelectionSection />
          </HydrationBoundary>

          <StrategyConditionPanel />
        </div>
      </div>
    </div>
  );
}
