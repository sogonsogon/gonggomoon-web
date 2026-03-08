'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SearchBar from '@/shared/components/ui/SearchBar';
import ProfileMenu from '@/features/auth/components/ui/ProfileMenu';

export default function Header() {
  const currentPath = usePathname();

  const showSearchBar =
    currentPath === '/' ||
    SEARCH_BAR_ALLOWED_PREFIXES.some((prefix) => currentPath.startsWith(prefix));

  return (
    <header className="flex h-20 w-full justify-center border-b border-gray-100">
      <div className="relative flex h-full w-full max-w-7xl items-center px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-1.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gray-900">
              <span className="text-sm font-bold text-white">G</span>
            </div>
            <span className="text-base font-bold text-gray-900">공고문</span>
          </Link>

          <nav className="flex items-center gap-6">
            {NAV_ITEMS.map((item) => {
              const isActive = item.match(currentPath);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    isActive
                      ? 'text-sm font-semibold text-gray-900'
                      : 'text-sm font-medium text-gray-500 hover:text-gray-700'
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {showSearchBar && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <SearchBar />
          </div>
        )}

        <div className="ml-auto">
          <ProfileMenu />
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
