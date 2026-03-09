import { SparklesIcon } from 'lucide-react';
import ExperienceExtractButton from '@/features/experience/components/ui/ExperienceExtractButton';

export default function ExperienceExtractBanner() {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-blue-100 bg-blue-50 px-6 py-5">
      <div className="flex flex-1 items-center gap-3.5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-blue-100">
          <SparklesIcon className="h-5 w-5 text-blue-600" />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[15px] font-bold text-blue-900">AI 경험 추출</span>
          <span className="text-[13px] text-blue-800">
            업로드된 파일에서 AI가 의미 있는 경험 단위를 자동으로 추출해드립니다
          </span>
        </div>
      </div>
      <ExperienceExtractButton />
    </div>
  );
}
