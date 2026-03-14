'use server';

import {
  DeleteInterviewRequest,
  GetInterviewListResponse,
  GetInterviewRequest,
  GetInterviewResponse,
} from '@/features/interview/types';
import { privateFetch } from '@/shared/api/httpClient';
import { ApiResponse } from '@/shared/types/api';

// 면접 질문 목록 조회
export async function getInterviewList(): Promise<ApiResponse<GetInterviewListResponse>> {
  const response = await privateFetch<GetInterviewListResponse>('/api/v1/interviews');
  return response;
}

// 면접 질문 단건 조회
export async function getInterview({
  interviewStrategyId,
}: GetInterviewRequest): Promise<ApiResponse<GetInterviewResponse>> {
  const response = await privateFetch<GetInterviewResponse>(
    `/api/v1/interviews/${interviewStrategyId}`,
  );
  return response;
}

// TODO: 면접 질문 생성

// 면접 질문 삭제
export async function deleteInterview({
  interviewStrategyId,
}: DeleteInterviewRequest): Promise<ApiResponse<null>> {
  const response = await privateFetch<null>(`/api/v1/interviews/${interviewStrategyId}`, {
    method: 'DELETE',
  });
  return response;
}
