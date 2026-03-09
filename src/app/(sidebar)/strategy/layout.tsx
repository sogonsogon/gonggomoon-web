import { getStrategyHistoryItems } from '@/features/strategy/utils/getStrategyHistoryItems';
import Footer from '@/shared/components/layout/Footer';
import HistorySidebar from '@/shared/components/layout/HistorySidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/shared/components/ui/sidebar';

export default function StrategyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider defaultOpen>
      <HistorySidebar
        title="포폴 전략"
        createLabel="새 포폴 전략 생성"
        createHref="/strategy/create"
        manageLabel="포폴 전략 관리"
        manageHref="/my/strategy"
        items={getStrategyHistoryItems()}
      />

      <SidebarInset className="min-h-[calc(100svh-5rem)] bg-white">
        <div className="flex min-h-[calc(100svh-5rem)] flex-col">
          <main className="min-h-0 flex-1 overflow-y-auto">
            <div className="mx-auto flex w-full max-w-7xl flex-col px-4 pt-4 pb-6">
              <div className="mb-2 flex items-center">
                <SidebarTrigger className="text-gray-500 hover:bg-gray-100 hover:text-gray-700" />
              </div>

              {children}
            </div>
          </main>

          <Footer />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
