'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ResourceTabs() {
  const pathname = usePathname();

  const activeTab = pathname.split('/').pop() || 'file';

  return (
    <Tabs defaultValue={activeTab} className="w-full">
      <TabsList variant="line" className="w-full gap-0">
        <TabsTrigger value="file" asChild>
          <Link href="/resource/file">파일 관리</Link>
        </TabsTrigger>
        <TabsTrigger value="experience" asChild>
          <Link href="/resource/experience">경험 관리</Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
