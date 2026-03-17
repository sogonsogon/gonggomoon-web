'use client';

import { useEffect, useRef, useState } from 'react';
import { useDeleteExperience, useGetExperience } from '@/features/experience/queries';
import { Experience } from '@/features/experience/types';
import ExperienceCardSkeleton from '@/features/experience/components/ui/ExperienceCardSkeleton';
import ExperienceCardForm from '@/features/experience/components/ui/ExperienceCardForm';
import ExperienceDeleteDialog from '@/features/experience/components/ui/ExperienceDeleteDialog';
import { toast } from 'sonner';

interface ExperienceCardProps {
  experienceId: number;
  defaultEditMode?: boolean;
  prefillData?: Experience;
  isAiGenerated?: boolean;
  onUpdateSuccess: (targetId: number, updatedData: Experience) => void;
  onDeleteSuccess: (targetId: number) => void;
}
export default function ExperienceCard({
  experienceId,
  defaultEditMode = false,
  prefillData,
  isAiGenerated = false,
  onUpdateSuccess,
  onDeleteSuccess,
}: ExperienceCardProps) {
  const isNew = useRef(defaultEditMode).current;
  // 카드 생성 애니메이션
  const [isShow, setIsShow] = useState(!isNew);
  // 카드 삭제 애니메이션
  const [isExiting, setIsExiting] = useState(false);
  // 삭제 다이얼로그
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { data: experience, isLoading } = useGetExperience(experienceId);
  const { mutate: deleteExperience } = useDeleteExperience();

  useEffect(() => {
    if (!isNew) return;
    const raf = requestAnimationFrame(() => setIsShow(true));
    return () => cancelAnimationFrame(raf);
  }, [isNew]);

  const handleDelete = () => {
    if (experienceId < 0) {
      setIsExiting(true);
      onDeleteSuccess(experienceId);
      return;
    } else {
      deleteExperience(experienceId, {
        onSuccess: () => {
          toast.success('경험이 삭제되었습니다.');
          setIsExiting(true);
          onDeleteSuccess(experienceId);
        },
        onError: (error) => {
          toast.error(error.message || '경험 삭제에 실패했습니다.');
        },
      });
    }
  };

  return (
    // 애니메이션 처리
    <div
      className={`overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 ${
        isExiting
          ? 'ease-in -translate-y-5 opacity-0'
          : isNew
            ? `ease-out ${isShow ? 'translate-y-0 opacity-100' : '-translate-y-5 opacity-0'}`
            : 'ease-out'
      }`}
    >
      {!isNew && isLoading ? (
        <ExperienceCardSkeleton />
      ) : (
        <ExperienceCardForm
          experience={
            prefillData ??
            experience ?? {
              experienceId,
              title: '',
              experienceType: 'PROJECT',
              startDate: '',
              endDate: '',
              experienceContent: '',
            }
          }
          isNew={isNew}
          isAiGenerated={isAiGenerated}
          onUpdateSuccess={onUpdateSuccess}
          onDeleteSuccess={onDeleteSuccess}
          onDeleteDialogOpen={setIsDeleteDialogOpen}
        />
      )}
      <ExperienceDeleteDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDelete}
      />
    </div>
  );
}
