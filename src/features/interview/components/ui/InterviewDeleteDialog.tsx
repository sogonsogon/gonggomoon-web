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
import { useInterviewDeleteDialog } from '@/features/interview/stores/useInterviewDeleteDialog';

interface InterviewDeleteDialogProps {
  onDelete?: () => void;
}

export default function InterviewDeleteDialog({ onDelete }: InterviewDeleteDialogProps) {
  const { interviewId, closeDialog } = useInterviewDeleteDialog();
  const { mutate: deleteInterview, isPending } = useDeleteInterview();

  // 면접 질문 삭제
  const handleDelete = () => {
    if (isPending || !interviewId) return;
    deleteInterview(interviewId, {
      onSuccess: () => {
        toast.success(`면접 질문이 삭제되었습니다.`);
        if (onDelete) onDelete();
      },
      onError: () => {
        toast.error('면접 질문 삭제에 실패했습니다. 잠시 후 다시 시도해주세요.');
      },
    });
    closeDialog();
  };

  return (
    <Dialog open={!!interviewId} onOpenChange={(open) => !open && closeDialog()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>면접 질문 삭제</DialogTitle>
          <DialogDescription>해당 면접 질문을 삭제하시겠습니까?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={closeDialog}>
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
