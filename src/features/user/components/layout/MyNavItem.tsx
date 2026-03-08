'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ICON_MAP, NavItemKey } from '@/features/user/constants/navigation';

interface MyNavItemProps {
  href: string;
  label: string;
  iconKey: NavItemKey;
}

export default function MyNavItem({ href, label, iconKey }: MyNavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;
  const Icon = ICON_MAP[iconKey];

  return (
    <li key={href}>
      <Link
        href={href}
        className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 ${
          isActive ? 'bg-blue-50' : 'hover:bg-gray-50'
        }`}
      >
        <Icon className={`h-4 w-4 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
        <span
          className={`text-sm ${
            isActive ? 'font-semibold text-blue-700' : 'font-medium text-gray-700'
          }`}
        >
          {label}
        </span>
      </Link>
    </li>
  );
}
