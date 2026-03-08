'use client';

import { useState } from 'react';
import { Bookmark } from 'lucide-react';

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
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);

  const isIconOnly = variant === 'icon';

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setIsBookmarked((prev) => !prev);

    // TODO:
    // 1) 비로그인 사용자인 경우 로그인 모달 open
    // 2) 로그인 사용자인 경우 북마크 토글 API 연결
    // 3) API 실패 시 optimistic update rollback 처리
    console.log('bookmark toggle', postId);
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
