'use server';

import { privateFetch } from '@/shared/api/httpClient';
import { ApiResponse } from '@/shared/types/api';
import { cookies } from 'next/headers';

export async function logout(): Promise<ApiResponse<null>> {
  const response = await privateFetch<null>('/api/v1/auth/logout', {
    method: 'POST',
  });
  const cookieStore = await cookies();
  cookieStore.delete('access_token');
  cookieStore.delete('refresh_token');

  return response;
}
