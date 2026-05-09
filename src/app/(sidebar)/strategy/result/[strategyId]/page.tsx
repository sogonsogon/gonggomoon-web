import { getStrategyDetail } from '@/features/strategy/actions';
import StrategyAnalysisPanel from '@/features/strategy/components/sections/StrategyAnalysisPanel';
import StrategyStructuredDataPanel from '@/features/strategy/components/sections/StrategyStructuredDataPanel';
import StrategyMetaBar from '@/features/strategy/components/ui/StrategyMetaBar';
import GenerationPendingState from '@/shared/components/ui/GenerationPendingState';
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
      <div className="flex flex-col gap-8 pt-0 pb-10 max-md:gap-6 max-md:pb-8">
        {strategy ? (
          <>
            <Title
              title="포폴 전략 결과"
              description="AI가 생성한 산업 맞춤형 포트폴리오 전략입니다. 생성 시 자동으로 저장됩니다."
            />

            <StrategyMetaBar strategy={strategy} />

            <div className="flex items-start gap-6 max-lg:flex-col max-lg:items-stretch max-lg:gap-5">
              <StrategyAnalysisPanel
                mainPositioningMessage={strategy.mainPositioningMessage}
                experienceStrategyPoints={strategy.experienceStrategyPoints}
                experienceOrdering={strategy.experienceOrdering}
              />
              <StrategyStructuredDataPanel detail={strategy} />
            </div>
          </>
        ) : (
          <GenerationPendingState
            title="포트폴리오 전략을 생성하고 있어요"
            description="AI가 입력 정보를 바탕으로 맞춤 포트폴리오 전략을 만들고 있어요."
            tips={[
              '전략의 핵심 메시지와 경험 정리 방향까지 함께 확인해보면 포트폴리오 구성에 더 도움이 돼요.',
              '완성된 전략은 포트폴리오에 넣을 경험의 순서를 정할 때 참고해보세요.',
              '강조 키워드와 보완 가이드를 함께 보면 지원 직무에 맞는 방향을 잡기 쉬워요.',
            ]}
          />
        )}
      </div>
    </div>
  );
}
