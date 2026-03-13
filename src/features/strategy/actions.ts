'use server';

import {
  DeleteStrategyRequest,
  GetStrategyListResponse,
  GetStrategyRequest,
  GetStrategyResponse,
} from '@/features/strategy/types';
import { privateFetch } from '@/shared/api/httpClient';
import { ApiResponse } from '@/shared/types/api';

// 포폴 전략 목록 조회
export async function getStrategyList(): Promise<ApiResponse<GetStrategyListResponse>> {
  const response = await privateFetch<GetStrategyListResponse>('/api/v1/portfolio-strategies');
  return response;
}

// 포폴 단건 조회
export async function getStrategy({
  strategyId,
}: GetStrategyRequest): Promise<ApiResponse<GetStrategyResponse>> {
  const response = await privateFetch<GetStrategyResponse>(
    `/api/v1/portfolio-strategies/${strategyId}`,
  );
  return response;
}

// TODO: 포폴 전략 생성

// 포폴 전략 삭제
export async function deleteStrategy({
  strategyId,
}: DeleteStrategyRequest): Promise<ApiResponse<null>> {
  const response = await privateFetch<null>(`/api/v1/portfolio-strategies/${strategyId}`, {
    method: 'DELETE',
  });
  return response;
}
