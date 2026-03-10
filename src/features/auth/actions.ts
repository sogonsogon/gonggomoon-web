'use server';

import { privateFetch } from '@/shared/api/httpClient';
import { ApiResponse } from '@/shared/types/api';

export async function logout(): Promise<ApiResponse<null>> {
  const response = await privateFetch<null>('/api/v1/auth/logout', {
    method: 'POST',
  });
  return response;
}
