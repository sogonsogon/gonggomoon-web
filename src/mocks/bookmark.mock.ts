import { Bookmark } from '@/features/bookmark/types';

export const mockBookmarks: Bookmark[] = [
  {
    bookmarkId: 1,
    postId: 3001,
    postTitle: '프론트엔드 엔지니어 (커머스 플랫폼 주문/결제 사용자 경험 개선 및 성능 최적화 담당)',
    companyName: '커머스랩',
    postStatus: 'PUBLISHED',
    startDate: '2026-03-01T00:00:00',
    dueDate: '2026-03-31T23:59:59',
    createdAt: '2026-03-05T10:00:00',
  },
  {
    bookmarkId: 2,
    postId: 3002,
    postTitle: '프론트엔드 인턴 (핀테크 서비스 UI 개발 및 디자인 시스템 기반 컴포넌트 운영 지원)',
    companyName: '페이웨이브',
    postStatus: 'PUBLISHED',
    startDate: null,
    dueDate: null,
    createdAt: '2026-03-06T11:30:00',
  },
  {
    bookmarkId: 3,
    postId: 3003,
    postTitle: '백엔드 엔지니어 (AI 데이터 처리 파이프라인 및 모델 서빙 플랫폼 구축 담당)',
    companyName: '에이아이코어',
    postStatus: 'PUBLISHED',
    startDate: '2026-04-01T00:00:00',
    dueDate: '2026-04-30T23:59:59',
    createdAt: '2026-03-07T09:15:00',
  },
  {
    bookmarkId: 4,
    postId: 3004,
    postTitle: '풀스택 개발자 (초기 스타트업 프로덕트 개발 전반 및 운영 자동화 시스템 구축 담당)',
    companyName: '스몰스튜디오',
    postStatus: 'CLOSED',
    startDate: '2026-02-01T00:00:00',
    dueDate: '2026-02-28T23:59:59',
    createdAt: '2026-03-08T14:00:00',
  },
];
