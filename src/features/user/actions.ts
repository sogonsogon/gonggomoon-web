'use server';

import { GetUserResponse } from '@/features/user/types';
import { privateFetch } from '@/shared/api/httpClient';
import { ApiResponse } from '@/shared/types/api';

export async function getUser(): Promise<ApiResponse<GetUserResponse>> {
  const response = await privateFetch<GetUserResponse>('/api/v1/users/me');
  return response;
}

export async function deleteUser(): Promise<ApiResponse<null>> {
  const response = await privateFetch<null>('/api/v1/users/me', {
    method: 'DELETE',
  });
  return response;
}
