import { TABS, TabValue } from '@/features/recruitment/constants/tabs';
import Banner from '@/features/recruitment/components/ui/Banner';
import CategoryTabs from '@/features/recruitment/components/ui/CategoryTabs';
import RecruitmentListSection from '@/features/recruitment/components/sections/RecruitmentListSection';
import BookmarkSidebarSection from '@/features/recruitment/components/sections/BookmarkSidebarSection';
import RecruitmentRequestAction from '@/features/recruitment/components/ui/RecruitmentRequestAction';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { bookmarkQueryOptions } from '@/features/bookmark/queries';

const TAB_VALUES = new Set<string>(TABS.map((tab) => tab.value));

interface MainPageProps {
  searchParams: Promise<{
    tab?: string;
    search?: string;
  }>;
}

export default async function MainPage({ searchParams }: MainPageProps) {
  const { tab, search } = await searchParams;

  const activeTab: TabValue = tab && TAB_VALUES.has(tab) ? (tab as TabValue) : 'ALL';
  const searchText = search?.trim() ?? '';

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(bookmarkQueryOptions);

  return (
    <div className="flex min-h-screen w-full flex-col px-4 bg-white font-sans">
      <div className="flex flex-1 flex-col gap-7 py-8">
        <Banner />

        <CategoryTabs activeTab={activeTab} search={searchText} />

        <HydrationBoundary state={dehydrate(queryClient)}>
          <div className="flex flex-1 gap-10">
            <RecruitmentListSection activeTab={activeTab} search={searchText} />
            <BookmarkSidebarSection />
          </div>
        </HydrationBoundary>

        <RecruitmentRequestAction />
      </div>
    </div>
  );
}
