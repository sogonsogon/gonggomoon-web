'use client';

import Link from 'next/link';
import { Bookmark as BookmarkIcon, ChevronRight } from 'lucide-react';
import { formatBookmarkDate } from '@/shared/utils/formatBookmarkDate';
import { useUser } from '@/features/user/queries';
import { useGetBookmarks } from '@/features/bookmark/queries';

interface BookmarkSidebarProps {
  showHeader?: boolean;
}

export default function BookmarkSidebar({ showHeader = true }: BookmarkSidebarProps) {
  const { data: user } = useUser();
  const { data: bookmarks } = useGetBookmarks(!!user);

  const bookmarkItems = bookmarks?.content ?? [];
  const hasBookmarks = bookmarkItems.length > 0;

  return (
    <div className="flex w-80 shrink-0 flex-col gap-4 max-md:w-full lg:w-full xl:w-80">
      {showHeader && (
        <div className="flex items-center justify-between">
          <span className="text-[15px] font-semibold text-gray-900">북마크한 공고</span>

          {user && hasBookmarks && (
            <Link
              href="/my/bookmark"
              className="flex items-center gap-1 text-[13px] text-gray-500 hover:text-gray-700"
            >
              전체 보기
              <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
            </Link>
          )}
        </div>
      )}

      {!user ? (
        <BookmarkSidebarState
          title="로그인 후 북마크를 저장할 수 있어요"
          description="로그인하면 관심 공고를 모아보고 빠르게 확인할 수 있어요"
        />
      ) : !hasBookmarks ? (
        <BookmarkSidebarState
          title="저장된 북마크가 없어요"
          description="관심 있는 공고를 북마크해 보세요"
        />
      ) : (
        <div className="flex flex-col gap-3">
          {bookmarkItems.slice(0, 4).map((bookmark) => (
            <Link
              key={bookmark.postId}
              href={`/recruitment/${bookmark.postId}`}
              className="flex flex-col gap-2.5 rounded-[10px] border border-gray-100 bg-gray-50 p-4 hover:bg-gray-100"
            >
              <p className="text-sm font-medium leading-relaxed text-gray-900">
                {bookmark.postTitle}
              </p>
              <span className="text-xs text-gray-400">{formatBookmarkDate(bookmark.dueDate)}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function BookmarkSidebarState({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col items-center px-6 py-10 text-center max-md:px-4 max-md:py-8">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
        <BookmarkIcon className="h-5 w-5 text-gray-400" />
      </div>

      <p className="text-sm font-semibold text-gray-900">{title}</p>
      <p className="mt-1 text-xs leading-relaxed text-gray-400">{description}</p>
    </div>
  );
}
