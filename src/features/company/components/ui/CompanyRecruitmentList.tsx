'use client';

import { useEffect, useMemo, useRef } from 'react';
import CompanyRecruitmentListItem from '@/features/company/components/ui/CompanyRecruitmentListItem';
import { useGetRecruitments } from '@/features/recruitment/queries';
import { useParams } from 'next/navigation';

export default function CompanyRecruitmentList() {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const params = useParams<{ companyId: string }>();
  const companyId = Number(params.companyId);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending, isError } =
    useGetRecruitments();

  const recruitments = data?.items ?? [];

  const companyRecruitments = useMemo(
    () => recruitments.filter((recruitment) => recruitment.companyId === companyId),
    [recruitments, companyId],
  );

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

  if (isPending && recruitments.length === 0) {
    return (
      <div className="flex flex-col gap-4 pt-6">
        <h2 className="text-base font-bold text-gray-900">현재 채용 중인 공고</h2>
        <p className="text-sm text-gray-400">공고를 불러오는 중이에요...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col gap-4 pt-6">
        <h2 className="text-base font-bold text-gray-900">현재 채용 중인 공고</h2>
        <p className="text-sm text-gray-400">공고를 불러오지 못했어요.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 pt-6">
      <h2 className="text-base font-bold text-gray-900">현재 채용 중인 공고</h2>

      {companyRecruitments.length === 0 ? (
        <p className="text-sm text-gray-400">현재 채용 중인 공고가 없습니다.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {companyRecruitments.map((recruitment) => (
            <CompanyRecruitmentListItem key={recruitment.postId} recruitment={recruitment} />
          ))}
        </div>
      )}

      <div ref={sentinelRef} className="h-px" />

      {isFetchingNextPage && (
        <p className="py-4 text-center text-sm text-gray-400">공고를 더 불러오는 중이에요...</p>
      )}
    </div>
  );
}
