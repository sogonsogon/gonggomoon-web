'use client';

import { useState } from 'react';
import { Bookmark } from 'lucide-react';
import { useUser } from '@/features/user/queries';
import { useLoginModal } from '@/features/auth/stores/useLoginModal';
import { useAddBookmark, useDeleteBookmark } from '@/features/bookmark/queries';

interface BookmarkButtonProps {
  postId: number | string;
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
  const { mutate: addBookmark } = useAddBookmark();
  const { mutate: deleteBookmark } = useDeleteBookmark();

  const { openDialog } = useLoginModal();

  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);

  const isIconOnly = variant === 'icon';

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    // 비로그인 사용자인 경우 로그인 모달 open
    if (!user) {
      openDialog();
      return;
    }

    // 로그인 사용자인 경우 북마크 토글 API 연결
    setIsBookmarked((prev) => !prev);
    if (!isBookmarked) {
      addBookmark(Number(postId), {
        onError: () => setIsBookmarked(false),
      });
    } else {
      deleteBookmark(Number(postId), {
        onError: () => setIsBookmarked(true),
      });
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      aria-pressed={isBookmarked}
      aria-label={isBookmarked ? '북마크 해제' : '북마크 추가'}
      className={`inline-flex shrink-0 items-center justify-center rounded-lg border transition-colors ${
        isBookmarked
          ? 'border-blue-300 bg-blue-50 text-blue-600'
          : 'border-gray-200 text-gray-600 hover:bg-gray-50'
      } ${
        isIconOnly ? 'h-9 w-9 p-0' : 'gap-1.5 px-2 py-2 text-[13px] font-medium'
      } ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
    >
      <Bookmark
        className={`h-5 w-5 ${isBookmarked ? 'fill-blue-500 text-blue-500' : 'text-gray-500'}`}
      />
      {!isIconOnly && '북마크'}
    </button>
  );
}
