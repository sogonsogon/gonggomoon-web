import { SearchX } from 'lucide-react';
import type { TabValue } from '@/features/recruitment/constants/tabs';
import RecruitmentList from '@/features/recruitment/components/ui/RecruitmentList';
import { mockCompanies } from '@/mocks/company.mock';
import { mockRecruitments } from '@/mocks/recruitment.mock';

interface RecruitmentListSectionProps {
  activeTab: TabValue;
  search: string;
}

export default function RecruitmentListSection({ activeTab, search }: RecruitmentListSectionProps) {
  const normalizedSearch = search.trim().toLowerCase();

  const filteredRecruitments = mockRecruitments.filter((item) => {
    const companyName =
      mockCompanies.find((company) => company.companyId === item.companyId)?.companyName ?? '';

    const matchesTab = activeTab === 'ALL' ? true : item.jobType === activeTab;

    const matchesSearch =
      !normalizedSearch ||
      item.title.toLowerCase().includes(normalizedSearch) ||
      companyName.toLowerCase().includes(normalizedSearch);

    return matchesTab && matchesSearch;
  });

  return (
    <section className="min-w-0 flex-1">
      {filteredRecruitments.length === 0 ? (
        <RecruitmentEmptyState search={search} />
      ) : (
        <RecruitmentList recruitments={filteredRecruitments} />
      )}
    </section>
  );
}

function RecruitmentEmptyState({ search }: { search: string }) {
  const hasSearch = Boolean(search.trim());

  return (
    <div className="flex min-h-[360px] items-center justify-center rounded-2xl border border-gray-100 bg-white">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
          <SearchX className="h-6 w-6 text-gray-400" />
        </div>

        <div className="space-y-1">
          <h3 className="text-base font-semibold text-gray-900">
            {hasSearch ? '검색 결과가 없어요' : '조건에 맞는 공고가 없어요'}
          </h3>
          <p className="text-sm text-gray-500">
            {hasSearch
              ? `‘${search}’에 해당하는 공고를 찾지 못했어요. 다른 검색어로 다시 시도해보세요.`
              : '선택한 조건에 맞는 공고가 아직 없어요. 다른 탭을 확인해보세요.'}
          </p>
        </div>
      </div>
    </div>
  );
}
