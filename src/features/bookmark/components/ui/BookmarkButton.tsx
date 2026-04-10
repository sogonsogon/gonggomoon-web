'use client';

import type { MouseEvent } from 'react';
import { Bookmark } from 'lucide-react';
import { useLoginModal } from '@/features/auth/stores/useLoginModal';
import { useBookmarkStatus, useGetBookmarks, useToggleBookmark } from '@/features/bookmark/queries';
import { useAuthStore } from '@/shared/provider/AuthProvider';
interface BookmarkButtonProps {
  postId: number;
  isBookmarked: boolean;
  disabled?: boolean;
  variant?: 'default' | 'icon';
}

export default function BookmarkButton({
  postId,
  isBookmarked,
  disabled = false,
  variant = 'default',
}: BookmarkButtonProps) {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const { openDialog } = useLoginModal();

  const { data: bookmarkStatusMap } = useBookmarkStatus(isLoggedIn);
  const { data: bookmarks } = useGetBookmarks(isLoggedIn);
  const { mutate: toggleBookmark, isPending } = useToggleBookmark(postId);

  const isIconOnly = variant === 'icon';

  const cachedIsBookmarked = bookmarkStatusMap?.[postId];
  const resolvedIsBookmarked = cachedIsBookmarked === undefined ? isBookmarked : cachedIsBookmarked;

  const currentBookmark = (bookmarks?.content ?? []).find((item) => item.postId === postId);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (!isLoggedIn) {
      openDialog();
      return;
    }

    toggleBookmark({
      postId,
      nextBookmarked: !resolvedIsBookmarked,
      bookmarkId: currentBookmark?.bookmarkId,
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || isPending}
      aria-pressed={resolvedIsBookmarked}
      aria-label={resolvedIsBookmarked ? '북마크 해제' : '북마크 추가'}
      aria-busy={isPending}
      className={`inline-flex shrink-0 items-center justify-center rounded-lg border transition-colors ${
        resolvedIsBookmarked
          ? 'border-blue-300 bg-blue-50 text-blue-600'
          : 'border-gray-200 text-gray-600 hover:bg-gray-50'
      } ${
        isIconOnly ? 'h-9 w-9 p-0' : 'gap-1.5 px-2 py-2 text-[13px] font-medium'
      } ${disabled || isPending ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
    >
      <Bookmark
        className={`h-5 w-5 ${
          resolvedIsBookmarked ? 'fill-blue-500 text-blue-500' : 'text-gray-500'
        }`}
      />
      {!isIconOnly && '북마크'}
    </button>
  );
}
