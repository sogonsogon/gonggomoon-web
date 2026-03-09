'use client';

import { Button } from '@/shared/components/ui/button';
import { useFileUploadDialog } from '@/features/file/hooks/useFileUploadDialog';
import { FolderOpenIcon } from 'lucide-react';

export default function FileTableEmpty() {
  const { openDialog } = useFileUploadDialog();

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
        <FolderOpenIcon className="h-6 w-6 text-gray-400" />
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <p className="text-sm font-semibold text-gray-900">등록된 파일이 없어요</p>
        <p className="text-sm text-gray-500">포트폴리오, 이력서 등 파일을 등록해 보세요</p>
      </div>
      <Button
        type="button"
        onClick={openDialog}
        className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
      >
        파일 등록하기
      </Button>
    </div>
  );
}
