'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Trash2, Calendar, Lightbulb, CirclePlus } from 'lucide-react';
import { mockStrategies } from '@/mocks/strategy.mock';
import type { Strategy } from '@/features/strategy/types';
import type { IndustryType } from '@/features/industry/types';
import MyNav from '@/features/user/components/MyNav';

const INDUSTRY_LABELS: Record<IndustryType, string> = {
  MEDIA_CONTENT: '미디어 / 컨텐츠',
  COMMERCE: '커머스',
  FINTECH_FINANCIAL: '핀테크 / 금융',
  MOBILITY_LOGISTICS: '모빌리티 / 물류',
  AI: '인공지능',
  HEALTHCARE_BIO: '헬스케어 / 바이오',
  MANUFACTURING_INDUSTRY: '제조업',
  OTHER: '기타',
};

type CardTheme = {
  bg: string;
  titleColor: string;
  accentColor: string;
  trashColor: string;
};

const INDUSTRY_THEMES: Record<IndustryType, CardTheme> = {
  MEDIA_CONTENT: {
    bg: '#e8f3ff',
    titleColor: '#1b64da',
    accentColor: '#4593e6',
    trashColor: '#90c2ff',
  },
  COMMERCE: {
    bg: '#e8f3ff',
    titleColor: '#1b64da',
    accentColor: '#4593e6',
    trashColor: '#90c2ff',
  },
  FINTECH_FINANCIAL: {
    bg: '#e8f4fd',
    titleColor: '#1557a0',
    accentColor: '#5a9fd4',
    trashColor: '#93c4e8',
  },
  MOBILITY_LOGISTICS: {
    bg: '#fff7ed',
    titleColor: '#92400e',
    accentColor: '#d97706',
    trashColor: '#fcd34d',
  },
  AI: {
    bg: '#edf7ee',
    titleColor: '#1a6b2a',
    accentColor: '#4aaa5c',
    trashColor: '#8ecf97',
  },
  HEALTHCARE_BIO: {
    bg: '#fce7f3',
    titleColor: '#9d174d',
    accentColor: '#ec4899',
    trashColor: '#fbcfe8',
  },
  MANUFACTURING_INDUSTRY: {
    bg: '#f1f5f9',
    titleColor: '#334155',
    accentColor: '#64748b',
    trashColor: '#94a3b8',
  },
  OTHER: {
    bg: '#f9fafb',
    titleColor: '#374151',
    accentColor: '#6b7280',
    trashColor: '#9ca3af',
  },
};

function formatCreatedDate(isoDate: string): string {
  const d = new Date(isoDate);
  const y = d.getFullYear();
  const mo = String(d.getMonth() + 1).padStart(2, '0');
  const da = String(d.getDate()).padStart(2, '0');
  const h = String(d.getHours()).padStart(2, '0');
  const mi = String(d.getMinutes()).padStart(2, '0');
  const s = String(d.getSeconds()).padStart(2, '0');
  return `${y}.${mo}.${da} ${h}:${mi}:${s} 생성`;
}

export default function StrategyPage() {
  const [strategies, setStrategies] = useState<Strategy[]>(mockStrategies);

  function handleDelete(strategyId: number) {
    setStrategies((prev) => prev.filter((s) => s.strategyId !== strategyId));
  }

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      {/* Body */}
      <div className="flex flex-1 gap-12 px-30 py-10">
        <MyNav activePath="/my/strategy" />

        {/* Right Content */}
        <div className="flex flex-1 flex-col gap-8">
          {/* Page Title */}
          <div className="flex flex-col gap-1">
            <h1 className="text-[22px] font-bold text-gray-900">포폴 전략</h1>
            <p className="text-sm text-gray-500">
              AI가 생성한 나만의 포트폴리오 전략을 확인하고 관리하세요
            </p>
          </div>

          {/* Count Row */}
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-medium text-gray-600">
              총 {strategies.length}개의 전략
            </span>
          </div>

          {/* Strategy Card Grid or Empty State */}
          {strategies.length === 0 ? (
            <div className="flex h-90 flex-col items-center justify-center gap-4 rounded-xl border border-gray-200 bg-white">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                <Lightbulb className="h-6 w-6 text-gray-400" />
              </div>
              <div className="flex flex-col items-center gap-1.5 text-center">
                <p className="text-[15px] font-semibold text-gray-900">생성된 포폴 전략이 없어요</p>
                <p className="text-[13px] text-gray-500">
                  경험과 조건을 설정해 나만의 포트폴리오 전략을 만들어 보세요
                </p>
              </div>
              <Link
                href="/strategy/create"
                className="rounded-lg bg-gray-900 px-4 py-2 text-[13px] font-semibold text-white hover:bg-gray-700"
              >
                포폴 전략 생성하기
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-5">
              {strategies.map((strategy) => {
                const theme = INDUSTRY_THEMES[strategy.industryType];
                return (
                  <div
                    key={strategy.strategyId}
                    className="overflow-hidden rounded-xl border border-gray-200 bg-white"
                  >
                    {/* Card Top */}
                    <div
                      className="flex h-30 flex-col justify-between rounded-t-xl px-5 pb-4 pt-5"
                      style={{ backgroundColor: theme.bg }}
                    >
                      <div className="flex items-start justify-between">
                        <span
                          className="text-xl font-extrabold leading-tight"
                          style={{ color: theme.titleColor }}
                        >
                          {INDUSTRY_LABELS[strategy.industryType]}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDelete(strategy.strategyId)}
                          aria-label="전략 삭제"
                          className="mt-0.5 shrink-0"
                        >
                          <Trash2 className="h-3.75 w-3.75" style={{ color: theme.trashColor }} />
                        </button>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3 w-3" style={{ color: theme.accentColor }} />
                        <span className="text-xs" style={{ color: theme.accentColor }}>
                          {formatCreatedDate(strategy.createdDate)}
                        </span>
                      </div>
                    </div>

                    {/* Card Bottom */}
                    <div className="flex h-11 items-center justify-center px-4">
                      <Link
                        href={`/strategy/result/${strategy.strategyId}`}
                        className="flex w-full items-center justify-center rounded-lg py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50"
                      >
                        보기
                      </Link>
                    </div>
                  </div>
                );
              })}

              {/* Add Strategy Button */}
              <Link
                href="/strategy/create"
                className="flex h-41.25 flex-col items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50"
              >
                <CirclePlus className="h-4.5 w-4.5 text-gray-500" />
                <span className="text-sm font-semibold text-gray-600">포폴 전략 생성</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
