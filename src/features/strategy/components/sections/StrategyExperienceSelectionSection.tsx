'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Briefcase, ExternalLink } from 'lucide-react';
import type { Experience } from '@/features/experience/types';
import StrategyExperienceListItem from '@/features/strategy/components/ui/StrategyExperienceListItem';
import ExperienceDetailDialog from '@/features/strategy/components/ui/ExperienceDetailDialog';
import { useStrategyGenerationStore } from '@/features/strategy/stores/useStrategyGenerationStore';
import { useStrategyCreateFormStore } from '@/features/strategy/stores/useCreateStrategyFormStore';
import { useGetExperienceList } from '@/features/experience/queries';

export default function StrategyExperienceSelectionSection() {
  const { data: experienceData } = useGetExperienceList();
  const [detailExp, setDetailExp] = useState<Experience | null>(null);

  const experienceList = useMemo(() => experienceData?.contents ?? [], [experienceData?.contents]);

  const formData = useStrategyCreateFormStore((state) => state.formData);
  const updateFormData = useStrategyCreateFormStore((state) => state.updateFormData);
  const initializeSelectedExperienceIds = useStrategyCreateFormStore(
    (state) => state.initializeSelectedExperienceIds,
  );

  const submitLoading = useStrategyGenerationStore((state) => state.submitLoading);

  const isFormLocked = submitLoading;

  useEffect(() => {
    initializeSelectedExperienceIds(experienceList.map((experience) => experience.experienceId));
  }, [experienceList, initializeSelectedExperienceIds]);

  const handleToggleExp = (id: number) => {
    if (isFormLocked) return;

    const newExperienceIds = new Set(formData.selectedExperienceIds);

    if (newExperienceIds.has(id)) {
      newExperienceIds.delete(id);
    } else {
      newExperienceIds.add(id);
    }

    updateFormData('selectedExperienceIds', Array.from(newExperienceIds));
  };

  const handleToggleAllExp = () => {
    if (isFormLocked) return;

    const newExperienceIds =
      formData.selectedExperienceIds.length === experienceList.length
        ? []
        : experienceList.map((experience) => experience.experienceId);

    updateFormData('selectedExperienceIds', newExperienceIds);
  };

  const allSelected =
    experienceList.length > 0 && formData.selectedExperienceIds.length === experienceList.length;

  return (
    <>
      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <div className="flex items-center justify-between max-md:flex-col max-md:items-start max-md:gap-2.5">
          <div className="flex flex-col gap-0.5">
            <span className="text-base font-bold text-gray-900">내 경험 선택</span>
            <span className="text-[12px] text-gray-400">
              포트폴리오에 포함할 경험을 선택하세요 (기본: 전체 선택)
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-2 max-md:w-full max-md:justify-between">
            {experienceList.length > 0 && (
              <button
                type="button"
                onClick={handleToggleAllExp}
                disabled={isFormLocked}
                className="inline-flex h-8 cursor-pointer items-center whitespace-nowrap rounded-md px-2.5 text-[12px] font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-gray-500 max-md:px-2"
              >
                {allSelected ? '전체 해제' : '전체 선택'}
              </button>
            )}

            <Link
              href="/resource/experience"
              className="inline-flex h-8 items-center gap-1.5 whitespace-nowrap rounded-lg border border-gray-300 bg-white px-3 text-[12px] font-medium text-gray-600 hover:bg-gray-50"
            >
              <ExternalLink className="h-3 w-3 shrink-0 text-gray-500" />
              경험 등록하기
            </Link>
          </div>
        </div>

        {experienceList.length === 0 ? (
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
              href="/resource/experience"
              className="rounded-lg bg-gray-900 px-4 py-2 text-[13px] font-semibold text-white hover:bg-gray-700"
            >
              경험 등록하기
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            {experienceList.map((experience) => (
              <StrategyExperienceListItem
                key={experience.experienceId}
                experience={experience}
                checked={formData.selectedExperienceIds.includes(experience.experienceId)}
                onToggle={handleToggleExp}
                onDetailClick={setDetailExp}
                disabled={isFormLocked}
              />
            ))}
          </div>
        )}
      </div>

      <ExperienceDetailDialog experience={detailExp} onClose={() => setDetailExp(null)} />
    </>
  );
}
