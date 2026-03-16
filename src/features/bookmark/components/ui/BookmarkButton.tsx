'use client';

import { Bookmark } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { useUser } from '@/features/user/queries';
import { useLoginModal } from '@/features/auth/stores/useLoginModal';
import { bookmarkKeys, useGetBookmarks, useToggleBookmark } from '@/features/bookmark/queries';
import type { Bookmark as BookmarkItem } from '@/features/bookmark/types';

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
  const queryClient = useQueryClient();
  const { data: user } = useUser();
  const { openDialog } = useLoginModal();
  const { data: bookmarks } = useGetBookmarks(Boolean(user));
  const { mutate: toggleBookmark, isPending } = useToggleBookmark(postId);

  const isIconOnly = variant === 'icon';

  const cachedIsBookmarked = bookmarks?.some((bookmark) => bookmark.postId === postId) ?? null;
  const resolvedIsBookmarked = cachedIsBookmarked === null ? isBookmarked : cachedIsBookmarked;

  const getLatestBookmarkedState = () => {
    const latestBookmarks = queryClient.getQueryData<BookmarkItem[]>(bookmarkKeys.list());

    if (!latestBookmarks) {
      return resolvedIsBookmarked;
    }

    return latestBookmarks.some((bookmark) => bookmark.postId === postId);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (!user) {
      openDialog();
      return;
    }

    const latestIsBookmarked = getLatestBookmarkedState();

    toggleBookmark({
      postId,
      nextBookmarked: !latestIsBookmarked,
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      aria-pressed={resolvedIsBookmarked}
      aria-label={resolvedIsBookmarked ? '북마크 해제' : '북마크 추가'}
      aria-busy={isPending}
      className={`inline-flex shrink-0 items-center justify-center rounded-lg border transition-colors ${
        resolvedIsBookmarked
          ? 'border-blue-300 bg-blue-50 text-blue-600'
          : 'border-gray-200 text-gray-600 hover:bg-gray-50'
      } ${
        isIconOnly ? 'h-9 w-9 p-0' : 'gap-1.5 px-2 py-2 text-[13px] font-medium'
      } ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
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
