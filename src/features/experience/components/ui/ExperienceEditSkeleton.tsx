import { Skeleton } from '@/shared/components/ui/skeleton';

export default function ExperienceEditSkeleton() {
  return (
    <div>
      <div className="flex flex-col gap-2 border-b-2 border-blue-400 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <div className="flex flex-1 flex-wrap items-center gap-2">
          <Skeleton className="h-5 w-16 rounded-md" />
          <Skeleton className="h-10 w-25 md:w-40" />
          <Skeleton className="h-10 flex-1 min-w-[150px]" />
          <Skeleton className="h-9 w-9" />
        </div>
      </div>

      <div className="flex flex-col gap-4 px-5 py-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <Skeleton className="h-4 w-10" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-32 sm:w-40" />
            <span className="text-gray-300">–</span>
            <Skeleton className="h-10 w-32 sm:w-52" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-[120px] w-full rounded-lg" />
        </div>
      </div>

      <div className="flex justify-end gap-2 border-t border-gray-200 px-5 py-3">
        <Skeleton className="h-10 w-20 rounded-lg" />
        <Skeleton className="h-10 w-20 rounded-lg" />
      </div>
    </div>
  );
}
