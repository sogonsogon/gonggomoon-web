'use server';

import { publicFetch } from '@/shared/api/httpClient';
import { ApiResponse } from '@/shared/types/api';
import { GetCompanyDetailResponse } from '@/features/company/types';

// 기업 상세 조회
export async function getCompanyDetail(
  companyId: number,
): Promise<ApiResponse<GetCompanyDetailResponse>> {
  return await publicFetch<GetCompanyDetailResponse>(`/api/v1/companies/${companyId}`, {
    next: { revalidate: 5 * 60, tags: ['company', `company-detail-${companyId}`] },
  });
}
