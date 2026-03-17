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

interface ExperienceCancelDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export default function ExperienceCancelDialog({
  isOpen,
  onOpenChange,
  onConfirm,
}: ExperienceCancelDialogProps) {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>변경 사항 취소</DialogTitle>
          <DialogDescription>
            저장되지 않은 변경 사항이 있습니다. 계속하면 입력한 내용이 사라집니다.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            취소
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            계속
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
