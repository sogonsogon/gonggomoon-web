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
import { useDeleteStrategy } from '@/features/strategy/queries';
import { useStrategyDeleteDialog } from '@/features/strategy/stores/useStrategyDeleteDialog';

interface StrategyDeleteDialog {
  onDelete?: () => void;
}

export default function StrategyDeleteDialog({ onDelete }: StrategyDeleteDialog) {
  const { strategyId, closeDialog } = useStrategyDeleteDialog();
  const { mutate: deleteStrategy, isPending } = useDeleteStrategy();

  const handleDelete = () => {
    if (isPending || !strategyId) return;
    deleteStrategy(strategyId, {
      onSuccess: () => {
        toast.success(`포폴 전략이 삭제되었습니다.`);
        if (onDelete) onDelete();
      },
      onError: () => {
        toast.error('포폴 전략 삭제에 실패했습니다. 잠시 후 다시 시도해주세요.');
      },
    });
    closeDialog();
  };

  return (
    <Dialog open={!!strategyId} onOpenChange={(open) => !open && closeDialog()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>포폴 전략 삭제</DialogTitle>
          <DialogDescription>해당 포폴 전략을 삭제하시겠습니까?</DialogDescription>
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
