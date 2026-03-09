import { Check, ChevronRight } from 'lucide-react';
import type { Experience } from '@/features/experience/types';
import { EXPERIENCE_LABEL_MAP } from '@/features/experience/constants/experienceOptions';
import { formatHistoryDate } from '@/shared/utils/formatHistoryDate';
import {
  EXP_BADGE_CHECKED,
  EXP_BADGE_UNCHECKED,
} from '@/features/experience/constants/experienceBadgeStyles';

interface StrategyExperienceListItemProps {
  experience: Experience;
  checked: boolean;
  onToggle: (id: number) => void;
  onDetailClick: (experience: Experience) => void;
}

export default function StrategyExperienceListItem({
  experience,
  checked,
  onToggle,
  onDetailClick,
}: StrategyExperienceListItemProps) {
  function handleToggle() {
    onToggle(experience.id);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={checked}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      className={`flex cursor-pointer items-center gap-3 rounded-[10px] border px-4 py-3.5 transition-colors ${
        checked ? 'border-blue-100 bg-blue-50' : 'border-gray-200 bg-white hover:bg-gray-50'
      }`}
    >
      <div
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded ${
          checked ? 'bg-[#2272eb]' : 'border-[1.5px] border-gray-300 bg-white'
        }`}
      >
        {checked && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
      </div>

      <span
        className={`inline-flex h-6 shrink-0 items-center rounded-full px-2 py-0 text-[11px] leading-none font-semibold ${
          checked ? EXP_BADGE_CHECKED[experience.experienceType] : EXP_BADGE_UNCHECKED
        }`}
      >
        {EXPERIENCE_LABEL_MAP[experience.experienceType]}
      </span>

      <div className="min-w-0 flex flex-1 flex-col justify-center gap-0.5">
        <span
          className={`truncate text-[13px] font-semibold ${
            checked ? 'text-gray-900' : 'text-gray-700'
          }`}
        >
          {experience.title}
        </span>
        <span className={`text-[12px] ${checked ? 'text-gray-500' : 'text-gray-400'}`}>
          {formatHistoryDate(experience.startDate)}
          {experience.endDate ? ` – ${formatHistoryDate(experience.endDate)}` : ' – 현재'}
        </span>
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onDetailClick(experience);
        }}
        className={`inline-flex h-8 shrink-0 cursor-pointer items-center gap-1 rounded-md border px-2.5 text-[11px] leading-none font-medium ${
          checked
            ? 'border-[#90c2ff] text-[#2272eb] hover:bg-blue-100'
            : 'border-gray-200 text-gray-500 hover:bg-gray-50'
        }`}
      >
        상세보기
        <ChevronRight className={`h-3 w-3 ${checked ? 'text-[#4593e6]' : 'text-gray-400'}`} />
      </button>
    </div>
  );
}
