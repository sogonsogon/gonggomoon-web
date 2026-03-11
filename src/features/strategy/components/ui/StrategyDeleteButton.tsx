'use client';

import { Button } from '@/shared/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface StrategyDeleteButtonProps {
  strategyId: number;
}

export default function StrategyDeleteButton({ strategyId }: StrategyDeleteButtonProps) {
  const router = useRouter();

  function handleDelete() {
    // TODO: 실제 API mutation 또는 전역 상태 삭제 연결
    console.log('delete strategy:', strategyId);
    router.push('/strategy/create');
  }

  return (
    <Button
      type="button"
      onClick={handleDelete}
      className="flex items-center gap-1.5 rounded-lg border border-gray-100 px-3 py-1.5 bg-transparent hover:bg-gray-50"
    >
      <Trash2 className="h-3.5 w-3.5 text-red-500" />
      <span className="text-[12px] font-medium text-red-500">삭제하기</span>
    </Button>
  );
}
