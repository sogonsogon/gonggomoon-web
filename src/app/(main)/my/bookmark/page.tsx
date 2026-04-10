import Title from '@/shared/components/ui/Title';
import BookmarkSection from '@/features/bookmark/components/sections/BookmarkSection';

export default function BookmarkPage() {
  return (
    <div className="flex flex-col w-full">
      {/* 북마크 영역 */}
      <div className="flex flex-col gap-6">
        {/* 페이지 제목 */}
        <Title title={'북마크'} description={'저장한 채용 공고를 확인하고 관리할 수 있습니다'} />
        <BookmarkSection />
      </div>
    </div>
  );
}
