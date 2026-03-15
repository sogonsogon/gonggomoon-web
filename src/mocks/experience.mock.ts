import type { Experience } from '@/features/experience/types';

export const mockExperiences: Experience[] = [
  {
    experienceId: 101,
    title: '프로젝트 관리 OS (MVP1)',
    experienceType: 'PROJECT',
    experienceContent:
      '보드/테이블 뷰 기반 태스크 관리. Drag & Drop, 상태(Todo/Doing/Done), 액티비티 로그 UI 구성.',
    startDate: '2026-01-10',
    endDate: null,
  },
  {
    experienceId: 102,
    title: '포트폴리오 전략 생성 서비스',
    experienceType: 'PROJECT',
    experienceContent:
      '공고 분석 → 산업/기업 맥락 → 포트폴리오 전략 및 면접 질문 생성 플로우 UI 구현.',
    startDate: '2025-12-01',
    endDate: '2026-02-15',
  },
  {
    experienceId: 103,
    title: '프론트엔드 인턴십',
    experienceType: 'CAREER',
    experienceContent: '디자인 시스템 기반 UI 컴포넌트 개발 및 데이터 패칭/캐싱 전략 수립.',
    startDate: '2025-07-01',
    endDate: '2025-10-31',
  },
  {
    experienceId: 104,
    title: '컴퓨터공학 전공',
    experienceType: 'EDUCATION',
    experienceContent: '자료구조/알고리즘, 웹 프로그래밍, 데이터베이스 과목 수료.',
    startDate: '2022-03-02',
    endDate: null,
  },
  {
    experienceId: 105,
    title: '해커톤/공모전 참가',
    experienceType: 'COMPETITION',
    experienceContent: '서비스 기획 및 MVP 프론트엔드 구현 담당.',
    startDate: '2025-11-05',
    endDate: '2025-11-07',
  },
];
