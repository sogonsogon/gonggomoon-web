import type {
  Strategy,
  StrategyDetail,
  OrderedExperience,
  StrategyJobType,
} from '@/features/strategy/types';

import type { JobType } from '@/features/recruitment/types';
import type { IndustryType } from '@/features/industry/types';
import { mockExperiences } from './experience.mock';

// StrategyJobType = Pick<JobType, 'FRONTEND' | 'BACKEND'>
// => 실제 값은 'FRONTEND' | 'BACKEND' 만 쓰면 됨
const asStrategyJobType = (v: Extract<JobType, 'FRONTEND' | 'BACKEND'>): StrategyJobType => v;

const makeOrdered = (
  items: { experienceId: number; title: string; reason: string }[],
): OrderedExperience[] =>
  items.map((it, idx) => ({
    order: idx + 1,
    experienceId: it.experienceId,
    title: it.title,
    reason: it.reason,
  }));

const makeDetail = (industry: IndustryType): StrategyDetail => ({
  highlightKeywords: ['문제정의', '우선순위', '재사용성', '성능', '협업'],
  techNarrativeGuide:
    `산업(${industry}) 기준으로 사용자의 경험을 “문제-해결-성과” 구조로 재배치하고, ` +
    `프론트엔드 관점(상태/데이터/컴포넌트/성능/접근성)에서 설득 가능한 근거를 덧붙입니다.`,
  kpiExamples: [
    '로딩 체감 시간 30% 감소',
    '재사용 컴포넌트 20개 구축',
    '페이지 진입 실패율 1% 미만 유지',
  ],
  oneLinePositioning: '기획 의도를 UI로 빠르게 검증하고, 제품 완성도를 끌어올리는 프론트엔드',
  orderedExperiences: makeOrdered([
    {
      experienceId: 101,
      title: '프로젝트 관리 OS (MVP1)',
      reason: '보드/상태 기반 UX와 상호작용이 핵심이라 직무 적합도를 강하게 보여줌',
    },
    {
      experienceId: 102,
      title: '포트폴리오 전략 생성 서비스',
      reason: '데이터 기반 화면 구성과 생성형 결과 표현(UI) 역량을 강조 가능',
    },
    {
      experienceId: 103,
      title: '프론트엔드 인턴십',
      reason: '협업/품질/리팩터링 경험을 정량/정성 근거로 제시 가능',
    },
  ]),
});

export const mockStrategies: Strategy[] = [
  {
    strategyId: 9001,
    jobType: asStrategyJobType('FRONTEND'),
    industryType: 'COMMERCE',
    createdDate: '2026-03-01T02:00:00.000Z',
    experienceTotalCount: mockExperiences.length,
    detail: makeDetail('COMMERCE'),
  },
  {
    strategyId: 9002,
    jobType: asStrategyJobType('FRONTEND'),
    industryType: 'FINTECH',
    createdDate: '2026-03-02T02:00:00.000Z',
    experienceTotalCount: 3,
    detail: makeDetail('FINTECH'),
  },
  // 목록에서 "요약 카드"만 보여주고 싶은 케이스 (detail 없음)
  {
    strategyId: 9003,
    jobType: asStrategyJobType('BACKEND'),
    industryType: 'AI',
    createdDate: '2026-03-03T02:00:00.000Z',
    experienceTotalCount: 2,
  },
];
