import Footer from '@/shared/components/layout/Footer';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/shared/components/ui/sidebar';
import InterviewHistorySidebar from '@/features/interview/components/layout/InterviewHistorySidebar';
import { createInterviewHistoryItems } from '@/features/interview/utils/createInterviewHistoryItems';
import { mockInterviewSets } from '@/mocks/interview.mock';
import InterviewGenerationPollingListener from '@/features/interview/components/sections/InterviewGenerationPollingListener';

export default function InterviewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const historyItems = createInterviewHistoryItems(mockInterviewSets);

  return (
    <SidebarProvider defaultOpen>
      <InterviewHistorySidebar items={historyItems} />

      <SidebarInset className="min-h-[calc(100svh-5rem)] bg-white">
        <InterviewGenerationPollingListener />

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
