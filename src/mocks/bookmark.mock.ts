import { Bookmark } from '@/features/bookmark/types';

export const mockBookmarks: Bookmark[] = [
  {
    postId: 3001,
    postTitle: '프론트엔드 엔지니어 (커머스)',
    companyName: '네오커머스',
    deadline: '2026-03-12',
  },
  {
    postId: 3002,
    postTitle: '프론트엔드 인턴 (핀테크)',
    companyName: '핀웨이브',
    deadline: null,
  },
  {
    postId: 3003,
    postTitle: '백엔드 엔지니어 (AI)',
    companyName: '글로벌테크랩',
    deadline: '2026-03-21',
  },
  {
    postId: 3004,
    postTitle: '풀스택 개발자 (스타트업)',
    companyName: '스몰스튜디오',
    deadline: '2026-02-28',
  },
];
