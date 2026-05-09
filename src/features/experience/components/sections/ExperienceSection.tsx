'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import ExperienceAddButton from '@/features/experience/components/ui/ExperienceAddButton';
import ExperienceEmpty from '@/features/experience/components/ui/ExperienceEmpty';
import ExperienceExtractBanner from '@/features/experience/components/ui/ExperienceExtractBanner';
import { Experience } from '@/features/experience/types';
import ExperienceExtractDialog from '@/features/experience/components/ui/ExperienceExtractDialog';
import { useGetExperienceList } from '@/features/experience/queries';
import { useFiles } from '@/features/file/queries';
import { useExperienceExtractionStore } from '@/features/experience/stores/useExperienceExtractionStore';
import { getExtractedExperience } from '@/features/experience/actions';
import ExperienceDetailDialog from '@/features/experience/components/ui/ExperienceDetailDialog';
import ExperienceItemWrapper from '@/features/experience/components/ui/ExperienceItemWrapper';
import ExperienceListItemSkeleton from '@/features/experience/components/ui/ExperienceListItemSkeleton';

export default function ExperienceSection() {
  const { data: filesData } = useFiles();

  const { data: experienceData, isLoading } = useGetExperienceList();

  const files = filesData?.contents ?? [];

  const experienceList = useMemo(() => {
    return experienceData?.contents ?? [];
  }, [experienceData?.contents]);

  const [clientExperienceList, setClientExperienceList] = useState<Experience[]>([]);

  const completedExtractionIds = useExperienceExtractionStore(
    (state) => state.completedExtractionIds,
  );
  const removeCompletedExtractionIds = useExperienceExtractionStore(
    (state) => state.removeCompletedExtractionIds,
  );

  useEffect(() => {
    setClientExperienceList((prev) => {
      const tempItems = prev.filter((item) => item.experienceId < 0);
      return [...tempItems, ...experienceList];
    });
  }, [experienceList]);

  useEffect(() => {
    if (completedExtractionIds.length === 0) return;

    const idsToFetch = [...completedExtractionIds];

    removeCompletedExtractionIds(idsToFetch);

    const fetchAndAppend = async () => {
      const results = await Promise.allSettled(
        idsToFetch.map((id) => getExtractedExperience(id).then((res) => ({ id, res }))),
      );

      const newExperiences: Experience[] = [];
      let tempIdSeed = Date.now();

      for (const result of results) {
        if (result.status !== 'fulfilled' || !result.value.res.success) {
          continue;
        }

        result.value.res.data.contents.forEach((draft) => {
          newExperiences.push({ ...draft, experienceId: -tempIdSeed++, isAiGenerated: true });
        });
      }

      if (newExperiences.length === 0) return;

      setClientExperienceList((prev) => [...newExperiences, ...prev]);
    };

    fetchAndAppend();
  }, [completedExtractionIds, removeCompletedExtractionIds]);

  // 새로운 빈 카드 추가
  const handleAddCard = () => {
    const tempId = Date.now() * -1;
    const newExperience: Experience = {
      experienceId: tempId,
      title: '',
      experienceType: 'PROJECT',
      startDate: '',
      endDate: '',
      experienceContent: '',
    };
    setClientExperienceList((prev) => [newExperience, ...prev]);
  };

  const handleUpdateExperience = (targetId: number, updatedData: Experience) => {
    setClientExperienceList((prev) =>
      prev.map((exp) =>
        exp.experienceId === targetId ? { ...updatedData, isAiGenerated: exp.isAiGenerated } : exp,
      ),
    );
  };

  const handleDeleteExperience = useCallback((targetId: number) => {
    setClientExperienceList((prev) => prev.filter((exp) => exp.experienceId !== targetId));
  }, []);

  return (
    <>
      {/* TODO: 경험 추출 availability API 추가 후 사용 횟수 UI 연결 */}
      {/* 경험 추출 배너 */}
      <ExperienceExtractBanner />

      {/* 경험 개수 표시 */}
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-medium text-gray-600">
          총 {clientExperienceList.length}개의 경험
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => <ExperienceListItemSkeleton key={i} />)
        ) : clientExperienceList.length === 0 ? (
          <ExperienceEmpty onAddCard={handleAddCard} />
        ) : (
          <>
            <ExperienceAddButton onAddCard={handleAddCard} />
            {clientExperienceList.map((exp) => (
              <ExperienceItemWrapper
                key={exp.experienceId}
                experienceId={exp.experienceId}
                defaultExperience={exp}
                defaultEditMode={exp.experienceId < 0}
                isAiGenerated={exp.isAiGenerated ?? false}
                onUpdateSuccess={handleUpdateExperience}
                onDeleteSuccess={handleDeleteExperience}
              />
            ))}
          </>
        )}
      </div>
      <ExperienceExtractDialog files={files} />
      <ExperienceDetailDialog />
    </>
  );
}
