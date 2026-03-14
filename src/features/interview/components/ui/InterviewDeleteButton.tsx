'use client';

import { Trash2 } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { useRouter } from 'next/navigation';

interface InterviewDeleteButtonProps {
  interviewStrategyId: number;
}

export default function InterviewDeleteButton({ interviewStrategyId }: InterviewDeleteButtonProps) {
  const router = useRouter();
  const handleDelete = () => {
    // TODO: 면접 질문 삭제 API 호출
    console.log('delete interview', interviewStrategyId);
    router.push('/interview/create');
  };

  return (
    <Button
      type="button"
      onClick={handleDelete}
      className="flex items-center gap-1.5 rounded-lg border border-gray-100 bg-transparent px-3 py-1.5 hover:bg-gray-50"
    >
      <Trash2 className="h-3.5 w-3.5 text-red-500" />
      <span className="text-[12px] font-medium text-red-500">삭제하기</span>
    </Button>
  );
}
