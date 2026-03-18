import Footer from '@/shared/components/layout/Footer';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/shared/components/ui/sidebar';
import InterviewHistorySidebar from '@/features/interview/components/layout/InterviewHistorySidebar';
import MobileMainBottomNav from '@/features/recruitment/components/ui/MobileMainBottomNav';

export default function InterviewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider defaultOpen>
      <InterviewHistorySidebar />

      <SidebarInset className="min-h-[calc(100svh-5rem)] bg-white">
        <div className="flex min-h-[calc(100svh-5rem)] flex-col">
          <main className="min-h-0 flex-1 overflow-y-auto">
            <div className="mx-auto flex w-full max-w-7xl flex-col px-4 pt-4 pb-6 max-md:pb-[calc(env(safe-area-inset-bottom)+7.5rem)]">
              <div className="mb-2 flex items-center">
                <SidebarTrigger className="text-gray-500 hover:bg-gray-100 hover:text-gray-700" />
              </div>

              {children}
            </div>
          </main>

          <Footer />
        </div>
      </SidebarInset>

      <MobileMainBottomNav />
    </SidebarProvider>
  );
}
