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
import { useDeleteFile } from '@/features/file/queries';
import { File } from '@/features/file/types';
import { toast } from 'sonner';

interface FileDeleteDialogProps {
  file: File;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function FileDeleteDialog({ file, open, onOpenChange }: FileDeleteDialogProps) {
  const { mutate: deleteFile, isPending } = useDeleteFile();

  // 파일 삭제
  const handleDelete = () => {
    if (isPending) return;
    deleteFile(file.fileAssetId, {
      onSuccess: () => {
        toast.success(`${file.originalFileName} 파일이 삭제되었습니다.`);
      },
      onError: () => {
        toast.error('파일 삭제에 실패했습니다. 잠시 후 다시 시도해주세요.');
      },
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>파일 삭제</DialogTitle>
          <DialogDescription>{file.originalFileName} 파일을 삭제하시겠습니까?</DialogDescription>
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
