import Title from '@/shared/components/ui/Title';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getStrategyListQueryOptions } from '@/features/strategy/queries';
import MyStrategySection from '@/features/strategy/components/sections/MyStrategySection';

export default async function StrategyPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(getStrategyListQueryOptions());

  return (
    <div className="flex flex-col w-full">
      {/* 메인 영역 */}
      <div className="flex flex-1 flex-col gap-8">
        {/* 페이지 타이틀 */}
        <Title
          title={'포폴 전략'}
          description={'AI가 생성한 나만의 포트폴리오 전략을 확인하고 관리하세요'}
        />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <MyStrategySection />
        </HydrationBoundary>
      </div>
    </div>
  );
}
