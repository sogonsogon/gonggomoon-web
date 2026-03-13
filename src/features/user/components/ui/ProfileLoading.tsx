import { Skeleton } from '@/shared/components/ui/skeleton';

export default function ProfileLoading() {
  return (
    <>
      <div className="rounded-xl border border-gray-100">
        <div className="flex items-center gap-5 border-b border-gray-100 px-7 py-6">
          <Skeleton className="h-16 w-16 shrink-0 rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
        <div className="px-7">
          <div className="flex items-center border-b border-gray-100 py-5">
            <Skeleton className="h-4 w-30 shrink-0" />
            <Skeleton className="ml-4 h-4 w-24" />
          </div>
          <div className="flex items-center py-5">
            <Skeleton className="h-4 w-30 shrink-0" />
            <Skeleton className="ml-4 h-4 w-40" />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Skeleton className="h-9 w-20 rounded-md" />
        <Skeleton className="h-9 w-24 rounded-md" />
      </div>
    </>
  );
}
