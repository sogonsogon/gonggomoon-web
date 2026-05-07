import Footer from '@/shared/components/layout/Footer';
import { SidebarInset, SidebarProvider } from '@/shared/components/ui/sidebar';
import InterviewHistorySidebar from '@/features/interview/components/layout/InterviewHistorySidebar';
import MobileInterviewHistoryTrigger from '@/features/interview/components/ui/MobileInterviewHistoryTrigger';

export default function InterviewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider defaultOpen className="min-h-0!">
      <InterviewHistorySidebar />

      <SidebarInset className="min-h-0 bg-white transition-[padding-left] duration-200 md:peer-data-[state=collapsed]:pl-4">
        <div className="flex min-h-0 flex-col">
          <main>
            <div className="mx-auto flex w-full max-w-7xl flex-col px-4 pt-4 pb-6">
              <div className="mb-2 flex items-center md:hidden">
                <MobileInterviewHistoryTrigger />
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
