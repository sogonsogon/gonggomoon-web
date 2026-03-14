'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';
import { toast } from 'sonner';
import { useDeleteInterview } from '@/features/interview/queries';

interface InterviewDeleteDialogProps {
  interviewStrategyId: number;
  isOpen: boolean;
  onOpenChange: (next: boolean) => void;
}

export default function InterviewDeleteDialog({
  interviewStrategyId,
  isOpen,
  onOpenChange,
}: InterviewDeleteDialogProps) {
  const { mutate: deleteInterview, isPending } = useDeleteInterview();

  // 면접 질문 삭제
  const handleDelete = () => {
    if (isPending) return;
    deleteInterview(interviewStrategyId, {
      onSuccess: () => {
        toast.success(`면접 질문이 삭제되었습니다.`);
      },
      onError: () => {
        toast.error('면접 질문 삭제에 실패했습니다. 잠시 후 다시 시도해주세요.');
      },
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>면접 질문 삭제</DialogTitle>
          <DialogDescription>해당 면접 질문을 삭제하시겠습니까?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            취소
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
            삭제
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
