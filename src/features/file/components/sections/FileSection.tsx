'use client';

import FileTable from '@/features/file/components/ui/FileTable';
import FileUploadButton from '@/features/file/components/ui/FileUploadButton';
import { MAX_FILES } from '@/features/file/constants/maxFiles';
import { useFiles } from '@/features/file/queries';

export default function FileSection() {
  const { data } = useFiles();

  const currentFileCount = data && data.totalCount;

  return (
    <>
      {/* 파일 개수 / 첨부파일 등록 버튼 */}
      <div className="flex items-center justify-between relative pt-4">
        <div className="flex items-center gap-1">
          <span className="text-sm font-medium text-gray-500">파일</span>
          <span className="text-sm font-bold text-gray-900">{currentFileCount ?? 0}</span>
          <span className="text-sm text-gray-400">/</span>
          <span className="text-sm text-gray-400">{MAX_FILES}</span>
        </div>
        <FileUploadButton canUpload={(currentFileCount ?? 0) < MAX_FILES} />
      </div>

      {/* 파일 테이블 */}
      <FileTable />
    </>
  );
}
