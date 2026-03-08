import { mockBookmarks } from '@/mocks/bookmark.mock';
import Title from '@/shared/components/ui/Title';
import BookmarkEmpty from '@/features/user/components/sections/BookmarkEmpty';
import BookmarkList from '@/features/user/components/sections/BookmarkList';

export default function BookmarkPage() {
  // TODO: getBookmark API 호출
  const bookmarks = mockBookmarks;

  // TODO: 무한 스크롤 구현

  return (
    <div className="flex min-h-screen flex-col w-full">
      {/* 북마크 영역 */}
      <div className="flex flex-1 flex-col gap-5">
        {/* 페이지 제목 */}
        <Title title={'북마크'} description={'저장한 채용 공고를 확인하고 관리할 수 있습니다'} />

        {/* 북마크 개수 */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">
            총 {bookmarks.length}개의 북마크
          </span>
        </div>

        {/* 빈 리스트 or 북마크 리스트 */}
        {bookmarks.length === 0 ? <BookmarkEmpty /> : <BookmarkList bookmarks={bookmarks} />}
      </div>
    </div>
  );
}
