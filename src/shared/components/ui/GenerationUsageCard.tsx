import { cn } from '@/shared/lib/cn';

interface GenerationUsageCardProps {
  label: string;
  usedCount: number;
  limitCount: number;
  isLoading?: boolean;
  className?: string;
  variant?: 'default' | 'compact';
}

export default function GenerationUsageCard({
  label,
  usedCount,
  limitCount,
  isLoading = false,
  className,
  variant = 'default',
}: GenerationUsageCardProps) {
  if (variant === 'compact') {
    return (
      <div
        className={cn(
          'inline-flex h-10 items-center rounded-lg border border-blue-200 bg-white/80 px-3',
          className,
        )}
      >
        <span className="whitespace-nowrap text-[12px] font-semibold text-blue-600">{label}</span>

        <div className="ml-2 flex items-baseline gap-1 whitespace-nowrap">
          <span className="text-[15px] font-bold text-blue-700">{isLoading ? '-' : usedCount}</span>
          <span className="text-[12px] font-medium text-blue-400">
            / {isLoading ? '-' : `${limitCount}회`}
          </span>
        </div>
      </div>
    );
  }
  return (
    <div
      className={cn(
        'flex items-center justify-between rounded-[10px] border border-blue-100 bg-blue-50 px-4 py-3',
        className,
      )}
    >
      <div className="flex flex-col gap-0.5">
        <span className="text-[11px] font-medium text-blue-600">{label}</span>
        <div className="flex items-center gap-1">
          <span className="text-[20px] font-bold text-blue-700">{isLoading ? '-' : usedCount}</span>
          <span className="text-[13px] font-medium text-blue-400">
            / {isLoading ? '-' : `${limitCount}회`}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        {Array.from({ length: limitCount }).map((_, index) => (
          <span
            key={index}
            className={cn(
              'h-2.5 w-2.5 rounded-full',
              index < usedCount ? 'bg-blue-500' : 'bg-blue-200',
            )}
          />
        ))}
      </div>
    </div>
  );
}
