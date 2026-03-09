import Link from 'next/link';
import { Briefcase, ExternalLink } from 'lucide-react';
import type { Experience } from '@/features/experience/types';
import StrategyExperienceListItem from '@/features/strategy/components/ui/StrategyExperienceListItem';

interface StrategyExperienceSelectionSectionProps {
  experiences: Experience[];
  selectedExpIds: Set<number>;
  onToggleExp: (id: number) => void;
  onToggleAllExp: () => void;
  onDetailClick: (experience: Experience) => void;
}

export default function StrategyExperienceSelectionSection({
  experiences,
  selectedExpIds,
  onToggleExp,
  onToggleAllExp,
  onDetailClick,
}: StrategyExperienceSelectionSectionProps) {
  const allSelected = experiences.length > 0 && selectedExpIds.size === experiences.length;

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <span className="text-base font-bold text-gray-900">내 경험 선택</span>
          <span className="text-[12px] text-gray-400">
            포트폴리오에 포함할 경험을 선택하세요 (기본: 전체 선택)
          </span>
        </div>

        <div className="flex items-center gap-2">
          {experiences.length > 0 && (
            <button
              type="button"
              onClick={onToggleAllExp}
              className="inline-flex h-8 cursor-pointer items-center rounded-md px-2.5 text-[12px] font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            >
              {allSelected ? '전체 해제' : '전체 선택'}
            </button>
          )}

          <Link
            href="/my/experience"
            className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 text-[12px] font-medium text-gray-600 hover:bg-gray-50"
          >
            <ExternalLink className="h-3 w-3 text-gray-500" />
            경험 등록하기
          </Link>
        </div>
      </div>

      {experiences.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-20">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
            <Briefcase className="h-6 w-6 text-gray-400" />
          </div>

          <div className="flex flex-col items-center gap-1.5 text-center">
            <p className="text-[15px] font-semibold text-gray-900">등록된 경험이 없어요</p>
            <p className="text-[13px] text-gray-500">
              나의 경험을 먼저 등록하고 포트폴리오 전략을 생성하세요
            </p>
          </div>

          <Link
            href="/my/experience"
            className="rounded-lg bg-gray-900 px-4 py-2 text-[13px] font-semibold text-white hover:bg-gray-700"
          >
            경험 등록하기
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {experiences.map((experience) => (
            <StrategyExperienceListItem
              key={experience.id}
              experience={experience}
              checked={selectedExpIds.has(experience.id)}
              onToggle={onToggleExp}
              onDetailClick={onDetailClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}
