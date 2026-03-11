import StrategyAnalysisPanel from '@/features/strategy/components/sections/StrategyAnalysisPanel';
import StrategyStructuredDataPanel from '@/features/strategy/components/sections/StrategyStructuredDataPanel';
import StrategyMetaBar from '@/features/strategy/components/ui/StrategyMetaBar';
import { mockStrategyDetails } from '@/mocks/strategy.mock';
import Title from '@/shared/components/ui/Title';

interface StrategyResultPageProps {
  params: Promise<{ strategyId: string }>;
}

export default async function StrategyResultPage({ params }: StrategyResultPageProps) {
  const strategyId = Number((await params).strategyId);

  // TODO: 포폴 전략 조회 API 호출
  const strategy = mockStrategyDetails[strategyId]; // 실제 API에서 받은 데이터로 변경
  const { mainPositioningMessage, experienceOrdering, experienceStrategyPoints, ...detail } =
    strategy;

  if (!strategy) {
    return (
      <div className="flex items-center justify-center rounded-xl border border-gray-100 py-20">
        <p className="text-gray-500">전략을 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 bg-white font-sans">
      <div className="flex flex-col gap-8 pt-0 pb-10">
        <Title
          title="포폴 전략 결과"
          description="AI가 생성한 산업 맞춤형 포트폴리오 전략입니다. 생성 시 자동으로 저장됩니다."
        />

        <StrategyMetaBar strategy={strategy} />

        {!detail ? (
          <div className="flex items-center justify-center rounded-xl border border-gray-100 py-20">
            <p className="text-gray-400">분석 결과가 없습니다.</p>
          </div>
        ) : (
          <div className="flex items-start gap-6">
            <StrategyAnalysisPanel
              mainPositioningMessage={mainPositioningMessage}
              experienceStrategyPoints={experienceStrategyPoints || []}
              experienceOrdering={experienceOrdering || []}
            />
            <StrategyStructuredDataPanel detail={strategy} />
          </div>
        )}
      </div>
    </div>
  );
}
