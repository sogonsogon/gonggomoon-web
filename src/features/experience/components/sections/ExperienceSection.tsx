'use client';

import { useState } from 'react';
import ExperienceAddButton from '@/features/experience/components/ui/ExperienceAddButton';
import ExperienceCard from '@/features/experience/components/ui/ExperienceCard';
import ExperienceEmpty from '@/features/experience/components/ui/ExperienceEmpty';
import ExperienceExtractBanner from '@/features/experience/components/ui/ExperienceExtractBanner';
import { Experience } from '@/features/experience/types';
import ExperienceExtractDialog from '@/features/experience/components/ui/ExperienceExtractDialog';
import { useFiles } from '@/features/file/queries';
import { useGetExperienceList } from '@/features/experience/queries';

export default function ExperienceSection() {
  const { data: filesData } = useFiles();
  const { data: experienceData } = useGetExperienceList();
  const files = filesData?.contents ?? [];
  const experienceList = experienceData?.contents ?? [];

  const [clientExperienceList, setClientExperienceList] = useState<Experience[]>(experienceList);

  // 새로운 빈 카드 추가
  const handleAddCard = () => {
    const tempId = Date.now() * -1; // 부호로 생성/수정 판단
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

  const handleAddExtractions = (extractions: Experience[]) => {
    // TODO: 경험 추출 완료 조회
  };

  const handleUpdateExperience = (targetId: number, updatedData: Experience) => {
    setClientExperienceList((prev) =>
      prev.map((exp) => (exp.experienceId === targetId ? updatedData : exp)),
    );
  };

  // 카드 삭제
  const handleDeleteExperience = (targetId: number) => {
    setClientExperienceList((prev) => prev.filter((exp) => exp.experienceId !== targetId));
  };

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
