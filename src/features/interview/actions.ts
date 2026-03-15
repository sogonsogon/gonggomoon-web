'use server';

import {
  CreateInterviewRequest,
  CreateInterviewResponse,
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
  return await privateFetch<GetInterviewResponse>(`/api/v1/interviews/${interviewStrategyId}`, {
    cache: 'no-store',
  });
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
