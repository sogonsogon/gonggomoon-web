'use server';

import { privateFetch } from '@/shared/api/httpClient';
import { ApiResponse } from '@/shared/types/api';
import { GetCompanyDetailResponse } from '@/features/company/types';

// 기업 상세 조회
export async function getCompanyDetail(
  companyId: number,
): Promise<ApiResponse<GetCompanyDetailResponse>> {
  return await privateFetch<GetCompanyDetailResponse>(`/api/v1/companies/${companyId}`, {
    next: { revalidate: 300, tags: ['company', `company-detail-${companyId}`] },
  });
}
