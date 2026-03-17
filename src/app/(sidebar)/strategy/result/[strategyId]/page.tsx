import StrategyAnalysisPanel from '@/features/strategy/components/sections/StrategyAnalysisPanel';
import StrategyStructuredDataPanel from '@/features/strategy/components/sections/StrategyStructuredDataPanel';
import StrategyMetaBar from '@/features/strategy/components/ui/StrategyMetaBar';
import StrategyMetaBarSkeleton from '@/features/strategy/components/ui/StrategyMetaBarSkeleton';
import StrategyPanelsSkeleton from '@/features/strategy/components/sections/StrategyPanelsSkeleton';
import { getStrategyDetail } from '@/features/strategy/actions';
import Title from '@/shared/components/ui/Title';

interface StrategyResultPageProps {
  params: Promise<{ strategyId: string }>;
}

export default async function StrategyResultPage({ params }: StrategyResultPageProps) {
  const strategyId = Number((await params).strategyId);

  const result = await getStrategyDetail(strategyId);
  const strategy = result.success ? result.data : null;

  return (
    <div className="flex flex-col gap-8 bg-white font-sans">
      <div className="flex flex-col gap-8 pt-0 pb-10">
        <Title
          title="포폴 전략 결과"
          description="AI가 생성한 산업 맞춤형 포트폴리오 전략입니다. 생성 시 자동으로 저장됩니다."
        />

        {strategy ? <StrategyMetaBar strategy={strategy} /> : <StrategyMetaBarSkeleton />}

        {strategy ? (
          <div className="flex items-start gap-6">
            <StrategyAnalysisPanel
              mainPositioningMessage={strategy.mainPositioningMessage}
              experienceStrategyPoints={strategy.experienceStrategyPoints}
              experienceOrdering={strategy.experienceOrdering}
            />
            <StrategyStructuredDataPanel detail={strategy} />
          </div>
        ) : (
          <StrategyPanelsSkeleton />
        )}
      </div>
    </div>
  );
}
