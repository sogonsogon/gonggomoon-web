'use server';

import {
  CreateStrategyRequest,
  CreateStrategyResponse,
  GetStrategyAvailablityResponse,
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
  try {
    return await privateFetch<GetStrategyDetailResponse>(
      `/api/v1/portfolio-strategies/${strategyId}`,
      {
        cache: 'no-store',
      },
    );
  } catch (error) {
    const code = getFailureCode(error);
    const message = getFailureMessage(error);

    if (code === 'PORTFOLIO_STRATEGY_RESULT_NOT_READY') {
      return {
        success: false,
        code,
        message,
      } as ApiResponse<GetStrategyDetailResponse>;
    }

    throw error;
  }
}

// 포폴 전략 삭제
export async function deleteStrategy(strategyId: number): Promise<ApiResponse<null>> {
  return await privateFetch<null>(`/api/v1/portfolio-strategies/${strategyId}`, {
    method: 'DELETE',
  });
}

// 포폴 전략 생성 사용 횟수 조회
export async function getStrategyAvailability(): Promise<
  ApiResponse<GetStrategyAvailablityResponse>
> {
  return await privateFetch<GetStrategyAvailablityResponse>('/api/v1/strategies/availability');
}

type ApiFailureLike = {
  response?: {
    bodyJson?: {
      code?: string;
      message?: string;
    };
  };
};

function getFailureCode(error: unknown): string | undefined {
  if (typeof error === 'object' && error !== null) {
    return (error as ApiFailureLike).response?.bodyJson?.code;
  }
  return undefined;
}

function getFailureMessage(error: unknown): string {
  if (typeof error === 'object' && error !== null) {
    return (
      (error as ApiFailureLike).response?.bodyJson?.message ??
      (error as { message?: string }).message ??
      '알 수 없는 오류가 발생했습니다.'
    );
  }
  return '알 수 없는 오류가 발생했습니다.';
}
