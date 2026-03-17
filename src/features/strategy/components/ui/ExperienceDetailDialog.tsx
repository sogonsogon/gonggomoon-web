import { Calendar, X } from 'lucide-react';
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
      <DialogContent
        aria-describedby={undefined}
        showCloseButton={false}
        className="max-h-[80svh] max-w-125 gap-0 overflow-hidden p-0 max-md:top-auto max-md:left-1/2 max-md:bottom-[calc(env(safe-area-inset-bottom)+0.5rem)] max-md:w-[calc(100%-1rem)] max-md:max-w-none max-md:-translate-x-1/2 max-md:translate-y-0 max-md:rounded-2xl max-md:max-h-[68dvh]"
      >
        {experience && (
          <>
            <DialogHeader className="gap-0 border-b border-gray-100 px-6 pb-4 pt-5 text-left max-md:px-4 max-md:pb-3 max-md:pt-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <span
                    className={`mb-2 inline-flex h-6 items-center rounded-full px-2.5 text-[12px] leading-none font-semibold ${
                      EXP_BADGE_CHECKED[experience.experienceType]
                    }`}
                  >
                    {EXPERIENCE_LABEL_MAP[experience.experienceType]}
                  </span>

                  <DialogTitle className="text-[20px] font-bold leading-[1.35] text-gray-900 max-md:text-[18px]">
                    {experience.title}
                  </DialogTitle>

                  <div className="mt-1.5 flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                    <span className="text-[13px] leading-none text-gray-400">
                      {formatHistoryDate(experience.startDate)}
                      {experience.endDate
                        ? ` – ${formatHistoryDate(experience.endDate)}`
                        : ' – 현재'}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-md p-1.5 text-gray-400 transition hover:bg-gray-50 hover:text-gray-600"
                  aria-label="닫기"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </DialogHeader>

            <div className="min-h-0 overflow-y-auto px-6 py-4 max-md:px-4 max-md:py-3.5">
              <div className="rounded-lg border border-gray-100 bg-gray-50 px-3.5 py-3">
                <p className="whitespace-pre-wrap wrap-break-word text-[14px] leading-[1.65] text-gray-700">
                  {experience.experienceContent ?? '경험 내용이 없습니다.'}
                </p>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
