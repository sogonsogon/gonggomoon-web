'use client';

import { useMemo } from 'react';
import { LoaderCircle, PanelLeftIcon } from 'lucide-react';
import { SidebarTrigger } from '@/shared/components/ui/sidebar';
import { useStrategyGenerationStore } from '@/features/strategy/stores/useStrategyGenerationStore';

export default function MobileStrategyHistoryTrigger() {
  const requests = useStrategyGenerationStore((state) => state.requests);
  const requestOrder = useStrategyGenerationStore((state) => state.requestOrder);

  const processingCount = useMemo(() => {
    return requestOrder.filter((id) => requests[id]?.status === 'PROCESSING').length;
  }, [requestOrder, requests]);

  return (
    <SidebarTrigger className="flex h-auto min-h-11 w-full items-center justify-between gap-2 rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 text-[12px] font-medium text-gray-700 hover:bg-white hover:text-gray-900 md:hidden">
      <span className="inline-flex items-center gap-1.5">
        <PanelLeftIcon className="h-3.5 w-3.5" />
        <span>히스토리 열기</span>
      </span>

      {processingCount > 0 ? (
        <span className="inline-flex h-7 items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-2.5 text-[11px] font-semibold text-blue-700">
          <LoaderCircle className="h-3 w-3 animate-spin" />
          생성 중 {processingCount}건
        </span>
      ) : null}
    </SidebarTrigger>
  );
}
