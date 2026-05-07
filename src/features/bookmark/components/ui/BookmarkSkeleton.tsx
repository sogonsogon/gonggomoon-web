import { Skeleton } from '@/shared/components/ui/skeleton';

export default function BookmarkSkeleton() {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-100 px-6 py-5">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1.5">
          <Skeleton className="h-3.5 w-3.5" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-5 w-56" />
        <div className="flex items-center gap-1.5">
          <Skeleton className="h-3 w-3" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Skeleton className="h-6 w-12 rounded-md" />
        <Skeleton className="h-9 w-9 rounded-md" />
      </div>
    </div>
  );
}
