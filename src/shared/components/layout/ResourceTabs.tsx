'use client';

import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ICON_MAP } from '@/features/user/constants/navigation';

export default function ResourceTabs() {
  const pathname = usePathname();
  const activeTab = pathname.split('/').pop() || 'file';

  const FileIcon = ICON_MAP['file'];
  const ExperienceIcon = ICON_MAP['experience'];

  return (
    <Tabs value={activeTab} className="w-full">
      <TabsList variant="default" className="w-full">
        <TabsTrigger value="file" asChild>
          <Link href="/resource/file" className="gap-2">
            <FileIcon size={4} />
            파일 관리
          </Link>
        </TabsTrigger>
        <TabsTrigger value="experience" asChild>
          <Link href="/resource/experience" className="gap-2">
            <ExperienceIcon size={4} />
            경험 관리
          </Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
