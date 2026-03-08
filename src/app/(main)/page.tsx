import { TABS, TabValue } from '@/features/recruitment/constants/tabs';
import Banner from '@/features/recruitment/components/ui/Banner';
import CategoryTabs from '@/features/recruitment/components/ui/CategoryTabs';
import RecruitmentListSection from '@/features/recruitment/components/sections/RecruitmentListSection';
import BookmarkSidebarSection from '@/features/recruitment/components/sections/BookmarkSidebarSection';

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

  return (
    <div className="flex min-h-screen w-full flex-col bg-white font-sans">
      <div className="flex flex-1 flex-col gap-7 py-8">
        <Banner />

        <CategoryTabs activeTab={activeTab} search={searchText} />

        <div className="flex flex-1 gap-10">
          <RecruitmentListSection activeTab={activeTab} search={searchText} />
          <BookmarkSidebarSection />
        </div>

        {/*  TODO: 공고 추가 요청 FAB*/}
      </div>
    </div>
  );
}
