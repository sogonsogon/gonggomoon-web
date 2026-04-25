import { TABS, TabValue } from '@/features/recruitment/constants/tabs';
import Banner from '@/features/recruitment/components/ui/Banner';
import CategoryTabs from '@/features/recruitment/components/ui/CategoryTabs';
import RecruitmentListSection from '@/features/recruitment/components/sections/RecruitmentListSection';
import BookmarkSidebar from '@/features/recruitment/components/ui/BookmarkSidebar';
import MobileBookmarkSheet from '@/features/recruitment/components/ui/MobileBookmarkSheet';
import MobileMainBottomNav from '@/features/recruitment/components/ui/MobileMainBottomNav';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { createRecruitmentListParams } from '@/features/recruitment/utils/createRecruitmentListParams';
import { getRecruitmentsInfiniteQueryOption } from '@/features/recruitment/queries';

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
  const recruitmentParams = createRecruitmentListParams(activeTab, searchText);
  await queryClient.prefetchInfiniteQuery(getRecruitmentsInfiniteQueryOption(recruitmentParams));

  return (
    <div className="flex min-h-screen w-full flex-col bg-white px-4 font-sans">
      <div className="flex min-w-0 flex-1 flex-col gap-7 py-8 max-md:gap-5 max-md:py-6 max-md:pb-[calc(env(safe-area-inset-bottom)+12rem)] lg:gap-5 lg:py-7 xl:gap-7 xl:py-8">
        <Banner />

        <CategoryTabs activeTab={activeTab} search={searchText} />

        <div className="flex flex-1 gap-10 max-md:flex-col max-md:gap-6 lg:grid lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-start lg:gap-6 xl:grid-cols-[minmax(0,1fr)_20rem] xl:gap-10">
          <HydrationBoundary state={dehydrate(queryClient)}>
            <RecruitmentListSection activeTab={activeTab} search={searchText} />
          </HydrationBoundary>
          <div className="sticky top-26 hidden h-fit self-start lg:block lg:w-full">
            <BookmarkSidebar />
          </div>
        </div>

        <MobileBookmarkSheet />
        <MobileMainBottomNav />
      </div>
    </div>
  );
}
