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
} from '@/shared/components/ui/sidebar';
import { HistorySidebarItem } from '@/shared/types';

interface HistorySidebarProps {
  title: string;
  createLabel: string;
  createHref: string;
  manageLabel: string;
  manageHref: string;
  items: HistorySidebarItem[];
  processingLabel?: string;
  processingItems?: HistorySidebarItem[];
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
}: HistorySidebarProps) {
  const pathname = usePathname();

  const renderMenuItems = (menuItems: HistorySidebarItem[], isProcessingSection = false) =>
    menuItems.map((item) => {
      const isActive = pathname === item.href;

      return (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton asChild isActive={isActive} className="h-auto p-0">
            <Link
              href={item.href}
              className={`flex gap-2.5 rounded-lg border px-3 py-2.5 ${
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

              <div className="flex min-w-0 flex-col">
                <span
                  className={`truncate text-[12px] font-semibold leading-4 ${
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
      collapsible="offcanvas"
      className="top-20 h-[calc(100svh-5rem)] border-r border-gray-100 bg-gray-50 [--sidebar-width:16rem]"
    >
      <SidebarHeader className="gap-4 px-4 pb-4 pt-5">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-semibold text-gray-700">{title}</span>
        </div>

        <Link
          href={createHref}
          className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2.5 text-[13px] font-semibold text-white hover:bg-blue-700"
        >
          <Plus className="h-3.5 w-3.5" />
          {createLabel}
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2">
        {processingItems.length > 0 && processingLabel && (
          <SidebarGroup className="gap-2 p-0">
            <SidebarGroupLabel className="px-3 py-1 text-[11px] font-semibold text-gray-400">
              {processingLabel}
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu className="gap-0.5">
                {renderMenuItems(processingItems, true)}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        <SidebarGroup className="gap-2 p-0">
          <SidebarGroupLabel className="px-3 py-1 text-[11px] font-semibold text-gray-400">
            히스토리
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">{renderMenuItems(items)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-100 px-4 py-3.5">
        <Link
          href={manageHref}
          className="flex items-center gap-1.5 text-[12px] font-medium text-gray-500 hover:text-gray-700"
        >
          <Settings2 className="h-3.5 w-3.5 text-gray-400" />
          {manageLabel}
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
