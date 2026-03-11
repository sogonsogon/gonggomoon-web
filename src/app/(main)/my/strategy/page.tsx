import Link from 'next/link';
import { CirclePlusIcon } from 'lucide-react';
import { mockStrategies } from '@/mocks/strategy.mock';
import Title from '@/shared/components/ui/Title';
import MyStrategyEmpty from '@/features/strategy/components/ui/MyStrategyEmpty';
import MyStrategyCard from '@/features/strategy/components/ui/MyStrategyCard';

export default function StrategyPage() {
  const strategies = mockStrategies;

  return (
    <div className="flex flex-col w-full">
      {/* 메인 영역 */}
      <div className="flex flex-1 flex-col gap-8">
        {/* 페이지 타이틀 */}
        <Title
          title={'포폴 전략'}
          description={'AI가 생성한 나만의 포트폴리오 전략을 확인하고 관리하세요'}
        />

        {/* 전략 개수 표시 */}
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-medium text-gray-600">
            총 {strategies.length}개의 전략
          </span>
        </div>

        {/* 전략 리스트 */}
        {strategies.length === 0 ? (
          <MyStrategyEmpty />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {strategies.map((strategy) => (
              <MyStrategyCard key={strategy.strategyId} strategy={strategy} />
            ))}

            {/* 포폴 전략 생성 버튼 */}
            <Link
              href="/strategy/create"
              className="flex h-39 flex-col items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50"
            >
              <CirclePlusIcon className="h-4.5 w-4.5 text-gray-500" />
              <span className="text-sm font-semibold text-gray-600">포폴 전략 생성</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
