import Link from 'next/link';
import { Bookmark, ChevronRight } from 'lucide-react';

type BookmarkItem = {
  postId: number | string;
  postTitle: string;
  deadline: string | null;
};

type BookmarkSidebarProps = {
  isLoggedIn: boolean;
  bookmarks: BookmarkItem[];
};

export default function BookmarkSidebar({ isLoggedIn, bookmarks }: BookmarkSidebarProps) {
  const hasBookmarks = bookmarks.length > 0;

  return (
    <div className="flex w-80 shrink-0 flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-[15px] font-semibold text-gray-900">북마크한 공고</span>

        {isLoggedIn && hasBookmarks && (
          <Link
            href="/my/bookmark"
            className="flex items-center gap-1 text-[13px] text-gray-500 hover:text-gray-700"
          >
            전체 보기
            <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
          </Link>
        )}
      </div>

      {!isLoggedIn ? (
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
          {bookmarks.slice(0, 4).map((bookmark) => (
            <Link
              key={bookmark.postId}
              href={`/recruitment/${bookmark.postId}`}
              className="flex flex-col gap-2.5 rounded-[10px] border border-gray-100 bg-gray-50 p-4 hover:bg-gray-100"
            >
              <p className="text-sm font-medium leading-relaxed text-gray-900">
                {bookmark.postTitle}
              </p>
              <span className="text-xs text-gray-400">{formatBookmarkDate(bookmark.deadline)}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function BookmarkSidebarState({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col items-center px-6 py-10 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
        <Bookmark className="h-5 w-5 text-gray-400" />
      </div>

      <p className="text-sm font-semibold text-gray-900">{title}</p>
      <p className="mt-1 text-xs leading-relaxed text-gray-400">{description}</p>
    </div>
  );
}

function formatBookmarkDate(deadline: string | null): string {
  if (!deadline) return '상시 모집';

  const d = new Date(deadline);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');

  return `${y}.${m}.${day}`;
}
