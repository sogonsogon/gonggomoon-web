'use client';

import { useEffect, useMemo, useRef } from 'react';
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
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const trimmedSearch = search.trim();
  const normalizedSearch = trimmedSearch.toLowerCase();
  const params = createRecruitmentListParams(activeTab, trimmedSearch);

  const { data, isPending, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetRecruitments(params);

  const recruitments = data?.items ?? [];
  const totalElements = data?.totalElements ?? 0;

  const filteredRecruitments = useMemo(() => {
    if (!normalizedSearch) return recruitments;

    return recruitments.filter((item) => {
      return (
        item.postTitle.toLowerCase().includes(normalizedSearch) ||
        item.companyName.toLowerCase().includes(normalizedSearch)
      );
    });
  }, [recruitments, normalizedSearch]);

  const isEmpty = filteredRecruitments.length === 0;
  const isInitialLoading = isPending && recruitments.length === 0;
  const isEnd = !hasNextPage;
  const hasSearch = Boolean(trimmedSearch);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        if (!hasNextPage) return;
        if (isFetchingNextPage) return;

        fetchNextPage();
      },
      { rootMargin: '200px' },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isInitialLoading) {
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

  return (
    <section className="min-w-0 flex-1">
      {isEmpty ? (
        <RecruitmentEmptyState search={search} />
      ) : (
        <div className="flex flex-1 flex-col">
          <div className="mb-4 flex items-center justify-between max-md:mb-3">
            <span className="text-sm font-medium text-gray-900">
              {hasSearch ? (
                <>
                  <span className="text-blue-500">{filteredRecruitments.length}개</span>의 검색
                  결과가 있어요.
                </>
              ) : (
                <>
                  <span className="text-blue-500">{totalElements}개</span>의 공고가 열려있어요.
                </>
              )}
            </span>
          </div>

          <RecruitmentList recruitments={filteredRecruitments} />

          <div ref={sentinelRef} className="h-px" />

          {isFetchingNextPage && (
            <p className="py-6 text-center text-sm text-gray-500">공고를 더 불러오는 중이에요...</p>
          )}

          {!isEmpty && isEnd && !isFetchingNextPage && (
            <p className="py-6 text-center text-sm text-gray-400">
              마지막 공고까지 모두 확인했어요.
            </p>
          )}
        </div>
      )}
    </section>
  );
}

function RecruitmentEmptyState({ search }: { search: string }) {
  const hasSearch = Boolean(search.trim());

  return (
    <div className="flex min-h-90 items-center justify-center rounded-2xl border border-gray-100 bg-white max-md:min-h-72 max-md:px-4">
      <div className="flex flex-col items-center gap-4 text-center max-md:gap-3">
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
