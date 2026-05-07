'use client';

import FileSkeleton from '@/features/file/components/ui/FileSkeleton';
import FileTableEmpty from '@/features/file/components/ui/FileTableEmpty';
import FileTableRow from '@/features/file/components/ui/FileTableRow';
import { useFiles } from '@/features/file/queries';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';
import { cn } from '@/shared/lib/cn';

export default function FileTable() {
  const { data, isLoading } = useFiles();

  const files = data?.contents || [];

  return (
    <>
      {/* Mobile: card list */}
      <div
        className={cn(
          'overflow-hidden rounded-xl divide-y divide-gray-100 lg:hidden',
          files.length > 0 && 'border border-gray-100',
        )}
      >
        {isLoading ? (
          <>
            {Array.from({ length: 5 }, (_, idx) => (
              <FileSkeleton key={idx} variant="card" />
            ))}
          </>
        ) : files.length === 0 ? (
          <FileTableEmpty />
        ) : (
          files.map((file) => <FileTableRow key={file.fileAssetId} file={file} variant="card" />)
        )}
      </div>

      {/* Desktop: table */}
      <div className="hidden overflow-hidden rounded-xl border border-gray-100 lg:block">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50">
              <TableHead className="w-25 px-4 py-3 text-sm font-semibold text-gray-600">
                구분
              </TableHead>
              <TableHead className="px-4 py-3 text-sm font-semibold text-gray-600">
                파일 제목
              </TableHead>
              <TableHead className="w-25 px-4 py-3 text-sm font-semibold text-gray-600">
                용량
              </TableHead>
              <TableHead className="w-30 px-4 py-3 text-sm font-semibold text-gray-600">
                등록일
              </TableHead>
              <TableHead className="w-18 px-4 py-3 text-center text-sm font-semibold text-gray-600">
                삭제
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <>
                {Array.from({ length: 5 }, (_, idx) => (
                  <FileSkeleton key={idx} variant="row" />
                ))}
              </>
            ) : files.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={5} className="p-0">
                  <FileTableEmpty />
                </TableCell>
              </TableRow>
            ) : (
              files.map((file) => <FileTableRow key={file.fileAssetId} file={file} />)
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
