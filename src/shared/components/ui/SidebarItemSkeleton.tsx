'use client';

import { Skeleton } from '@/shared/components/ui/skeleton';
import { SidebarMenuItem, SidebarMenuButton } from '@/shared/components/ui/sidebar';

export default function SidebarItemSkeleton() {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild className="h-auto p-0">
        <div className="flex gap-2.5 rounded-lg border border-transparent px-3 py-2.5 group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:py-0">
          <div className="flex h-4 w-4 shrink-0 items-center justify-center">
            <Skeleton className="h-1.5 w-1.5 rounded-full" />
          </div>

          <div className="flex min-w-0 flex-col gap-1.5 group-data-[collapsible=icon]:hidden">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-2.5 w-16" />
          </div>
        </div>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
