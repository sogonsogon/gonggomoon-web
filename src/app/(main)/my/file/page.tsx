import Title from '@/shared/components/ui/Title';
import FileUploadDialog from '@/features/file/components/ui/FileUploadDialog';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fileQueryOptions } from '@/features/file/queries';
import FileSection from '@/features/file/components/sections/FileSection';

export default async function FilePage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(fileQueryOptions());

  return (
    <div className="flex flex-col w-full bg-white">
      {/* 메인 영역 */}
      <div className="flex flex-1 flex-col gap-8">
        {/* 페이지 타이틀 */}
        <Title
          title={'내 파일'}
          description={'포트폴리오, 이력서 등 첨부파일을 관리할 수 있습니다'}
        />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <FileSection />
        </HydrationBoundary>
      </div>

      <FileUploadDialog />
    </div>
  );
}
