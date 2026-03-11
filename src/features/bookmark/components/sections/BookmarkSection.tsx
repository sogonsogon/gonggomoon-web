'use client';

import BookmarkEmpty from '@/features/bookmark/components/ui/BookmarkEmpty';
import BookmarkList from '@/features/bookmark/components/ui/BookmarkList';
import { useBookmarks } from '@/features/bookmark/queries';

export default function BookmarkSection() {
  const { data: bookmarks, isLoading, isError, error } = useBookmarks();

  return (
    <>
      {/* 북마크 개수 */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-600">
          총 {bookmarks?.length || 0}개의 북마크
        </span>
      </div>

      {/* 빈 리스트 or 북마크 리스트 */}
      {!bookmarks || bookmarks?.length === 0 ? <BookmarkEmpty /> : <BookmarkList />}
    </>
  );
}
