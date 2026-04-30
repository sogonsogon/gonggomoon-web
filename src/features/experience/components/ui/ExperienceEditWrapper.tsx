import { useGetExperience } from '@/features/experience/queries';
import { Experience } from '@/features/experience/types';
import ExperienceEditForm from '@/features/experience/components/ui/ExperienceEditForm';
import ExperienceEditSkeleton from '@/features/experience/components/ui/ExperienceEditSkeleton';

interface ExperienceEditWrapperProps {
  experienceId: number;
  isNew: boolean;
  isAiGenerated?: boolean;
  defaultExperience?: Experience;
  onUpdateSuccess: (targetId: number, updatedData: Experience) => void;
  onDeleteSuccess: (targetId: number) => void;
  onDeleteDialogOpen: (next: boolean) => void;
  onCancel: () => void;
}

export default function ExperienceEditWrapper({
  experienceId,
  isNew,
  isAiGenerated,
  defaultExperience,
  ...props
}: ExperienceEditWrapperProps) {
  const { data: experience, isLoading } = useGetExperience(experienceId, {
    enabled: !isNew && experienceId > 0,
  });

  if (!isNew && isLoading) return <ExperienceEditSkeleton />;

  return (
    <ExperienceEditForm
      experience={experience ?? defaultExperience!}
      isAiGenerated={isAiGenerated}
      {...props}
    />
  );
}
