'use client';

import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/shared/components/ui/button';
import { useDeleteStrategy } from '@/features/strategy/queries';

interface StrategyDeleteButtonProps {
  strategyId: number;
}

export default function StrategyDeleteButton({ strategyId }: StrategyDeleteButtonProps) {
  const router = useRouter();
  const { mutateAsync: deleteStrategy, isPending } = useDeleteStrategy();

  const handleDelete = async () => {
    try {
      await deleteStrategy(strategyId);

      toast.success('포폴 전략이 삭제되었어요.');
      router.replace('/strategy/create');
    } catch (error) {
      console.error(error);
      toast.error('포폴 전략 삭제에 실패했어요.');
    }
  };

  return (
    <Button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="flex items-center gap-1.5 rounded-lg border border-gray-100 bg-transparent px-3 py-1.5 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Trash2 className="h-3.5 w-3.5 text-red-500" />
      <span className="text-[12px] font-medium text-red-500">
        {isPending ? '삭제 중...' : '삭제하기'}
      </span>
    </Button>
  );
}
