'use server';

import {
  CreateStrategyRequest,
  CreateStrategyResponse,
  GetStrategyDetailResponse,
  GetStrategyListResponse,
} from '@/features/strategy/types';
import { privateFetch } from '@/shared/api/httpClient';
import { ApiResponse } from '@/shared/types/api';

// 포폴 전략 목록 조회
export async function getStrategyList(): Promise<ApiResponse<GetStrategyListResponse>> {
  return await privateFetch<GetStrategyListResponse>('/api/v1/portfolio-strategies');
}

// 포폴 전략 생성
export async function createStrategy(
  payload: CreateStrategyRequest,
): Promise<ApiResponse<CreateStrategyResponse>> {
  return await privateFetch<CreateStrategyResponse>(`/api/v1/portfolio-strategies`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

// 포폴 전략 상세 조회
export async function getStrategyDetail(
  strategyId: number,
): Promise<ApiResponse<GetStrategyDetailResponse>> {
  return await privateFetch<GetStrategyDetailResponse>(
    `/api/v1/portfolio-strategies/${strategyId}`,
    {
      cache: 'no-store',
    },
  );
}

// 포폴 전략 삭제
export async function deleteStrategy(strategyId: number): Promise<ApiResponse<null>> {
  return await privateFetch<null>(`/api/v1/portfolio-strategies/${strategyId}`, {
    method: 'DELETE',
  });
}
