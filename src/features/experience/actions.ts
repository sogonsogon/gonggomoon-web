'use server';

import {
  CreateExperienceRequest,
  CreateExperienceResponse,
  DeleteExperienceRequest,
  GetExperienceListResponse,
  GetExperienceRequest,
  GetExperienceResponse,
  UpdateExperienceRequest,
  UpdateExperienceResponse,
} from '@/features/experience/types';
import { privateFetch } from '@/shared/api/httpClient';
import { ApiResponse } from '@/shared/types/api';

// 경험 목록 조회
export async function getExperienceList(): Promise<ApiResponse<GetExperienceListResponse>> {
  const response = await privateFetch<GetExperienceListResponse>('/api/v1/experiences');
  return response;
}

// 경험 단건 조회
export async function getExperience({
  experienceId,
}: GetExperienceRequest): Promise<ApiResponse<GetExperienceResponse>> {
  const response = await privateFetch<GetExperienceResponse>(`/api/v1/experiences/${experienceId}`);
  return response;
}

// 경험 생성
export async function createExperience(
  payload: CreateExperienceRequest,
): Promise<ApiResponse<CreateExperienceResponse>> {
  const response = await privateFetch<CreateExperienceResponse>(`/api/v1/experiences`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return response;
}

// 경험 수정
export async function updateExperience({
  experienceId,
  payload,
}: UpdateExperienceRequest): Promise<ApiResponse<UpdateExperienceResponse>> {
  const response = await privateFetch<UpdateExperienceResponse>(
    `/api/v1/experiences/${experienceId}`,
    {
      method: 'PATCH',
      body: JSON.stringify(payload),
    },
  );
  return response;
}

// 경험 삭제
export async function deleteExperience({
  experienceId,
}: DeleteExperienceRequest): Promise<ApiResponse<null>> {
  const response = await privateFetch<null>(`/api/v1/experiences/${experienceId}`, {
    method: 'DELETE',
  });
  return response;
}
