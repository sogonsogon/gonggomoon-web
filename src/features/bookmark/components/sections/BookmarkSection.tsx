'use client';

import MyBookmarkEmpty from '@/features/bookmark/components/ui/MyBookmarkEmpty';
import MyBookmarkList from '@/features/bookmark/components/ui/MyBookmarkList';
import { useGetBookmarks } from '@/features/bookmark/queries';

export default function BookmarkSection() {
  const { data: bookmarks, isLoading, isError, error } = useGetBookmarks();

  return (
    <>
      {/* 북마크 개수 */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-600">
          총 {bookmarks?.content.length || 0}개의 북마크
        </span>
      </div>

      {/* 빈 리스트 or 북마크 리스트 */}
      {!bookmarks || bookmarks?.content.length === 0 ? <MyBookmarkEmpty /> : <MyBookmarkList />}
    </>
  );
}
