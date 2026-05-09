'use client';

import { Trash2 } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { useStrategyDeleteDialog } from '@/features/strategy/stores/useStrategyDeleteDialog';
import StrategyDeleteDialog from '@/features/strategy/components/ui/StrategyDeleteDialog';
import { useRouter } from 'next/navigation';

interface StrategyDeleteButtonProps {
  strategyId: number;
  className?: string;
  hideLabelOnMobile?: boolean;
}

export default function StrategyDeleteButton({
  strategyId,
  className,
  hideLabelOnMobile = false,
}: StrategyDeleteButtonProps) {
  const router = useRouter();
  const { openDialog } = useStrategyDeleteDialog();

  return (
    <>
      <Button
        type="button"
        onClick={() => openDialog(strategyId)}
        className={`flex items-center gap-1.5 rounded-lg border border-gray-100 bg-transparent px-3 py-1.5 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 ${className ?? ''}`}
      >
        <Trash2 className="h-3.5 w-3.5 text-red-500" />
        <span
          className={`text-[12px] font-medium text-red-500 ${hideLabelOnMobile ? 'max-md:hidden' : ''}`}
        >
          삭제하기
        </span>
      </Button>
      <StrategyDeleteDialog onDelete={() => router.replace(`/strategy/create`)} />
    </>
  );
}
