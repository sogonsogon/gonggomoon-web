import Link from 'next/link';
import { TABS, TabValue } from '@/features/recruitment/constants/tabs';

interface CategoryTabsProps {
  activeTab: TabValue;
  search: string;
}

export default function CategoryTabs({ activeTab, search }: CategoryTabsProps) {
  const createHref = (tab: TabValue) => {
    const params = new URLSearchParams();

    if (tab !== 'ALL') {
      params.set('tab', tab);
    }

    if (search.trim()) {
      params.set('search', search.trim());
    }

    const queryString = params.toString();
    return queryString ? `/?${queryString}` : '/';
  };

  return (
    <div
      role="tablist"
      className="flex w-full min-w-0 max-w-full overflow-x-auto overscroll-x-contain border-b border-gray-200 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {TABS.map((tab) => {
        const isActive = activeTab === tab.value;

        return (
          <Link
            key={tab.value}
            href={createHref(tab.value)}
            replace
            scroll={false}
            role="tab"
            aria-selected={isActive}
            className={`shrink-0 whitespace-nowrap px-4 pb-3 pt-3 text-sm lg:px-3 xl:px-4 ${
              isActive
                ? 'border-b-2 border-gray-900 font-semibold text-gray-900'
                : 'font-medium text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
