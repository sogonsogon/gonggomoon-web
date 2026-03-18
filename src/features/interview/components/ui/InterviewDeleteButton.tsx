'use client';

import { Trash2 } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { useRouter } from 'next/navigation';
import { useDeleteInterview } from '@/features/interview/queries';
import { toast } from 'sonner';

interface InterviewDeleteButtonProps {
  interviewStrategyId: number;
  className?: string;
  hideLabelOnMobile?: boolean;
}

export default function InterviewDeleteButton({
  interviewStrategyId,
  className,
  hideLabelOnMobile = false,
}: InterviewDeleteButtonProps) {
  const router = useRouter();
  const { mutateAsync: deleteInterview, isPending } = useDeleteInterview();
  const handleDelete = async () => {
    try {
      await deleteInterview(interviewStrategyId);

      toast.success('면접 질문이 삭제되었어요.');
      router.replace('/interview/create');
    } catch (error) {
      console.error(error);
      toast.error('면접 질문 삭제에 실패했어요.');
    }
  };

  return (
    <Button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className={`flex items-center gap-1.5 rounded-lg border border-gray-100 bg-transparent px-3 py-1.5 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 ${className ?? ''}`}
    >
      <Trash2 className="h-3.5 w-3.5 text-red-500" />
      <span className={`text-[12px] font-medium text-red-500 ${hideLabelOnMobile ? 'max-md:hidden' : ''}`}>
        {isPending ? '삭제 중...' : '삭제하기'}
      </span>
    </Button>
  );
}
