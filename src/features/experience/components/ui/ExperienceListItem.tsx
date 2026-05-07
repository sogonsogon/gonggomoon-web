import { PencilIcon, Trash2Icon } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Experience } from '@/features/experience/types';
import { EXP_BADGE_CHECKED } from '@/features/experience/constants/experienceBadgeStyles';
import { EXP_TYPE_LABELS } from '@/features/experience/constants/experienceLabels';
import { toDisplayDate } from '@/features/experience/utils/toDisplayDate';
import { useExperienceDetailDialog } from '@/features/experience/stores/useExperienceDetailDialog';

interface ExperienceListItemProps {
  experience: Experience;
  onEdit: () => void;
  onDeleteOpen: (next: boolean) => void;
}

export default function ExperienceListItem({
  experience,
  onEdit,
  onDeleteOpen,
}: ExperienceListItemProps) {
  const { openDialog } = useExperienceDetailDialog();

  return (
    <div
      className="flex items-center justify-between gap-3 px-5 py-3.5 cursor-pointer"
      onClick={() => {
        openDialog(experience);
      }}
    >
      <div className="flex flex-1 items-center gap-2.5 overflow-hidden">
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${EXP_BADGE_CHECKED[experience.experienceType]}`}
        >
          {EXP_TYPE_LABELS[experience.experienceType]}
        </span>
        <div className="flex flex-1 items-baseline gap-2">
          <span className="truncate text-[15px] font-semibold text-gray-900">
            {experience.title}
          </span>
          <span className="shrink-0 text-[13px] text-gray-400">
            {experience.startDate ? toDisplayDate(experience.startDate) : ''}
            {experience.endDate
              ? ` – ${toDisplayDate(experience.endDate)}`
              : experience.startDate
                ? ' – 현재'
                : ''}
          </span>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-1">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="text-gray-400 hover:bg-gray-100 hover:text-gray-600"
        >
          <PencilIcon className="h-3.75 w-3.75" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            onDeleteOpen(true);
          }}
          className="text-gray-400 hover:bg-red-50 hover:text-red-500"
        >
          <Trash2Icon className="h-3.75 w-3.75" />
        </Button>
      </div>
    </div>
  );
}
