'use server';

import { privateFetch } from '@/shared/api/httpClient';
import { GetGenerationStatusRequest, GetGenerationStatusResponse } from '@/shared/types';
import { ApiResponse } from '@/shared/types/api';

// AI 생성 상태 조회
export async function getGenerationStatus(
  payload: GetGenerationStatusRequest,
): Promise<ApiResponse<GetGenerationStatusResponse>> {
  return await privateFetch<GetGenerationStatusResponse>(`/api/v1/ai-jobs/status`, {
    method: 'POST',
    body: JSON.stringify(payload),
    cache: 'no-store',
  });
}
