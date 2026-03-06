import { Bookmark } from '@/features/bookmark/types';

export const mockBookmarks: Bookmark[] = [
  {
    bookmarkId: 1,
    recruitmentId: 3001,
    title: '프론트엔드 엔지니어 (커머스)',
    companyName: '네오커머스',
    dueDate: '2026-03-12',
  },
  {
    bookmarkId: 2,
    recruitmentId: 3002,
    title: '프론트엔드 인턴 (핀테크)',
    companyName: '핀웨이브',
    dueDate: null,
  },
  {
    bookmarkId: 3,
    recruitmentId: 3003,
    title: '백엔드 엔지니어 (AI)',
    companyName: '글로벌테크랩',
    dueDate: '2026-03-21',
  },
  {
    bookmarkId: 4,
    recruitmentId: 3004,
    title: '풀스택 개발자 (스타트업)',
    companyName: '스몰스튜디오',
    dueDate: '2026-02-28',
  },
];
