'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { User, Bookmark, Folder, Briefcase, Lightbulb, MessageCircle, LogOut } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { mockUser } from '@/mocks/auth.mock';
import LoginModal from '@/features/auth/components/ui/LoginModal';

export default function ProfileMenu() {
  const user = mockUser;

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    setIsLoggedIn(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsLoginModalOpen(false);
  };

  return (
    <>
      {!isLoggedIn ? (
        <button
          type="button"
          onClick={() => setIsLoginModalOpen(true)}
          className="cursor-pointer rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
        >
          로그인
        </button>
      ) : (
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
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

          {isDropdownOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-50 overflow-hidden rounded-md border border-gray-200 bg-white p-1 shadow-md">
              {MENU_SECTIONS.map((section, sectionIndex) => (
                <div key={`section-${sectionIndex}`}>
                  {section.map((item) => {
                    const Icon = item.icon;
                    const content = (
                      <span
                        className={`flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-gray-100 ${
                          item.danger ? 'text-red-500' : 'text-gray-700'
                        }`}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        {item.label}
                      </span>
                    );

                    if (item.href) {
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsDropdownOpen(false)}
                          className="block w-full"
                        >
                          {content}
                        </Link>
                      );
                    }

                    return (
                      <button
                        key={item.label}
                        type="button"
                        className="w-full cursor-pointer text-left"
                        onClick={handleLogout}
                      >
                        {content}
                      </button>
                    );
                  })}

                  {sectionIndex < MENU_SECTIONS.length - 1 && (
                    <div className="my-1 h-px bg-gray-100" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <LoginModal
        open={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />
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
