import ResourceTabs from '@/shared/components/layout/ResourceTabs';
import Title from '@/shared/components/ui/Title';

export default function ResourceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col flex-1 w-full gap-4 px-4 pt-6 pb-10 md:min-h-180 md:pt-10 md:pb-20 md:gap-4">
      <Title
        title={'자료 정리'}
        description={'포트폴리오, 이력서 등의 파일과 나의 커리어 경험을 정리합니다'}
      />
      <div className="flex flex-col gap-4">
        <ResourceTabs />
        {children}
      </div>
    </div>
  );
}
