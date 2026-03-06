'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Search,
  User,
  Bookmark,
  Folder,
  Briefcase,
  Lightbulb,
  MessageCircle,
  LogOut,
  MoonStar,
  X,
  MessagesSquare,
  Sparkles,
} from 'lucide-react';
import { mockUser } from '@/mocks/auth.mock';

const MENU_ITEMS = [
  { icon: User, label: '프로필', href: '/my/profile' },
  { icon: Bookmark, label: '북마크', href: '/my/bookmark' },
  { icon: Folder, label: '내 파일', href: '/my/file' },
  { icon: Briefcase, label: '내 경험', href: '/my/experience' },
  { type: 'divider' as const },
  { icon: Lightbulb, label: '포폴 전략', href: '/my/strategy' },
  { icon: MessageCircle, label: '면접 질문', href: '/my/interview' },
  { type: 'divider' as const },
  { icon: LogOut, label: '로그아웃', href: null, danger: true },
];

const BENEFITS = [
  { icon: Search, label: '339개+ 공고를 한눈에 탐색' },
  { icon: Sparkles, label: 'AI 포트폴리오 전략 자동 생성' },
  { icon: MessagesSquare, label: '맞춤 면접 질문 자동 생성' },
];

export default function Header() {
  const router = useRouter();
  const user = mockUser;
  const [query, setQuery] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSearch = () => {
    if (!query) router.replace('/');
    else router.replace(`/?q=${query}`);
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  function handleLogout() {
    setIsDropdownOpen(false);
    setIsLoggedIn(false);
  }

  function handleNaverLogin() {
    setIsLoggedIn(true);
    setIsLoginModalOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header className="flex h-20 items-center justify-between border-b border-gray-100 px-30">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-1.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gray-900">
              <span className="text-sm font-bold text-white">G</span>
            </div>
            <span className="text-base font-bold text-gray-900">공고문</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-sm font-semibold text-gray-900">
              채용 공고
            </Link>
            <Link href="/strategy/create" className="text-sm font-medium text-gray-500">
              포폴 전략
            </Link>
            <Link href="/interview/create" className="text-sm font-medium text-gray-500">
              모의 면접
            </Link>
          </nav>
        </div>

        {/* Center Search */}
        <div className="flex w-105 items-center gap-2.5 rounded-full bg-gray-100 px-5 py-2.5">
          <Search
            className="h-4.5 w-4.5 shrink-0 cursor-pointer text-gray-500"
            onClick={handleSearch}
          />
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => handleEnter(event)}
            placeholder="공고명을 검색하세요"
            className="flex-1 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
          />
        </div>

        {isLoggedIn ? (
          /* Avatar + Dropdown */
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsDropdownOpen((v) => !v)}
              className="h-9 w-9 overflow-hidden rounded-full bg-gray-200 focus:outline-none"
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

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 top-full z-50 mt-2 w-50 overflow-hidden rounded-md border border-gray-200 bg-white p-1 shadow-md">
                {MENU_ITEMS.map((item, idx) => {
                  if (item.type === 'divider') {
                    return <div key={idx} className="my-1 h-px bg-gray-100" />;
                  }

                  const Icon = item.icon!;
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
                      >
                        {content}
                      </Link>
                    );
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      className="w-full text-left"
                      onClick={handleLogout}
                    >
                      {content}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          /* Login Button (logged-out state) */
          <button
            type="button"
            onClick={() => setIsLoginModalOpen(true)}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            로그인
          </button>
        )}
      </header>

      {/* Login Modal (US-00) */}
      {isLoginModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setIsLoginModalOpen(false)}
        >
          <div
            className="flex w-100 flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_8px_32px_rgba(0,0,0,0.16)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Row */}
            <div className="flex justify-end px-4 pt-4">
              <button
                type="button"
                onClick={() => setIsLoginModalOpen(false)}
                aria-label="닫기"
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200"
              >
                <X className="h-3.5 w-3.5 text-gray-500" />
              </button>
            </div>

            {/* Brand Area */}
            <div className="flex flex-col items-center gap-3 px-8 pb-7 pt-2">
              <div className="flex items-center gap-1.5">
                <MoonStar className="h-5.5 w-5.5 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">공고문</span>
              </div>
              <p className="text-center text-sm text-gray-500">
                취업 준비의 모든 것, 공고문과 함께하세요
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-100" />

            {/* Login Body */}
            <div className="flex flex-col gap-5 px-8 py-6">
              {/* Naver Login Button */}
              <button
                type="button"
                onClick={handleNaverLogin}
                className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#03a94d] hover:bg-[#029944]"
              >
                <span className="flex h-4.5 w-4.5 items-center justify-center text-[15px] font-extrabold leading-none text-white">
                  N
                </span>
                <span className="text-lg font-semibold tracking-tight text-white">
                  네이버 로그인
                </span>
              </button>

              {/* OR Divider */}
              <div className="h-px bg-gray-200" />

              {/* Benefit Area */}
              <div className="flex flex-col gap-2.5 rounded-[10px] bg-gray-50 px-4 py-3.5">
                {BENEFITS.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2.5">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-blue-100">
                      <Icon className="h-3 w-3 text-blue-600" />
                    </div>
                    <span className="text-xs font-medium text-gray-700">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-100" />

            {/* Footer */}
            <div className="px-8 py-4">
              <p className="text-center text-[11px] text-gray-400">
                가입 시{' '}
                <span className="cursor-pointer font-medium text-blue-600">서비스 이용약관</span> 및{' '}
                <span className="cursor-pointer font-medium text-blue-600">개인정보 처리방침</span>
                에 동의하게 됩니다.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
