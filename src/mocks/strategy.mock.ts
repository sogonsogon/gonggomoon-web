import { ExperienceType } from '@/features/experience/types';
import {
  ExperienceOrdering,
  ExperienceStrategyPoint,
  Strategy,
  StrategyDetail,
} from '@/features/strategy/types';
import { mockExperiences } from '@/mocks/experience.mock';

// 리스트 정렬을 위한 함수
const makeOrdered = (items: { title: string; reason: string }[]): ExperienceOrdering[] =>
  items.map((it, idx) => ({
    order: idx + 1,
    title: it.title,
    reason: it.reason,
  }));

// 전략 경험 포인트를 만드는 함수
const makeExperienceStrategyPoints = (
  items: { experienceType: ExperienceType; experienceTitle: string; strategyPoint: string }[],
): ExperienceStrategyPoint[] =>
  items.map((it) => ({
    experienceType: it.experienceType,
    experienceTitle: it.experienceTitle,
    strategyPoint: it.strategyPoint,
  }));

// 상세 전략을 만드는 함수
const makeDetail = (industryName: string): StrategyDetail => ({
  strategyId: 9001,
  jobType: 'FRONTEND',
  industryName,
  selectedExperienceCount: mockExperiences.length,
  createdAt: new Date().toISOString(),
  mainPositioningMessage: '기획 의도를 UI로 빠르게 검증하고, 제품 완성도를 끌어올리는 프론트엔드',
  experienceStrategyPoints: makeExperienceStrategyPoints([
    {
      experienceType: 'PROJECT',
      experienceTitle: '대용량 영상 업로드 시스템',
      strategyPoint:
        '청크 업로드, 재시도, 장애 복구를 중심으로 대용량 파일 처리 안정성을 개선한 경험으로 정리하세요.',
    },
    {
      experienceType: 'COMPETITION',
      experienceTitle: '리뷰 분석/요약 파이프라인',
      strategyPoint:
        '리뷰 데이터를 구조화하여 운영 의사결정과 사용자 전환율 개선에 기여한 경험으로 정리하세요.',
    },
  ]),
  experienceOrdering: makeOrdered([
    {
      title: '프로젝트 관리 OS (MVP1)',
      reason: '보드/상태 기반 UX와 상호작용이 핵심이라 직무 적합도를 강하게 보여줌',
    },
    {
      title: '포트폴리오 전략 생성 서비스',
      reason: '데이터 기반 화면 구성과 생성형 결과 표현(UI) 역량을 강조 가능',
    },
    {
      title: '프론트엔드 인턴십',
      reason: '협업/품질/리팩터링 경험을 정량/정성 근거로 제시 가능',
    },
  ]),
  keywords: ['문제정의', '우선순위', '재사용성', '성능', '협업'],
  strengths: [
    '대용량 파일 업로드 처리',
    '장애 대응 및 복구 설계',
    'AI 파이프라인 연동',
    '운영 지표 기반 개선',
  ],
  kpiCheckList: [
    '로딩 체감 시간 30% 감소',
    '재사용 컴포넌트 20개 구축',
    '페이지 진입 실패율 1% 미만 유지',
  ],
  improvementGuides: [
    {
      title: '성과 수치 보완',
      description:
        '전후 비교가 가능한 수치(실패율, 처리 시간, 응답 속도 등)를 함께 제시하면 설득력이 높아집니다.',
    },
    {
      title: '비즈니스 임팩트 연결',
      description:
        '기술 구현 설명에 그치지 말고 사용자 경험 또는 운영 효율 개선과 연결해서 서술하는 것이 좋습니다.',
    },
  ],
});

// 목록 조회용 mock 데이터
export const mockStrategies: Strategy[] = [
  {
    strategyId: 9001,
    jobType: 'FRONTEND',
    industryName: '커머스',
    createdAt: '2026-03-01T02:00:00.000Z',
  },
  {
    strategyId: 9002,
    jobType: 'FRONTEND',
    industryName: '핀테크 · 금융',
    createdAt: '2026-03-02T02:00:00.000Z',
  },
  {
    strategyId: 9003,
    jobType: 'BACKEND',
    industryName: '인공지능',
    createdAt: '2026-03-03T02:00:00.000Z',
  },
];

// 상세 조회용 mock 데이터
export const mockStrategyDetails: Record<number, StrategyDetail> = {
  9001: makeDetail('커머스'),
  9002: makeDetail('핀테크 · 금융'),
  9003: makeDetail('인공지능'),
};
