import { Skeleton } from '@/shared/components/ui/skeleton';

export default function ExperienceCardSkeleton() {
  return (
    <div className="flex items-center justify-between gap-3 px-5 py-3.5 h-16">
      <div className="flex flex-1 items-center gap-2.5">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-4 w-48 rounded" />
        <Skeleton className="h-4 w-24 rounded" />
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <Skeleton className="h-7 w-14 rounded-md" />
        <Skeleton className="h-7 w-7 rounded-md" />
      </div>
    </div>
  );
}
