'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bookmark, Building2, Calendar, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { mockBookmarks, type BookmarkedItem } from '@/mocks/bookmark.mock';
import Header from '@/shared/components/layout/Header';
import MyNav from '@/shared/components/layout/MyNav';
import Footer from '@/shared/components/layout/Footer';

// 오늘 날짜 (mock 기준)
const TODAY = new Date('2026-03-05');

function getDDayInfo(dueDate: string | null) {
  if (!dueDate) return { label: '상시', variant: 'blue' as const };

  const due = new Date(dueDate);
  const diffDays = Math.ceil((due.getTime() - TODAY.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return { label: '마감', variant: 'closed' as const };
  if (diffDays === 0) return { label: 'D-Day', variant: 'red' as const };

  const label = `D-${diffDays}`;
  return { label, variant: diffDays <= 7 ? ('red' as const) : ('blue' as const) };
}

function formatDeadline(dueDate: string | null): string {
  if (!dueDate) return '상시 모집';
  const d = new Date(dueDate);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `마감일 ${y}. ${m}. ${day}`;
}

const ITEMS_PER_PAGE = 10;

const ddayVariantClass: Record<string, string> = {
  red: 'bg-[#FEF2F2] text-red-500',
  blue: 'bg-blue-50 text-blue-600',
  closed: 'bg-gray-100 text-gray-500',
};

export default function BookmarkPage() {
  const [bookmarks, setBookmarks] = useState<BookmarkedItem[]>(mockBookmarks);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(bookmarks.length / ITEMS_PER_PAGE));
  const paginated = bookmarks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  function handleDelete(bookmarkId: number) {
    setBookmarks((prev) => prev.filter((b) => b.bookmarkId !== bookmarkId));
  }

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <Header />

      {/* Body */}
      <div className="flex flex-1 gap-12 px-30 py-10">
        <MyNav activePath="/my/bookmark" />

        {/* Right Content */}
        <div className="flex flex-1 flex-col gap-5">
          {/* Page Title */}
          <div className="flex flex-col gap-1">
            <h1 className="text-[22px] font-bold text-gray-900">북마크</h1>
            <p className="text-sm text-gray-500">저장한 채용 공고를 확인하고 관리할 수 있습니다</p>
          </div>

          {/* Count Row */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">
              총 {bookmarks.length}개의 북마크
            </span>
          </div>

          {/* Card List or Empty State */}
          {paginated.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 py-24">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                <Bookmark className="h-6 w-6 text-gray-400" />
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <p className="text-sm font-semibold text-gray-900">저장된 북마크가 없어요</p>
                <p className="text-sm text-gray-500">관심 있는 채용 공고를 북마크해 보세요</p>
              </div>
              <Link
                href="/recruitment"
                className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
              >
                공고 둘러보기
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {paginated.map((item) => {
                const dday = getDDayInfo(item.dueDate);
                return (
                  <div
                    key={item.bookmarkId}
                    className="flex items-center justify-between rounded-xl border border-gray-100 px-6 py-5"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-1.5">
                        <Building2 className="h-3.5 w-3.5 text-blue-600" />
                        <span className="text-sm font-semibold text-blue-600">
                          {item.companyName}
                        </span>
                      </div>
                      <span className="text-base font-semibold text-gray-900">{item.title}</span>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3 w-3 text-gray-500" />
                        <span className="text-xs text-gray-500">
                          {formatDeadline(item.dueDate)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-md px-2 py-1 text-xs font-semibold ${ddayVariantClass[dday.variant]}`}
                      >
                        {dday.label}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.bookmarkId)}
                        className="rounded-md border border-gray-200 p-2 hover:bg-gray-50"
                        aria-label="북마크 삭제"
                      >
                        <Trash2 className="h-4 w-4 text-gray-500" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-1 pt-5">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
                이전
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`h-9 w-9 rounded-md text-sm font-medium ${
                    currentPage === page
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                다음
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
