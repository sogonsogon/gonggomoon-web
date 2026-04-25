import Footer from '@/shared/components/layout/Footer';
import { SidebarInset, SidebarProvider } from '@/shared/components/ui/sidebar';
import StrategyHistorySidebar from '@/features/strategy/components/layout/StrategyHistorySidebar';
import MobileStrategyHistoryTrigger from '@/features/strategy/components/ui/MobileStrategyHistoryTrigger';

export default function StrategyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider defaultOpen className="min-h-0!">
      <StrategyHistorySidebar />

      <SidebarInset className="min-h-0 bg-white transition-[padding-left] duration-200 md:peer-data-[state=collapsed]:pl-4">
        <div className="flex min-h-0 flex-col">
          <main>
            <div className="mx-auto flex w-full max-w-7xl flex-col px-4 pt-4 pb-6 max-md:pb-[calc(env(safe-area-inset-bottom)+7.5rem)]">
              <div className="mb-2 flex items-center md:hidden">
                <MobileStrategyHistoryTrigger />
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
