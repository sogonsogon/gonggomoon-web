import { useRef, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Experience } from '@/features/experience/types';
import { useDeleteExperience } from '@/features/experience/queries';
import ExperienceDeleteDialog from '@/features/experience/components/ui/ExperienceDeleteDialog';
import ExperienceEditWrapper from '@/features/experience/components/ui/ExperienceEditWrapper';
import ExperienceListItem from '@/features/experience/components/ui/ExperienceListItem';

interface ExperienceItemWrapperProps {
  experienceId: number;
  defaultExperience: Experience;
  defaultEditMode?: boolean;
  isAiGenerated?: boolean;
  onUpdateSuccess: (targetId: number, updatedData: Experience) => void;
  onDeleteSuccess: (targetId: number) => void;
}

export default function ExperienceItemWrapper({
  experienceId,
  defaultExperience,
  defaultEditMode = false,
  isAiGenerated = false,
  onUpdateSuccess,
  onDeleteSuccess,
}: ExperienceItemWrapperProps) {
  const isNew = useRef(defaultEditMode).current;
  const [isEditing, setIsEditing] = useState(isNew);
  const [isShow, setIsShow] = useState(!isNew);
  const [isExiting, setIsExiting] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

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
    } else {
      deleteExperience(experienceId, {
        onSuccess: () => {
          toast.success('경험이 삭제되었습니다.');
          setIsExiting(true);
          onDeleteSuccess(experienceId);
        },
      });
    }
  };

  return (
    <div
      className={`overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 ${
        isExiting
          ? 'ease-in -translate-y-5 opacity-0'
          : isNew
            ? `ease-out ${isShow ? 'translate-y-0 opacity-100' : '-translate-y-5 opacity-0'}`
            : 'ease-out'
      }`}
    >
      {isEditing ? (
        <ExperienceEditWrapper
          experienceId={experienceId}
          isNew={isNew}
          isAiGenerated={isAiGenerated}
          defaultExperience={defaultExperience}
          onUpdateSuccess={onUpdateSuccess}
          onDeleteSuccess={onDeleteSuccess}
          onDeleteDialogOpen={setIsDeleteDialogOpen}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <ExperienceListItem
          experience={defaultExperience}
          onEdit={() => setIsEditing(true)}
          onDeleteOpen={setIsDeleteDialogOpen}
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
