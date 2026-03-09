'use client';

import { Button } from '@/shared/components/ui/button';
import { Trash2Icon } from 'lucide-react';
import { useState } from 'react';
import FileDeleteDialog from '@/features/file/components/ui/FileDeleteDialog';
import { File } from '@/features/file/types';

interface FileDeleteButtonProps {
  file: File;
}

export default function FileDeleteButton({ file }: FileDeleteButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleOpenDialog = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setIsDialogOpen(true);
  };

  const handleDeleteFile = async () => {
    // TODO: 파일 삭제 API 호출
  };

  return (
    <>
      <Button
        type="button"
        variant="outline"
        className="text-gray-400 hover:text-red-500"
        onClick={() => setIsDialogOpen(true)}
        aria-label="파일 삭제"
      >
        <Trash2Icon className="h-4 w-4" />
      </Button>
      <FileDeleteDialog
        fileName={file.title}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onConfirm={handleDeleteFile}
      />
    </>
  );
}
