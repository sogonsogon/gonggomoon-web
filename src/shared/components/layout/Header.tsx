'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, X } from 'lucide-react';
import SearchBar from '@/shared/components/ui/SearchBar';
import ProfileMenu from '@/features/auth/components/ui/ProfileMenu';
import { Suspense, useMemo, useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/ui/sheet';
import Image from 'next/image';
import logo from '@/shared/assets/images/logo.png';

export default function Header() {
  const currentPath = usePathname();

  return <HeaderContent key={currentPath} currentPath={currentPath} />;
}

interface HeaderContentProps {
  currentPath: string;
}

function HeaderContent({ currentPath }: HeaderContentProps) {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isTabletSearchOpen, setIsTabletSearchOpen] = useState(false);

  const showSearchBar =
    currentPath === '/' ||
    SEARCH_BAR_ALLOWED_PREFIXES.some((prefix) => currentPath.startsWith(prefix));

  return (
    <header className="sticky top-0 z-50 flex w-full justify-center border-b border-gray-100 bg-white">
      <div className="relative flex h-16 w-full max-w-7xl items-center px-4 md:h-20 lg:px-5 xl:px-6">
        <div className="hidden w-full items-center md:flex">
          <div className="flex min-w-0 items-center gap-8 lg:gap-7 xl:gap-8">
            <Link href="/" className="flex items-center gap-1.5">
              <Image
                src={logo}
                alt="공고문"
                sizes="100vw"
                style={{ width: '100px', height: 'auto' }}
                priority
              />
            </Link>

            <nav className="hidden flex-nowrap items-center gap-4 md:flex lg:gap-5 xl:gap-6">
              {NAV_ITEMS.map((item) => {
                const isActive = item.match(currentPath);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={
                      isActive
                        ? 'whitespace-nowrap text-[13px] font-semibold text-gray-900 lg:text-sm'
                        : 'whitespace-nowrap text-[13px] font-medium text-gray-500 hover:text-gray-700 lg:text-sm'
                    }
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="ml-auto flex items-center justify-end gap-2">
            {showSearchBar && (
              <Sheet open={isTabletSearchOpen} onOpenChange={setIsTabletSearchOpen}>
                <SheetTrigger asChild>
                  <button
                    type="button"
                    aria-label="검색 열기"
                    className="hidden h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-600 md:max-lg:flex cursor-pointer"
                  >
                    <Search className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </button>
                </SheetTrigger>

                <SheetContent
                  side="top"
                  className="p-0 md:max-lg:mx-auto md:max-lg:mt-4 md:max-lg:w-[min(92vw,760px)] md:max-lg:rounded-2xl md:max-lg:border md:max-lg:border-gray-200"
                >
                  <SheetHeader className="border-b border-gray-100 px-4 py-3">
                    <SheetTitle className="text-sm font-semibold text-gray-900">
                      공고 검색
                    </SheetTitle>
                  </SheetHeader>
                  <div className="px-4 pb-4 pt-3">
                    <SearchBar className="w-full max-w-none" />
                  </div>
                </SheetContent>
              </Sheet>
            )}

            <ProfileMenu />
          </div>
        </div>

        {showSearchBar && (
          <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
            <Suspense fallback={null}>
              <SearchBar className="max-w-none w-72 xl:w-96" />
            </Suspense>
          </div>
        )}

        <div className="flex w-full items-center md:hidden">
          {showSearchBar && isMobileSearchOpen ? (
            <div className="flex w-full items-center gap-2 pr-0.5">
              <SearchBar className="min-w-0 max-w-none flex-1 px-3 py-2" />
              <button
                type="button"
                aria-label="검색 닫기"
                onClick={() => setIsMobileSearchOpen(false)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-600 cursor-pointer"
              >
                <X className="h-3.5 w-3.5" strokeWidth={1.75} />
              </button>
            </div>
          ) : (
            <>
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src={logo}
                  alt="공고문"
                  sizes="100vw"
                  style={{ width: '100px', height: 'auto' }}
                  priority
                />
              </Link>

              <div className="ml-auto flex items-center gap-2">
                {showSearchBar && (
                  <button
                    type="button"
                    aria-label="검색 열기"
                    onClick={() => setIsMobileSearchOpen(true)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-600 cursor-pointer"
                  >
                    <Search className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </button>
                )}
                <ProfileMenu />
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

const SEARCH_BAR_ALLOWED_PREFIXES = ['/recruitment/', '/company/'];

const NAV_ITEMS = [
  {
    label: '채용 공고',
    href: '/',
    match: (path: string) => path === '/' || path.startsWith('/recruitment'),
  },
  {
    label: '포폴 전략',
    href: '/strategy/create',
    match: (path: string) => path.startsWith('/strategy'),
  },
  {
    label: '모의 면접',
    href: '/interview/create',
    match: (path: string) => path.startsWith('/interview'),
  },
];
