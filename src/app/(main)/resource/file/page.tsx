import Title from '@/shared/components/ui/Title';
import FileUploadDialog from '@/features/file/components/ui/FileUploadDialog';
import FileSection from '@/features/file/components/sections/FileSection';

export default async function FilePage() {
  return (
    <div className="flex flex-col w-full">
      {/* 메인 영역 */}
      <div className="flex flex-1 flex-col gap-6">
        {/* 페이지 타이틀 */}
        <FileSection />
      </div>

      <FileUploadDialog />
    </div>
  );
}
