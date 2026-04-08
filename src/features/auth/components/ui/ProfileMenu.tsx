'use client';

import Link from 'next/link';
import Image from 'next/image';
import { User, Bookmark, Folder, Briefcase, Lightbulb, MessageCircle, LogOut } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { Button } from '@/shared/components/ui/button';
import { useLogout } from '@/features/auth/queries';
import { useUser } from '@/features/user/queries';
import { useLoginModal } from '@/features/auth/stores/useLoginModal';
import { Skeleton } from '@/shared/components/ui/skeleton';

export default function ProfileMenu() {
  const { data: user, isLoading } = useUser();
  const { mutate: logout, isPending } = useLogout();
  const { openDialog } = useLoginModal();

  const handleLogout = () => {
    if (isPending) return;
    logout();
  };

  if (isLoading) return <Skeleton className="w-9 h-9 rounded-full" />;

  return (
    <>
      {!user ? (
        <Button
          type="button"
          variant="outline"
          onClick={openDialog}
          className="cursor-pointer rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
        >
          로그인
        </Button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="h-9 w-9 cursor-pointer overflow-hidden rounded-full bg-gray-200 focus:outline-none"
              aria-label="프로필 메뉴 열기"
            >
              {user.profileImageUrl ? (
                <Image
                  src={user.profileImageUrl}
                  alt={user.name}
                  width={36}
                  height={36}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
              )}
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-50">
            {MENU_SECTIONS.map((section, sectionIndex) => (
              <div key={`section-${sectionIndex}`}>
                {section.map((item) => {
                  const Icon = item.icon;

                  if (item.href) {
                    return (
                      <DropdownMenuItem key={item.href} asChild>
                        <Link href={item.href} className="cursor-pointer">
                          <Icon className="h-4 w-4 shrink-0" />
                          {item.label}
                        </Link>
                      </DropdownMenuItem>
                    );
                  }

                  return (
                    <DropdownMenuItem
                      key={item.label}
                      variant="destructive"
                      className="cursor-pointer"
                      onClick={handleLogout}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {item.label}
                    </DropdownMenuItem>
                  );
                })}

                {sectionIndex < MENU_SECTIONS.length - 1 && <DropdownMenuSeparator />}
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}

type MenuItem = {
  icon: LucideIcon;
  label: string;
  href: string | null;
  danger?: boolean;
};

const MENU_SECTIONS: MenuItem[][] = [
  [
    { icon: User, label: '프로필', href: '/my/profile' },
    { icon: Bookmark, label: '북마크', href: '/my/bookmark' },
    { icon: Folder, label: '내 파일', href: '/my/file' },
    { icon: Briefcase, label: '내 경험', href: '/my/experience' },
  ],
  [
    { icon: Lightbulb, label: '포폴 전략', href: '/my/strategy' },
    { icon: MessageCircle, label: '면접 질문', href: '/my/interview' },
  ],
  [{ icon: LogOut, label: '로그아웃', href: null, danger: true }],
];
