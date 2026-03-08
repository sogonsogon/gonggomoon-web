import { mockBookmarks } from '@/mocks/bookmark.mock';
import BookmarkSidebar from '@/features/recruitment/components/ui/BookmarkSidebar';

export default async function BookmarkSidebarSection() {
  // TODO: 서버에서 실제 로그인 상태 확인
  const isLoggedIn = true;

  // TODO: 로그인 사용자일 때만 실제 북마크 데이터 조회
  const bookmarks = isLoggedIn ? mockBookmarks : [];

  return <BookmarkSidebar isLoggedIn={isLoggedIn} bookmarks={bookmarks} />;
}
