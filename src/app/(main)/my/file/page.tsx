import { mockFiles } from '@/mocks/file.mock';
import Title from '@/shared/components/ui/Title';
import FileTable from '@/features/file/components/ui/FileTable';
import FileUploadButton from '@/features/file/components/ui/FileUploadButton';
import { File } from '@/features/file/types';
import FileUploadDialog from '@/features/file/components/ui/FileUploadDialog';

const MAX_FILES = 10;

export default function FilePage() {
  const files: File[] = mockFiles;
  const canUpload = files.length < MAX_FILES;

  return (
    <div className="flex min-h-screen flex-col w-full bg-white">
      {/* 메인 영역 */}
      <div className="flex flex-1 flex-col gap-8">
        {/* 페이지 타이틀 */}
        <Title
          title={'내 파일'}
          description={'포트폴리오, 이력서 등 첨부파일을 관리할 수 있습니다'}
        />

        {/* 파일 개수 / 첨부파일 등록 버튼 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium text-gray-500">파일</span>
            <span className="text-sm font-bold text-gray-900">{files.length}</span>
            <span className="text-sm text-gray-400">/</span>
            <span className="text-sm text-gray-400">{MAX_FILES}</span>
          </div>
          <FileUploadButton canUpload={canUpload} />
        </div>

        {/* 파일 테이블 */}
        <FileTable files={files} />
      </div>

      <FileUploadDialog />
    </div>
  );
}
