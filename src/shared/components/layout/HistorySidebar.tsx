'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LoaderCircle, Plus, Settings2 } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/shared/components/ui/sidebar';
import { HistorySidebarItem } from '@/shared/types';
import SidebarItemSkeleton from '@/shared/components/ui/SidebarItemSkeleton';

interface HistorySidebarProps {
  title: string;
  createLabel: string;
  createHref: string;
  manageLabel: string;
  manageHref: string;
  items: HistorySidebarItem[];
  processingLabel?: string;
  processingItems?: HistorySidebarItem[];
  isLoading: boolean;
}

export default function HistorySidebar({
  title,
  createLabel,
  createHref,
  manageLabel,
  manageHref,
  items,
  processingLabel,
  processingItems = [],
  isLoading,
}: HistorySidebarProps) {
  const pathname = usePathname();
  const { state, isMobile, setOpenMobile } = useSidebar();

  const closeMobileSidebar = () => {
    if (!isMobile) return;
    setOpenMobile(false);
  };

  const renderMenuItems = (menuItems: HistorySidebarItem[], isProcessingSection = false) =>
    menuItems.map((item) => {
      const isActive = pathname === item.href;

      return (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton asChild isActive={isActive} className="h-auto p-0">
            <Link
              href={item.href}
              onClick={closeMobileSidebar}
              title={item.title}
              className={`flex gap-2.5 rounded-lg border px-3 py-2.5 transition-colors group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:py-0 ${
                isActive ? 'border-[#90c2ff] bg-[#e8f3ff]' : 'border-transparent hover:bg-gray-100'
              }`}
            >
              <div className="flex h-4 w-4 shrink-0 items-center justify-center">
                {isProcessingSection ? (
                  <LoaderCircle
                    className={`h-3 w-3 animate-spin ${
                      isActive ? 'text-[#2272eb]' : 'text-gray-400'
                    }`}
                  />
                ) : (
                  <div
                    className={`h-1.5 w-1.5 rounded-full ${
                      isActive ? 'bg-[#2272eb]' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>

              <div className="flex min-w-0 overflow-hidden whitespace-nowrap flex-col group-data-[collapsible=icon]:hidden">
                <span
                  className={`truncate whitespace-nowrap text-[12px] font-semibold leading-4 ${
                    isActive ? 'text-[#1b64da]' : 'text-gray-700'
                  }`}
                >
                  {item.title}
                </span>

                <span
                  className={`mt-0.5 text-[11px] leading-4 ${
                    isActive ? 'text-[#4593e6]' : 'text-gray-400'
                  }`}
                >
                  {item.date}
                </span>
              </div>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
    });

  return (
    <Sidebar
      collapsible="icon"
      className="top-20 h-[calc(100svh-5rem)] border-r border-gray-100 bg-gray-50 [--sidebar-width:16rem] [--sidebar-width-icon:4rem]"
    >
      <SidebarHeader className="gap-4 px-4 pt-5 pb-4 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:px-2">
        <div className="flex items-center justify-between group-data-[collapsible=icon]:justify-center">
          <span className="overflow-hidden whitespace-nowrap text-[13px] font-semibold text-gray-700 group-data-[collapsible=icon]:hidden">
            {title}
          </span>

          <SidebarTrigger className="h-8 w-8 text-gray-500 hover:bg-gray-100 hover:text-gray-700" />
        </div>

        <Link
          href={createHref}
          onClick={closeMobileSidebar}
          title={createLabel}
          className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-blue-700 group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:py-0"
        >
          <Plus className="h-3.5 w-3.5 shrink-0" />
          <span className="overflow-hidden whitespace-nowrap group-data-[collapsible=icon]:hidden">
            {createLabel}
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2 group-data-[collapsible=icon]:items-center">
        {processingItems.length > 0 && processingLabel && (
          <SidebarGroup className="gap-2 p-0">
            <SidebarGroupLabel className="px-3 py-1 text-[11px] font-semibold text-gray-400 group-data-[collapsible=icon]:hidden">
              {processingLabel}
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu className="gap-0.5 group-data-[collapsible=icon]:items-center">
                {renderMenuItems(processingItems, true)}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        <SidebarGroup className="gap-2 p-0">
          <SidebarGroupLabel className="px-3 py-1 text-[11px] font-semibold text-gray-400 overflow-hidden whitespace-nowrap group-data-[collapsible=icon]:hidden">
            히스토리
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5 group-data-[collapsible=icon]:items-center">
              {isLoading ? (
                <>
                  {Array.from({ length: 3 }, (_, idx) => (
                    <SidebarItemSkeleton key={idx} />
                  ))}
                </>
              ) : items.length === 0 && state === 'expanded' ? (
                <span className="px-3 py-1 items-center text-center text-xs text-gray-500 overflow-hidden whitespace-nowrap">
                  아직 생성된 {title}이 없어요
                </span>
              ) : (
                renderMenuItems(items, false)
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-100 px-4 py-3.5 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:px-2">
        <Link
          href={manageHref}
          onClick={closeMobileSidebar}
          title={manageLabel}
          className="flex items-center gap-1.5 text-[12px] font-medium text-gray-500 transition-colors hover:text-gray-700 group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0"
        >
          <Settings2 className="h-3.5 w-3.5 shrink-0 text-gray-400" />
          <span className="overflow-hidden whitespace-nowrap group-data-[collapsible=icon]:hidden">
            {manageLabel}
          </span>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
