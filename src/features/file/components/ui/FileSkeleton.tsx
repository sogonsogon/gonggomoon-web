import { Skeleton } from '@/shared/components/ui/skeleton';
import { TableCell, TableRow } from '@/shared/components/ui/table';

interface FileSkeletonProps {
  variant?: 'row' | 'card';
}

export default function FileSkeleton({ variant = 'row' }: FileSkeletonProps) {
  if (variant === 'card') {
    return (
      <div className="flex items-center justify-between gap-3 px-4 py-3.5">
        <div className="flex min-w-0 flex-col gap-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-14 rounded-full" />
            <div className="flex items-center gap-1.5">
              <Skeleton className="h-3.5 w-3.5 shrink-0" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          <Skeleton className="h-3 w-24" />
        </div>
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>
    );
  }

  return (
    <TableRow>
      <TableCell className="w-25 px-4 py-3.5">
        <Skeleton className="h-5 w-14 rounded-full" />
      </TableCell>

      <TableCell className="px-4 py-3.5">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 shrink-0" />
          <Skeleton className="h-4 w-48" />
        </div>
      </TableCell>

      <TableCell className="w-25 px-4 py-3.5">
        <Skeleton className="h-4 w-12" />
      </TableCell>

      <TableCell className="w-30 px-4 py-3.5">
        <Skeleton className="h-4 w-20" />
      </TableCell>

      <TableCell className="w-18 px-4 py-3.5">
        <div className="flex justify-center">
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </TableCell>
    </TableRow>
  );
}
