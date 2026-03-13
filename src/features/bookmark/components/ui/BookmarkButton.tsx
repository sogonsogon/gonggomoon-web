'use client';

import { Bookmark } from 'lucide-react';
import { useUser } from '@/features/user/queries';
import { useLoginModal } from '@/features/auth/stores/useLoginModal';
import { useAddBookmark, useDeleteBookmark, useGetBookmarks } from '@/features/bookmark/queries';

interface BookmarkButtonProps {
  postId: number;
  initialBookmarked?: boolean;
  disabled?: boolean;
  variant?: 'default' | 'icon';
}

export default function BookmarkButton({
  postId,
  initialBookmarked = false,
  disabled = false,
  variant = 'default',
}: BookmarkButtonProps) {
  const { data: user } = useUser();
  const { data: bookmarks } = useGetBookmarks(!!user);
  const { mutate: addBookmark, isPending: isAddPending } = useAddBookmark();
  const { mutate: deleteBookmark, isPending: isDeletePending } = useDeleteBookmark();
  const { openDialog } = useLoginModal();

  const isIconOnly = variant === 'icon';
  const isMutating = isAddPending || isDeletePending;

  const isBookmarked = bookmarks?.some((item) => item.postId === postId) ?? initialBookmarked;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (!user) {
      openDialog();
      return;
    }

    if (isMutating) return;

    if (isBookmarked) {
      deleteBookmark(postId);
      return;
    }

    addBookmark(postId);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || isMutating}
      aria-pressed={isBookmarked}
      aria-label={isBookmarked ? '북마크 해제' : '북마크 추가'}
      className={`inline-flex shrink-0 items-center justify-center rounded-lg border transition-colors ${
        isBookmarked
          ? 'border-blue-300 bg-blue-50 text-blue-600'
          : 'border-gray-200 text-gray-600 hover:bg-gray-50'
      } ${
        isIconOnly ? 'h-9 w-9 p-0' : 'gap-1.5 px-2 py-2 text-[13px] font-medium'
      } ${disabled || isMutating ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
    >
      <Bookmark
        className={`h-5 w-5 ${isBookmarked ? 'fill-blue-500 text-blue-500' : 'text-gray-500'}`}
      />
      {!isIconOnly && '북마크'}
    </button>
  );
}
