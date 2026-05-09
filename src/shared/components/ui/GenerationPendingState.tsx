'use client';

import { Sparkles } from 'lucide-react';
import { useId } from 'react';
import usePendingProgress from '@/shared/hooks/usePendingProgress';
import useRotatingText from '@/shared/hooks/useRotatingText';

const TIP_INTERVAL = 4500;
const TIP_FADE_DURATION = 250;

interface GenerationPendingStateProps {
  title: string;
  description: string;
  tips: string[];
}

export default function GenerationPendingState({
  title,
  description,
  tips,
}: GenerationPendingStateProps) {
  const titleId = useId();
  const progress = usePendingProgress();
  const { currentText: currentTip, isVisible: isTipVisible } = useRotatingText(tips, {
    interval: TIP_INTERVAL,
    fadeDuration: TIP_FADE_DURATION,
  });

  return (
    <section
      role="status"
      aria-live="polite"
      aria-labelledby={titleId}
      className="flex min-h-120 w-full flex-col items-center justify-center py-12 text-center max-md:min-h-105 max-md:py-8"
    >
      <GeneratingIcon />

      <h2
        id={titleId}
        className="mt-6 text-[26px] font-bold leading-tight tracking-[-0.02em] text-gray-900 max-md:text-[22px]"
      >
        {title}
      </h2>

      <PendingProgressBar progress={progress} />
      <PendingDescription description={description} />
      <TipBox tip={currentTip} isVisible={isTipVisible} />
    </section>
  );
}

function GeneratingIcon() {
  return (
    <div
      aria-hidden="true"
      className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 max-md:h-14 max-md:w-14"
    >
      <div className="grid grid-cols-2 gap-1.5 max-md:gap-1">
        <span className="h-3.5 w-3.5 animate-bounce rounded-md bg-blue-500 [animation-delay:0ms] max-md:h-3 max-md:w-3" />
        <span className="h-3.5 w-3.5 animate-bounce rounded-md bg-blue-300 [animation-delay:150ms] max-md:h-3 max-md:w-3" />
        <span className="h-3.5 w-3.5 animate-bounce rounded-md bg-blue-300 [animation-delay:300ms] max-md:h-3 max-md:w-3" />
        <span className="h-3.5 w-3.5 animate-bounce rounded-md bg-blue-500 [animation-delay:450ms] max-md:h-3 max-md:w-3" />
      </div>

      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 ring-2 ring-white max-md:h-4 max-md:w-4">
        <Sparkles className="h-3 w-3 animate-pulse text-blue-500 max-md:h-2.5 max-md:w-2.5" />
      </span>
    </div>
  );
}

interface PendingProgressBarProps {
  progress: number;
}

function PendingProgressBar({ progress }: PendingProgressBarProps) {
  return (
    <div className="mt-7 h-1.5 w-full max-w-100 overflow-hidden rounded-full bg-gray-100 max-md:mt-6">
      <div
        className="h-full rounded-full bg-blue-500 transition-all duration-700 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

interface PendingDescriptionProps {
  description: string;
}

function PendingDescription({ description }: PendingDescriptionProps) {
  return (
    <div className="mt-7 flex flex-col gap-1.5 text-center max-md:mt-6">
      <p className="text-[15px] font-medium leading-7 text-gray-700 max-md:text-sm max-md:leading-6">
        {description}
      </p>
      <p className="text-[15px] font-medium leading-7 text-gray-700 max-md:text-sm max-md:leading-6">
        완료되면 자동으로 저장되고 결과 페이지에 표시됩니다.
      </p>
      <p className="text-sm font-medium leading-6 text-gray-500 max-md:text-[13px]">
        다른 화면으로 이동해도 히스토리에서 다시 확인할 수 있어요.
      </p>
    </div>
  );
}

interface TipBoxProps {
  tip: string;
  isVisible: boolean;
}

function TipBox({ tip, isVisible }: TipBoxProps) {
  return (
    <div className="mt-8 flex h-28 w-full max-w-130 flex-col rounded-2xl bg-gray-50 px-5 py-4 text-left max-md:mt-7 max-md:px-4">
      <p className="shrink-0 text-sm font-bold text-blue-600">tip</p>
      <p
        className={`mt-2 overflow-hidden text-sm leading-7 text-gray-700 transition-all duration-300 ease-out max-md:leading-6 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'
        }`}
      >
        {tip}
      </p>
    </div>
  );
}
