'use client';

import { useExperienceExtractDialog } from '@/features/experience/stores/useExperienceExtractDialog';
import { FolderOpenIcon } from 'lucide-react';
import Link from 'next/link';

export default function ExperienceFileEmpty() {
  const { closeDialog } = useExperienceExtractDialog();

  return (
    <div className="flex flex-col items-center justify-center gap-4 px-6 py-16">
      <div className="flex h-18 w-18 items-center justify-center rounded-full bg-gray-100">
        <FolderOpenIcon className="h-8 w-8 text-gray-400" />
      </div>
      <div className="flex flex-col items-center gap-1.5 text-center">
        <p className="text-[16px] font-semibold text-gray-700">등록된 파일이 없습니다</p>
        <p className="text-[13px] text-gray-400">
          파일을 등록하면 경험을 자동으로 추출할 수 있어요
        </p>
      </div>
      <Link
        href="/my/file"
        onClick={closeDialog}
        className="rounded-lg bg-gray-900 px-4 py-2.5 text-[14px] font-semibold text-white hover:bg-gray-700"
      >
        파일 등록하러 가기
      </Link>
    </div>
  );
}
