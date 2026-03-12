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
      <FileDeleteDialog file={file} open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
}
