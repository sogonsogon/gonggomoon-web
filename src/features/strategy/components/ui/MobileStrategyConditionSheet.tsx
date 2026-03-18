'use client';

import { useEffect, useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import StrategyConditionPanel from '@/features/strategy/components/sections/StrategyConditionPanel';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/ui/sheet';

interface MobileStrategyConditionSheetProps {
  className?: string;
  triggerClassName?: string;
}

export default function MobileStrategyConditionSheet({
  className,
  triggerClassName,
}: MobileStrategyConditionSheetProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');

    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setOpen(false);
      }
    };

    if (mediaQuery.matches) {
      setOpen(false);
    }

    mediaQuery.addEventListener('change', handleChange);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return (
    <div className={cn('lg:hidden', className)}>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            type="button"
            className={cn(
              'inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 text-[13px] font-medium text-gray-700 shadow-sm',
              triggerClassName,
            )}
          >
            <SlidersHorizontal className="h-4 w-4" />
            조건 설정
          </button>
        </SheetTrigger>

        <SheetContent
          side="bottom"
          className="max-h-[85vh] overflow-y-auto rounded-t-2xl p-0 max-md:inset-x-2 max-md:bottom-[calc(env(safe-area-inset-bottom)+0.5rem)] max-md:rounded-2xl max-md:border max-md:border-gray-200"
          showCloseButton={false}
        >
          <SheetHeader className="border-b border-gray-100 px-4 py-3">
            <SheetTitle className="text-sm font-semibold text-gray-900">조건 설정</SheetTitle>
          </SheetHeader>

          <div className="px-4 py-4">
            <StrategyConditionPanel variant="sheet" />
          </div>

          <SheetFooter className="border-t border-gray-100 bg-white px-4 py-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)]">
            <Button type="button" onClick={() => setOpen(false)} className="h-11 w-full rounded-lg">
              적용
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
