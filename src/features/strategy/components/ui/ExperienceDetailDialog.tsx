import { Calendar } from 'lucide-react';
import type { Experience } from '@/features/experience/types';
import { EXPERIENCE_LABEL_MAP } from '@/features/experience/constants/experienceOptions';
import { formatHistoryDate } from '@/shared/utils/formatHistoryDate';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/components/ui/dialog';
import { EXP_BADGE_CHECKED } from '@/features/experience/constants/experienceBadgeStyles';

interface ExperienceDetailDialogProps {
  experience: Experience | null;
  onClose: () => void;
}

export default function ExperienceDetailDialog({
  experience,
  onClose,
}: ExperienceDetailDialogProps) {
  return (
    <Dialog open={!!experience} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[80svh] max-w-125 gap-0 overflow-hidden p-0 [&>button]:cursor-pointer">
        {experience && (
          <>
            <DialogHeader className="gap-0 border-b border-gray-100 px-6 pb-5 pt-6 text-left">
              <div className="mb-3 flex items-center gap-2">
                <span
                  className={`inline-flex h-6 items-center rounded-full px-2.5 text-[12px] leading-none font-semibold ${
                    EXP_BADGE_CHECKED[experience.experienceType]
                  }`}
                >
                  {EXPERIENCE_LABEL_MAP[experience.experienceType]}
                </span>
              </div>

              <DialogTitle className="text-[20px] font-bold leading-[1.4] text-gray-900">
                {experience.title}
              </DialogTitle>

              <div className="mt-2 flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                <span className="text-[13px] leading-none text-gray-400">
                  {formatHistoryDate(experience.startDate)}
                  {experience.endDate ? ` – ${formatHistoryDate(experience.endDate)}` : ' – 현재'}
                </span>
              </div>
            </DialogHeader>

            <div className="min-h-0 overflow-y-auto p-6">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-[14px] font-semibold text-gray-900">경험 내용</span>
                </div>

                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <p className="whitespace-pre-wrap wrap-break-word text-[14px] leading-[1.7] text-gray-700">
                    {experience.experienceContent ?? '경험 내용이 없습니다.'}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
