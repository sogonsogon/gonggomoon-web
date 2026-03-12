'use client';

import { INDUSTRY_LABEL_MAP } from '@/features/industry/constants/industryOptions';
import { Strategy, StrategyIndustryType } from '@/features/strategy/types';
import { formatCreatedDate } from '@/shared/utils/formatCreatedDate';
import { Button } from '@/shared/components/ui/button';
import { CalendarIcon, Trash2Icon } from 'lucide-react';
import Link from 'next/link';

interface MyStrategyCardProps {
  strategy: Strategy;
}

export default function MyStrategyCard({ strategy }: MyStrategyCardProps) {
  const theme = INDUSTRY_THEMES[strategy.industryType ?? 'MASTER'];

  const handleDeleteStrategy = async () => {
    // TODO: 포폴 전략 삭제 API 호출
  };

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
        <div className="flex items-center justify-between">
          <span
            className="text-xl font-extrabold leading-tight"
            style={{ color: theme.titleColor }}
          >
            {strategy.industryType
              ? INDUSTRY_LABEL_MAP[strategy.industryType]
              : '마스터 포트폴리오'}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={handleDeleteStrategy}
            aria-label="전략 삭제"
            className="mt-0.5 shrink-0 text-gray-400 hover:bg-transparent hover:text-red-500"
          >
            <Trash2Icon className="h-3.75 w-3.75" />
          </Button>
        </div>
        <div className="flex items-center gap-1.5">
          <CalendarIcon className="h-3 w-3" style={{ color: theme.accentColor }} />
          <span className="text-xs" style={{ color: theme.accentColor }}>
            {formatCreatedDate(strategy.createdAt)}
          </span>
        </div>
      </div>

      {/* Card Bottom */}
      <Link
        href={`/strategy/result/${strategy.strategyId}`}
        className="flex w-full h-9 items-center justify-center rounded-lg py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50"
      >
        보기
      </Link>
    </div>
  );
}

type StrategyCardTheme = {
  bg: string;
  titleColor: string;
  accentColor: string;
};

const INDUSTRY_THEMES: Record<StrategyIndustryType, StrategyCardTheme> = {
  MEDIA_CONTENT: {
    bg: '#e8f3ff',
    titleColor: '#1b64da',
    accentColor: '#4593e6',
  },
  COMMERCE: {
    bg: '#e8f3ff',
    titleColor: '#1b64da',
    accentColor: '#4593e6',
  },
  FINTECH_FINANCIAL: {
    bg: '#e8f4fd',
    titleColor: '#1557a0',
    accentColor: '#5a9fd4',
  },
  MOBILITY_LOGISTICS: {
    bg: '#fff7ed',
    titleColor: '#92400e',
    accentColor: '#d97706',
  },
  AI: {
    bg: '#edf7ee',
    titleColor: '#1a6b2a',
    accentColor: '#4aaa5c',
  },
  HEALTHCARE_BIO: {
    bg: '#fce7f3',
    titleColor: '#9d174d',
    accentColor: '#ec4899',
  },
  MANUFACTURING_INDUSTRY: {
    bg: '#f1f5f9',
    titleColor: '#334155',
    accentColor: '#64748b',
  },
  MASTER: {
    bg: '#f9fafb',
    titleColor: '#374151',
    accentColor: '#6b7280',
  },
};
