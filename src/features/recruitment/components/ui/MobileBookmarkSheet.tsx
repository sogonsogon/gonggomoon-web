'use client';

import { useEffect, useState } from 'react';
import { Bookmark } from 'lucide-react';
import BookmarkSidebar from '@/features/recruitment/components/ui/BookmarkSidebar';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/ui/sheet';

export default function MobileBookmarkSheet() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');

    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setOpen(false);
      }
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return (
    <div className="fixed left-5 z-40 lg:hidden md:bottom-8 max-md:bottom-[calc(env(safe-area-inset-bottom)+6.75rem)]">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            type="button"
            className="flex h-9 items-center justify-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 text-[13px] font-medium text-gray-700 shadow-sm"
          >
            <Bookmark className="h-4 w-4" />
            북마크한 공고
          </button>
        </SheetTrigger>
        <SheetContent
          side="bottom"
          className="max-h-[75vh] overflow-y-auto rounded-t-2xl p-0 max-md:inset-x-2 max-md:bottom-[calc(env(safe-area-inset-bottom)+0.5rem)] max-md:rounded-2xl max-md:border max-md:border-gray-200"
        >
          <SheetHeader className="border-b border-gray-100 px-4 py-3">
            <SheetTitle className="text-sm font-semibold text-gray-900">북마크한 공고</SheetTitle>
          </SheetHeader>
          <div className="px-4 py-4">
            <BookmarkSidebar showHeader={false} variant="sheet" />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
