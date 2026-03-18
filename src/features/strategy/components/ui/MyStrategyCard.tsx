'use client';

import { Strategy } from '@/features/strategy/types';
import { formatCreatedDate } from '@/shared/utils/formatCreatedDate';
import { Button } from '@/shared/components/ui/button';
import { CalendarIcon, Trash2Icon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import StrategyDeleteDialog from '@/features/strategy/components/ui/StrategyDeleteDialog';

interface MyStrategyCardProps {
  strategy: Strategy;
}

export default function MyStrategyCard({ strategy }: MyStrategyCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  return (
    <div
      key={strategy.strategyId}
      className="overflow-hidden rounded-xl border border-gray-200 bg-white"
    >
      {/* Card Top */}
      <div className="flex h-30 flex-col justify-between border-b border-gray-100 px-5 pb-4 pt-5">
        <div className="flex items-center justify-between">
          <span className="text-xl font-extrabold leading-tight">
            {strategy.industryName || '마스터 포트폴리오'}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => setIsDialogOpen(true)}
            aria-label="전략 삭제"
            className="mt-0.5 shrink-0 text-gray-400 hover:bg-transparent hover:text-red-500"
          >
            <Trash2Icon className="h-3.75 w-3.75" />
          </Button>
        </div>
        <div className="flex items-center gap-1.5">
          <CalendarIcon className="h-3 w-3" />
          <span className="text-xs">{formatCreatedDate(strategy.createdAt)}</span>
        </div>
      </div>

      {/* Card Bottom */}
      <Link
        href={`/strategy/result/${strategy.strategyId}`}
        className="flex w-full h-9 items-center justify-center rounded-lg py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50"
      >
        보기
      </Link>
      <StrategyDeleteDialog
        strategyId={strategy.strategyId}
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </div>
  );
}
