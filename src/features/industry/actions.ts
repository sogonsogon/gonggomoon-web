'use server';

import { publicFetch } from '@/shared/api/httpClient';
import { ApiResponse } from '@/shared/types/api';
import { GetIndustryAnalysisResponse, GetIndustryListResponse } from '@/features/industry/types';

// 산업 목록 조회
export async function getIndustryList(): Promise<ApiResponse<GetIndustryListResponse>> {
  return await publicFetch<GetIndustryListResponse>(`/api/v1/industries`, {
    next: { revalidate: 24 * 60 * 60, tags: ['industryList'] },
  });
}

// 산업 분석 조회
export async function getIndustryAnalysis(
  industryId: number,
): Promise<ApiResponse<GetIndustryAnalysisResponse>> {
  return await publicFetch<GetIndustryAnalysisResponse>(
    `/api/v1/industries/${industryId}/reports`,
    {
      next: { revalidate: 24 * 60 * 60, tags: ['industry', `industry-detail-${industryId}`] },
    },
  );
}
