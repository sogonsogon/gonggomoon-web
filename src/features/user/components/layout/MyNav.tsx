'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronDownIcon } from 'lucide-react';
import { MY_PAGE_NAV_ITEMS, ICON_MAP } from '@/features/user/constants/navigation';
import MyNavItem from '@/features/user/components/layout/MyNavItem';

export default function MyNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const activeItem = MY_PAGE_NAV_ITEMS.find((item) => item.href === pathname);
  const ActiveIcon = activeItem ? ICON_MAP[activeItem.iconKey] : null;

  return (
    <nav className="w-full md:sticky md:top-25 md:w-45 md:shrink-0 md:self-start">
      {/* 모바일 */}
      <div className="relative md:hidden">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex w-full cursor-pointer items-center justify-between rounded-lg bg-gray-50 px-3 py-2.5"
        >
          <span className="flex items-center gap-2.5">
            {ActiveIcon && <ActiveIcon className="h-4 w-4 text-blue-600" />}
            <span className="text-sm font-semibold text-blue-700">
              {activeItem?.label ?? '마이페이지'}
            </span>
          </span>
          <ChevronDownIcon
            className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
        {isOpen && (
          <div className="absolute left-0 right-0 top-full z-10 mt-1 rounded-lg border border-gray-100 bg-white p-2 shadow-sm">
            <ul className="flex flex-col gap-1">
              {MY_PAGE_NAV_ITEMS.map((item) => (
                <MyNavItem key={item.href} {...item} onNavigate={() => setIsOpen(false)} />
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 데스크탑 */}
      <div className="hidden md:block rounded-lg p-2">
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
