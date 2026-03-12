import { File } from '@/features/file/types';
import FileTableEmpty from '@/features/file/components/ui/FileTableEmpty';
import FileTableRow from '@/features/file/components/ui/FileTableRow';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';

interface FileTableProps {
  files: File[];
}

export default function FileTable({ files }: FileTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-100">
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
          {files.length === 0 ? (
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
  );
}
