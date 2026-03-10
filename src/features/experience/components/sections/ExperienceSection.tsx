'use client';

import { useState } from 'react';
import ExperienceAddButton from '@/features/experience/components/ui/ExperienceAddButton';
import ExperienceCard from '@/features/experience/components/ui/ExperienceCard';
import ExperienceEmpty from '@/features/experience/components/ui/ExperienceEmpty';
import ExperienceExtractBanner from '@/features/experience/components/ui/ExperienceExtractBanner';
import { Experience } from '@/features/experience/types';
import { File } from '@/features/file/types';
import ExperienceExtractDialog from '@/features/experience/components/ui/ExperienceExtractDialog';

interface ExperienceSectionProps {
  initialExperiences: Experience[];
  files: File[];
}

export default function ExperienceSection({ initialExperiences, files }: ExperienceSectionProps) {
  const [experiences, setExperiences] = useState<Experience[]>(initialExperiences);

  // 새로운 빈 카드 추가
  const handleAddCard = () => {
    const tempId = Date.now() * -1; // 부호로 생성/수정 판단
    const newExperience: Experience = {
      id: tempId,
      title: '',
      experienceType: 'PROJECT',
      startDate: '',
      endDate: '',
      experienceContent: '',
    };

    setExperiences((prev) => [newExperience, ...prev]);
  };

  const handleAddExtractions = (extractions: Experience[]) => {
    // TODO: 경험 추출 완료 조회
  };

  // 카드 정보 업데이트 (수정 또는 신규 저장 완료 시)
  const handleUpdateExperience = (targetId: number, updatedData: Experience) => {
    setExperiences((prev) => prev.map((exp) => (exp.id === targetId ? updatedData : exp)));
  };

  // 카드 삭제
  const handleDeleteExperience = (targetId: number) => {
    setExperiences((prev) => prev.filter((exp) => exp.id !== targetId));
  };

  return (
    <>
      {/* 경험 추출 배너 */}
      <ExperienceExtractBanner />

      {/* 경험 개수 표시 */}
      <div className="mb-4 flex items-center justify-between">
        <span className="text-[13px] font-medium text-gray-600">
          총 {experiences.length}개의 경험
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {experiences.length === 0 ? (
          <ExperienceEmpty onAddCard={handleAddCard} />
        ) : (
          <>
            {/* 경험 추가 버튼 */}
            <ExperienceAddButton onAddCard={handleAddCard} />

            {/* 경험 리스트 */}
            {experiences.map((exp) => (
              <ExperienceCard
                key={exp.id}
                experience={exp}
                defaultEditMode={exp.id < 0}
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
