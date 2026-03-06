'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import {
  Search,
  Sparkles,
  ArrowRight,
  Calendar,
  ChevronDown,
  ChevronRight,
  User,
} from 'lucide-react';
import { mockRecruitments } from '@/mocks/recruitment.mock';
import { mockBookmarks } from '@/mocks/bookmark.mock';
import { mockCompanies } from '@/mocks/company.mock';
import { mockUser } from '@/mocks/auth.mock';
import type { JobType } from '@/features/recruitment/types';
import Footer from '@/shared/components/layout/Footer';
import Header from '@/shared/components/layout/Header';

type TabValue = 'ALL' | JobType | 'EMBEDDED';

const TABS: { value: TabValue; label: string }[] = [
  { value: 'ALL', label: '전체' },
  { value: 'FRONTEND', label: '프론트엔드' },
  { value: 'BACKEND', label: '백엔드' },
  { value: 'EMBEDDED', label: '임베디드' },
  { value: 'DEVOPS', label: 'DevOps' },
  { value: 'DATA_ANALYSIS', label: '데이터 분석' },
  { value: 'AI', label: '인공지능' },
  { value: 'INFORMATION_SECURITY', label: '정보보안' },
  { value: 'DESIGN', label: '디자인' },
  { value: 'PM_PO', label: 'PM/PO' },
  { value: 'QA', label: 'QA' },
];

const companyMap = Object.fromEntries(mockCompanies.map((c) => [c.companyId, c.companyName]));

function formatDueDate(dueDate: string | null | undefined): string {
  if (!dueDate) return '상시';
  const d = new Date(dueDate);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `~${y}. ${m}. ${day}`;
}

function formatBookmarkDate(dueDate: string | null): string {
  if (!dueDate) return '상시 모집';
  const d = new Date(dueDate);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}.${m}.${day}`;
}

const TAB_VALUES = new Set<string>(TABS.map((t) => t.value));

export default function MainPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const tabParam = searchParams.get('tab') ?? '';
  const activeTab: TabValue = TAB_VALUES.has(tabParam) ? (tabParam as TabValue) : 'ALL';

  function handleTabChange(tab: TabValue) {
    const params = new URLSearchParams(searchParams.toString());
    if (tab === 'ALL') {
      params.delete('tab');
    } else {
      params.set('tab', tab);
    }
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  }

  const filtered = mockRecruitments.filter((r) => {
    const matchesTab = activeTab === 'ALL' || r.jobType === activeTab;
    return matchesTab;
  });

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      {/* Header */}
      <Header />

      {/* Body */}
      <div className="flex flex-1 flex-col gap-7 px-30 py-8">
        {/* Promo Banner */}
        <div
          className="flex items-center justify-between rounded-2xl px-9 py-7"
          style={{
            background: 'linear-gradient(90deg, #1B64DA 0%, #3182F6 50%, #64A8FF 100%)',
          }}
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-white" />
              <span className="text-lg font-bold text-white">AI 포트폴리오 전략을 세워보세요</span>
            </div>
            <p className="text-sm text-white/80">
              프론트엔드 · 핀테크/금융 직무에 맞춘 핵심 역량 3가지, 키워드 태그, 포트폴리오
              체크리스트까지 — 한 번에 확인하세요.
            </p>
          </div>
          <Link
            href="/strategy/create"
            className="flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-600 hover:bg-blue-50"
          >
            포폴 전략 생성하기
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Category Tabs */}
        <div className="flex border-b border-gray-200">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.value;
            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => handleTabChange(tab.value)}
                className={`px-4 pb-3 pt-3 text-sm ${
                  isActive
                    ? 'border-b-2 border-gray-900 font-semibold text-gray-900'
                    : 'font-medium text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Two Columns */}
        <div className="flex flex-1 gap-10">
          {/* Job List Column */}
          <div className="flex flex-1 flex-col">
            {/* Count Row */}
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm font-semibold text-blue-500">
                {filtered.length}개의 공고가 열려있어요.
              </span>
            </div>

            {/* Job Rows */}
            <div className="flex flex-col">
              {filtered.map((job) => {
                const companyName = companyMap[job.companyId] ?? '기업명';
                return (
                  <Link
                    key={job.recruitmentId}
                    href={`/recruitment/${job.recruitmentId}`}
                    className="flex items-center justify-between border-b border-gray-100 py-5 hover:bg-gray-50"
                  >
                    {/* Left */}
                    <div className="flex flex-col gap-2">
                      <span className="text-base font-semibold text-gray-900">{job.title}</span>
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-blue-500" />
                        <span className="text-[13px] font-medium text-blue-500">
                          AI 공고 분석 한 줄: 공고 분석 요약이 들어갈 자리입니다.
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-500">
                            {formatDueDate(job.dueDate)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Company Badge */}
                    <span className="shrink-0 rounded px-2 py-1 text-xs font-medium text-blue-700 bg-blue-50">
                      {companyName}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Bookmarks Column */}
          <div className="flex w-80 shrink-0 flex-col gap-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <span className="text-[15px] font-semibold text-gray-900">북마크한 공고</span>
              <Link
                href="/my/bookmark"
                className="flex items-center gap-1 text-[13px] text-gray-500 hover:text-gray-700"
              >
                전체 보기
                <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
              </Link>
            </div>

            {/* Bookmark Cards */}
            <div className="flex flex-col gap-3">
              {mockBookmarks.slice(0, 4).map((bm) => (
                <Link
                  key={bm.postId}
                  href={`/recruitment/${bm.postId}`}
                  className="flex flex-col gap-2.5 rounded-[10px] border border-gray-100 bg-gray-50 p-4 hover:bg-gray-100"
                >
                  <p className="text-sm font-medium leading-relaxed text-gray-900">
                    {bm.postTitle}
                  </p>
                  <span className="text-xs text-gray-400">{formatBookmarkDate(bm.deadline)}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
