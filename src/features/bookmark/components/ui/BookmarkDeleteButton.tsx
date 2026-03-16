'use client';

import { useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import { Trash2Icon } from 'lucide-react';
import BookmarkDeleteDialog from '@/features/bookmark/components/ui/BookmarkDeleteDialog';
import { useDeleteBookmark } from '@/features/bookmark/queries';

interface BookmarkDeleteButtonProps {
  postId: number;
}

export default function BookmarkDeleteButton({ postId }: BookmarkDeleteButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { mutate: deleteBookmark, isPending } = useDeleteBookmark();

  const handleOpenDialog = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (isPending) return;

    deleteBookmark(postId, {
      onSuccess: () => {
        setIsDialogOpen(false);
      },
    });
  };

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="z-1 rounded-md border border-gray-200 p-2 text-gray-400 hover:bg-gray-50 hover:text-red-500"
        aria-label="북마크 삭제"
        onClick={handleOpenDialog}
        disabled={isPending}
      >
        <Trash2Icon className="h-4 w-4" />
      </Button>

      <BookmarkDeleteDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onConfirm={handleConfirmDelete}
        isPending={isPending}
      />
    </>
  );
}
