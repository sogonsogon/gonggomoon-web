'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BriefcaseBusiness, Lightbulb, MessageSquareText, NotebookTextIcon } from 'lucide-react';

const NAV_ITEMS = [
  {
    href: '/',
    label: '채용 공고',
    icon: BriefcaseBusiness,
    match: (path: string) => path === '/' || path.startsWith('/recruitment'),
  },
  {
    href: '/resource/file',
    label: '자료 정리',
    icon: NotebookTextIcon,
    match: (path: string) => path.startsWith('/resource'),
  },
  {
    href: '/strategy/create',
    label: '포폴 전략',
    icon: Lightbulb,
    match: (path: string) => path.startsWith('/strategy'),
  },
  {
    href: '/interview/create',
    label: '면접 질문',
    icon: MessageSquareText,
    match: (path: string) => path.startsWith('/interview'),
  },
];

export default function MobileMainBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+1rem)] z-40 px-5 md:hidden">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-around rounded-2xl border border-gray-200 bg-white/95 px-3 shadow-[0_8px_24px_rgba(15,23,42,0.12)] backdrop-blur">
        {NAV_ITEMS.map((item) => {
          const isActive = item.match(pathname);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex min-w-0 flex-1 flex-col items-center justify-center gap-1"
            >
              <Icon className={`h-4 w-4 ${isActive ? 'text-gray-900' : 'text-gray-400'}`} />
              <span
                className={`text-[11px] ${isActive ? 'font-semibold text-gray-900' : 'text-gray-500'}`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
