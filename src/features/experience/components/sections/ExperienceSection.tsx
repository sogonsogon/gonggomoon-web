'use client';

import { useCallback, useEffect, useState } from 'react';
import ExperienceAddButton from '@/features/experience/components/ui/ExperienceAddButton';
import ExperienceCard from '@/features/experience/components/ui/ExperienceCard';
import ExperienceEmpty from '@/features/experience/components/ui/ExperienceEmpty';
import ExperienceExtractBanner from '@/features/experience/components/ui/ExperienceExtractBanner';
import { Experience } from '@/features/experience/types';
import ExperienceExtractDialog from '@/features/experience/components/ui/ExperienceExtractDialog';
import { useGetExperienceList } from '@/features/experience/queries';
import { useFiles } from '@/features/file/queries';
import { useExperienceExtractionStore } from '@/features/experience/stores/useExperienceExtractionStore';
import { getExtractedExperience } from '@/features/experience/actions';

export default function ExperienceSection() {
  const { data: filesData } = useFiles();
  const { data: experienceData } = useGetExperienceList();
  const files = filesData?.contents ?? [];
  const experienceList = experienceData?.contents ?? [];

  const [clientExperienceList, setClientExperienceList] = useState<Experience[]>(experienceList);

  const completedExtractionIds = useExperienceExtractionStore(
    (state) => state.completedExtractionIds,
  );
  const removeCompletedExtractionId = useExperienceExtractionStore(
    (state) => state.removeCompletedExtractionId,
  );

  // 완료된 추출 ID 감지 → 상세 조회 → 카드 추가
  // 조회 성공한 ID만 소비 (원자적 처리): 실패한 ID는 store에 유지되어 재시도 가능
  useEffect(() => {
    if (completedExtractionIds.length === 0) return;

    // 현재 사이클의 ID를 스냅샷으로 캡처
    const idsToFetch = [...completedExtractionIds];

    const fetchAndAppend = async () => {
      const results = await Promise.allSettled(
        idsToFetch.map((id) => getExtractedExperience(id).then((res) => ({ id, res }))),
      );

      const newExperiences: Experience[] = [];
      let tempIdSeed = Date.now();

      for (const result of results) {
        if (result.status !== 'fulfilled' || !result.value.res.success) continue;

        // 조회 성공 시에만 해당 ID를 store에서 제거
        removeCompletedExtractionId(result.value.id);

        result.value.res.data.contents.forEach((draft) => {
          newExperiences.push({ ...draft, experienceId: -tempIdSeed++, isAiGenerated: true });
        });
      }

      if (newExperiences.length === 0) return;

      setClientExperienceList((prev) => [...newExperiences, ...prev]);
    };

    fetchAndAppend();
  }, [completedExtractionIds, removeCompletedExtractionId]);

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
      {/* 경험 추출 배너 */}
      <ExperienceExtractBanner />

      {/* 경험 개수 표시 */}
      <div className="mb-4 flex items-center justify-between">
        <span className="text-[13px] font-medium text-gray-600">
          총 {clientExperienceList.length}개의 경험
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {clientExperienceList.length === 0 ? (
          <ExperienceEmpty onAddCard={handleAddCard} />
        ) : (
          <>
            {/* 경험 추가 버튼 */}
            <ExperienceAddButton onAddCard={handleAddCard} />

            {/* 경험 리스트 */}
            {clientExperienceList.map((exp) => (
              <ExperienceCard
                key={exp.experienceId}
                experienceId={exp.experienceId}
                defaultEditMode={exp.experienceId < 0}
                prefillData={exp.experienceId < 0 ? exp : undefined}
                isAiGenerated={exp.isAiGenerated ?? false}
                onUpdateSuccess={handleUpdateExperience}
                onDeleteSuccess={handleDeleteExperience}
              />
            ))}
          </>
        )}
      </div>
      <ExperienceExtractDialog files={files} />
    </>
  );
}
