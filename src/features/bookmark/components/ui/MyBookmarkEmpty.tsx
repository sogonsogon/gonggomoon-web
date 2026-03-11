import { BookmarkIcon } from 'lucide-react';
import Link from 'next/link';

export default function MyBookmarkEmpty() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-32">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
        <BookmarkIcon className="h-6 w-6 text-gray-400" />
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <p className="text-sm font-semibold text-gray-900">저장된 북마크가 없어요</p>
        <p className="text-sm text-gray-500">관심 있는 채용 공고를 북마크해 보세요</p>
      </div>
      <Link
        href="/"
        className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
      >
        공고 둘러보기
      </Link>
    </div>
  );
}
