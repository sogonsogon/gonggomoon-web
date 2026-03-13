'use client';

import { SearchX } from 'lucide-react';
import type { TabValue } from '@/features/recruitment/constants/tabs';
import RecruitmentList from '@/features/recruitment/components/ui/RecruitmentList';
import { useGetRecruitments } from '@/features/recruitment/queries';
import { createRecruitmentListParams } from '@/features/recruitment/utils/createRecruitmentListParams';

interface RecruitmentListSectionProps {
  activeTab: TabValue;
  search: string;
}

export default function RecruitmentListSection({ activeTab, search }: RecruitmentListSectionProps) {
  const normalizedSearch = search.trim().toLowerCase();
  const params = createRecruitmentListParams(activeTab, search);

  const { data: recruitments = [], isPending, isError } = useGetRecruitments(params);

  if (isPending) {
    return (
      <section className="min-w-0 flex-1">
        <div className="flex min-h-90 items-center justify-center rounded-2xl border border-gray-100 bg-white">
          <p className="text-sm text-gray-500">공고를 불러오는 중이에요...</p>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="min-w-0 flex-1">
        <div className="flex min-h-90 items-center justify-center rounded-2xl border border-gray-100 bg-white">
          <p className="text-sm text-gray-500">공고를 불러오지 못했어요.</p>
        </div>
      </section>
    );
  }

  const filteredRecruitments = recruitments.filter((item) => {
    const matchesSearch =
      !normalizedSearch ||
      item.title.toLowerCase().includes(normalizedSearch) ||
      item.companyName.toLowerCase().includes(normalizedSearch);

    return matchesSearch;
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
    <div className="flex min-h-90 items-center justify-center rounded-2xl border border-gray-100 bg-white">
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
