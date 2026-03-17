'use server';

import {
  CreateInterviewRequest,
  CreateInterviewResponse,
  GetInterviewAvailablityResponse,
  GetInterviewListResponse,
  GetInterviewResponse,
} from '@/features/interview/types';
import { privateFetch } from '@/shared/api/httpClient';
import { ApiResponse } from '@/shared/types/api';

// 면접 질문 목록 조회
export async function getInterviewList(): Promise<ApiResponse<GetInterviewListResponse>> {
  return await privateFetch<GetInterviewListResponse>('/api/v1/interviews');
}

// 면접 질문 상세 조회
export async function getInterview(
  interviewStrategyId: number,
): Promise<ApiResponse<GetInterviewResponse>> {
  try {
    return await privateFetch<GetInterviewResponse>(`/api/v1/interviews/${interviewStrategyId}`, {
      cache: 'no-store',
    });
  } catch (error) {
    const code = getFailureCode(error);
    const message = getFailureMessage(error);

    if (code === 'INTERVIEW_STRATEGY_RESULT_NOT_READY') {
      return {
        success: false,
        code,
        message,
      } as ApiResponse<GetInterviewResponse>;
    }

    return {
      success: false,
      code: code ?? 'UNKNOWN_ERROR',
      message,
    } as ApiResponse<GetInterviewResponse>;
  }
}

// 면접 질문 생성
export async function createInterview(
  payload: CreateInterviewRequest,
): Promise<ApiResponse<CreateInterviewResponse>> {
  return await privateFetch<CreateInterviewResponse>(`/api/v1/interviews`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

// 면접 질문 삭제
export async function deleteInterview(interviewStrategyId: number): Promise<ApiResponse<null>> {
  return await privateFetch<null>(`/api/v1/interviews/${interviewStrategyId}`, {
    method: 'DELETE',
  });
}

// 면접 질문 생성 사용 횟수
export async function getInterviewAvailability(): Promise<
  ApiResponse<GetInterviewAvailablityResponse>
> {
  return await privateFetch<GetInterviewAvailablityResponse>(
    '/api/v1/interview-strategies/availability',
  );
}

type ApiFailureLike = {
  response?: {
    bodyJson?: {
      code?: string;
      message?: string;
    };
    status?: number;
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
