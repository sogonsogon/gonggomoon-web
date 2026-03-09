import { Industry } from '@/features/industry/types';

export const mockIndustries: Industry[] = [
  {
    industryId: 1,
    name: '커머스',
    analysis: {
      createdAt: '2025.12.15',
      updatedAt: '2026.02.28',
      keyword: ['이커머스', '대규모 트래픽', '개인화 추천', '풀필먼트'],
      marketSize: '2025년 기준 국내 이커머스 시장은 약 200조 원 규모로 성장세를 유지하고 있습니다.',
      trend: [
        '모바일 중심 커머스 이용 증가',
        'AI 기반 개인화 추천 서비스 확대',
        '빠른 배송 및 물류 고도화 경쟁 심화',
      ],
      regulation: [
        '전자상거래법 개정에 따른 플랫폼 책임 강화',
        '개인정보 보호 및 데이터 활용 규제 강화',
      ],
      competition:
        '쿠팡, 네이버쇼핑 등 대형 플랫폼과 버티컬 커머스 간 경쟁이 치열하며, 차별화된 사용자 경험과 물류 역량이 핵심 경쟁 요소로 작용하고 있다.',
      hiring: [
        '프론트엔드 엔지니어 수요 증가',
        '데이터 엔지니어 및 추천 시스템 인력 수요 확대',
        '물류 시스템 개발 직군 채용 지속',
      ],
      investment: [
        '물류 자동화 분야 투자 확대',
        'AI 추천 시스템 고도화 투자 증가',
        '라이브커머스 및 고객 경험 혁신 영역 투자 집중',
      ],
    },
  },
  {
    industryId: 2,
    name: '핀테크',
    analysis: {
      createdAt: '2025.12.15',
      updatedAt: '2026.02.28',
      keyword: ['간편결제', '디지털 뱅킹', '슈퍼앱', '마이데이터'],
      marketSize:
        '2025년 기준 국내 핀테크 시장은 연 100조 원 이상의 거래 규모와 함께 빠르게 성장하고 있습니다.',
      trend: [
        '간편결제 및 송금 서비스 이용 확대',
        '마이데이터 기반 개인화 금융 서비스 증가',
        '전통 금융사와 빅테크의 디지털 전환 가속화',
      ],
      regulation: ['금융소비자보호 관련 규제 강화', '보안 및 개인정보 보호 관련 법안 확대'],
      competition:
        '카카오페이, 토스, 네이버페이 등 빅테크 기반 플랫폼과 전통 금융사의 디지털 금융 경쟁이 심화되고 있으며, 사용자 편의성과 신뢰성이 핵심 경쟁 요소가 되고 있다.',
      hiring: [
        '프론트엔드 엔지니어 채용 증가',
        '보안 전문가 수요 확대',
        '데이터 분석 및 금융 서비스 기획 인력 수요 증가',
      ],
      investment: [
        'BNPL 등 신규 결제 서비스 투자 확대',
        '자산관리 자동화 분야 투자 증가',
        '블록체인 기반 금융 인프라 투자 활성화',
      ],
    },
  },
  {
    industryId: 3,
    name: '미디어/콘텐츠',
  },
  {
    industryId: 4,
    name: '모빌리티',
  },
  {
    industryId: 5,
    name: 'AI',
    analysis: {
      createdAt: '2025.12.15',
      updatedAt: '2026.02.28',
      keyword: ['AI Automation', 'Cloud Computing', 'Generative AI'],
      marketSize: '2025년 기준 약 1500억 달러 규모로 성장 전망',
      trend: ['생성형 AI 기반 서비스 확대', '기업 AI 도입 가속화', '클라우드 네이티브 인프라 증가'],
      regulation: ['AI 데이터 사용 규제 강화', '개인정보 보호 관련 법안 확대'],
      competition:
        '글로벌 빅테크 기업과 스타트업 간 기술 경쟁이 심화되고 있으며, AI 모델 및 플랫폼 경쟁이 주요 구도로 형성되고 있다.',
      hiring: [
        'AI 엔지니어 채용 증가',
        '데이터 사이언티스트 수요 확대',
        'MLOps 엔지니어 수요 증가',
      ],
      investment: [
        'AI 스타트업 투자 증가',
        '클라우드 인프라 기업 투자 확대',
        'AI 반도체 분야 투자 활성화',
      ],
    },
  },
  {
    industryId: 6,
    name: '헬스케어/바이오',
  },
  {
    industryId: 7,
    name: '제조',
  },
  {
    industryId: 999,
    name: '기타',
  },
];
