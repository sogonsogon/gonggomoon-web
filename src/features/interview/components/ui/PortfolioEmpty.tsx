import { Button } from '@/shared/components/ui/button';
import { FolderOpenIcon } from 'lucide-react';
import Link from 'next/link';

export default function PortfolioEmpty() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 py-10">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
        <FolderOpenIcon className="h-6 w-6 text-gray-400" />
      </div>

      <div className="flex flex-col items-center gap-1.5 text-center">
        <span className="text-[15px] font-semibold text-gray-900">등록된 포트폴리오가 없어요</span>
        <span className="text-[13px] text-gray-500">
          내 파일 페이지에서 포트폴리오를 먼저 등록해 주세요
        </span>
      </div>

      <Button asChild>
        <Link href="/resource/file">파일 등록하러 가기</Link>
      </Button>
    </div>
  );
}
