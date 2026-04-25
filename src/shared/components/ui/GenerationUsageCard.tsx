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
  const isCompact = variant === 'compact';

  return (
    <div
      className={cn(
        'flex items-center justify-between border border-blue-100 bg-blue-50',
        isCompact ? 'min-w-40 rounded-lg px-3 py-2' : 'rounded-[10px] px-4 py-3',
        className,
      )}
    >
      <div className="flex flex-col gap-0.5">
        <span
          className={cn('font-medium text-blue-600', isCompact ? 'text-[10px]' : 'text-[11px]')}
        >
          {label}
        </span>

        <div className="flex items-center gap-1">
          <span
            className={cn('font-bold text-blue-700', isCompact ? 'text-[16px]' : 'text-[20px]')}
          >
            {isLoading ? '-' : usedCount}
          </span>

          <span
            className={cn('font-medium text-blue-400', isCompact ? 'text-[11px]' : 'text-[13px]')}
          >
            / {isLoading ? '-' : `${limitCount}회`}
          </span>
        </div>
      </div>

      <div className={cn('flex items-center', isCompact ? 'gap-1' : 'gap-1.5')}>
        {Array.from({ length: limitCount }).map((_, index) => (
          <div
            key={index}
            className={cn(
              'rounded-full',
              isCompact ? 'h-2 w-2' : 'h-2.5 w-2.5',
              index < usedCount ? 'bg-blue-500' : 'bg-blue-200',
            )}
          />
        ))}
      </div>
    </div>
  );
}
