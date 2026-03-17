import { formatDate } from '@/shared/utils/formatDate';
import { formatFileSize } from '@/features/file/utils/formatFileSize';
import { isPdf } from '@/features/file/utils/isPdf';
import type { File, FileCategory } from '@/features/file/types';
import FileDeleteButton from '@/features/file/components/ui/FileDeleteButton';
import { FileIcon, FileTextIcon } from 'lucide-react';
import { TableCell, TableRow } from '@/shared/components/ui/table';
import { FILE_CATEGORY_LABEL } from '@/features/file/constants/fileCategory';

const CATEGORY_BADGE_CLASS: Record<FileCategory, string> = {
  PORTFOLIO: 'bg-[#e8f3ff] text-[#3182f6]',
  RESUME: 'bg-blue-50 text-blue-700',
  OTHER: 'bg-gray-100 text-gray-600',
};

interface FileTableRowProps {
  file: File;
  variant?: 'row' | 'card';
}

export default function FileTableRow({ file, variant = 'row' }: FileTableRowProps) {
  if (variant === 'card') {
    return (
      <div className="flex items-center justify-between gap-3 px-4 py-3.5">
        <div className="flex min-w-0 flex-col gap-1">
          <div className="flex items-center gap-2">
            <span
              className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${CATEGORY_BADGE_CLASS[file.category]}`}
            >
              {FILE_CATEGORY_LABEL[file.category]}
            </span>
            <div className="flex min-w-0 items-center gap-1.5">
              {isPdf(file.originalFileName) ? (
                <FileTextIcon className="h-3.5 w-3.5 shrink-0 text-gray-500" />
              ) : (
                <FileIcon className="h-3.5 w-3.5 shrink-0 text-gray-500" />
              )}
              <span className="truncate text-sm font-medium text-gray-900">
                {file.originalFileName}
              </span>
            </div>
          </div>
          <span className="text-xs text-gray-400">
            {formatFileSize(file.sizeBytes)} · {formatDate(file.createdAt)}
          </span>
        </div>
        <FileDeleteButton file={file} />
      </div>
    );
  }

  return (
    <TableRow>
      {/* 파일 카테고리 */}
      <TableCell className="w-25 px-4 py-3.5">
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-semibold ${CATEGORY_BADGE_CLASS[file.category]}`}
        >
          {FILE_CATEGORY_LABEL[file.category]}
        </span>
      </TableCell>

      {/* 파일 제목 */}
      <TableCell className="px-4 py-3.5">
        <div className="flex items-center gap-2">
          {isPdf(file.originalFileName) ? (
            <FileTextIcon className="h-4 w-4 shrink-0 text-gray-500" />
          ) : (
            <FileIcon className="h-4 w-4 shrink-0 text-gray-500" />
          )}
          <span className="text-sm font-medium text-gray-900">{file.originalFileName}</span>
        </div>
      </TableCell>

      {/* 파일 크기 */}
      <TableCell className="w-25 px-4 py-3.5">
        <span className="text-sm text-gray-600">{formatFileSize(file.sizeBytes)}</span>
      </TableCell>

      {/* 파일 등록 일 */}
      <TableCell className="w-30 px-4 py-3.5">
        <span className="text-sm text-gray-600">{formatDate(file.createdAt)}</span>
      </TableCell>

      {/* 삭제 버튼 */}
      <TableCell className="w-18 px-4 py-3.5 text-center">
        <FileDeleteButton file={file} />
      </TableCell>
    </TableRow>
  );
}
