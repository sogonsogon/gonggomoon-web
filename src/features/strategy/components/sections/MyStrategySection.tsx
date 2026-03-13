'use client';

import MyStrategyCard from '@/features/strategy/components/ui/MyStrategyCard';
import MyStrategyEmpty from '@/features/strategy/components/ui/MyStrategyEmpty';
import MyStrategyLoading from '@/features/strategy/components/ui/MyStrategyLoading';
import MyStrategyError from '@/features/strategy/components/ui/MyStrategyError';
import { useGetStrategyList } from '@/features/strategy/queries';
import { CirclePlusIcon } from 'lucide-react';
import Link from 'next/link';

export default function MyStrategySection() {
  const { data: strategyData, isLoading, isError, error } = useGetStrategyList();
  const strategies = strategyData?.contents || [];

  if (isLoading) {
    return <MyStrategyLoading />;
  }
  if (isError) {
    return <MyStrategyError message={error.message} />;
  }

  return (
    <>
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
    </>
  );
}
