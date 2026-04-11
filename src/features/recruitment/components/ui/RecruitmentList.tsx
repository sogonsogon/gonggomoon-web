'use client';

import { useMemo } from 'react';
import RecruitmentListItem from '@/features/recruitment/components/ui/RecruitmentListItem';
import type { Recruitment } from '@/features/recruitment/types';
import { useGetBookmarks } from '@/features/bookmark/queries';
import { useAuthStore } from '@/shared/provider/AuthProvider';
interface RecruitmentListProps {
  recruitments: Recruitment[];
}

export default function RecruitmentList({ recruitments }: RecruitmentListProps) {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const { data: bookmarks } = useGetBookmarks(isLoggedIn);

  const bookmarkedPostIds = useMemo(
    () => new Set((bookmarks?.content ?? []).map((bookmark) => bookmark.postId)),
    [bookmarks],
  );

  return (
    <div className="flex flex-col bg-white">
      {recruitments.map((item) => (
        <RecruitmentListItem
          key={item.postId}
          postId={item.postId}
          title={item.postTitle}
          dueDate={item.dueDate}
          experienceLevel={item.experienceLevel}
          companyName={item.companyName}
          analysisSummary={item.analysisSummary}
          isBookmarked={bookmarkedPostIds.has(item.postId)}
        />
      ))}
    </div>
  );
}
