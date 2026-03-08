'use client';

import { useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import { Trash2Icon } from 'lucide-react';
import BookmarkDeleteDialog from '@/features/bookmark/components/ui/BookmarkDeleteDialog';

interface BookmarkDeleteButton {
  postId: number;
}

export default function BookmarkDeleteButton({ postId }: BookmarkDeleteButton) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    // TODO: 북마크 삭제 API 호출
    console.log('delete bookmark', postId);
  };

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="z-1 rounded-md border text-gray-400 border-gray-200 p-2 hover:bg-gray-50 hover:text-red-500"
        aria-label="북마크 삭제"
        onClick={handleOpenDialog}
      >
        <Trash2Icon className="h-4 w-4" />
      </Button>
      <BookmarkDeleteDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
