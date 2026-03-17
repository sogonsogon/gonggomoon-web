'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronDownIcon } from 'lucide-react';
import { MY_PAGE_NAV_ITEMS, ICON_MAP } from '@/features/user/constants/navigation';
import MyNavItem from '@/features/user/components/layout/MyNavItem';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';

export default function MyNav() {
  const pathname = usePathname();

  const activeItem = MY_PAGE_NAV_ITEMS.find((item) => item.href === pathname);
  const ActiveIcon = activeItem ? ICON_MAP[activeItem.iconKey] : null;

  return (
    <nav className="w-full md:sticky md:top-25 md:w-45 md:shrink-0 md:self-start">
      {/* 모바일 */}
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger className="group flex w-full cursor-pointer items-center justify-between rounded-lg bg-gray-50 px-3 py-2.5 outline-none">
            <span className="flex items-center gap-2.5">
              {ActiveIcon && <ActiveIcon className="h-4 w-4 text-blue-600" />}
              <span className="text-sm font-semibold text-blue-700">
                {activeItem?.label ?? '마이페이지'}
              </span>
            </span>
            <ChevronDownIcon className="h-4 w-4 text-gray-500 transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            sideOffset={4}
            className="w-(--radix-dropdown-menu-trigger-width) rounded-lg border-gray-100 p-2 shadow-sm"
          >
            {MY_PAGE_NAV_ITEMS.map((item) => {
              const Icon = ICON_MAP[item.iconKey];
              const isActive = pathname === item.href;
              return (
                <DropdownMenuItem key={item.href} asChild>
                  <Link
                    href={item.href}
                    className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 ${
                      isActive ? 'bg-blue-50' : ''
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                    <span
                      className={`text-sm ${
                        isActive ? 'font-semibold text-blue-700' : 'font-medium text-gray-700'
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* 데스크탑 */}
      <div className="hidden rounded-lg p-2 md:block">
        <p className="mb-1 w-full px-3 pb-1 text-xs font-semibold text-gray-500">마이페이지</p>
        <ul className="flex flex-col gap-1">
          {MY_PAGE_NAV_ITEMS.map((item) => (
            <MyNavItem key={item.href} {...item} />
          ))}
        </ul>
      </div>
    </nav>
  );
}
