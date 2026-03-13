'use server';

import { privateFetch } from '@/shared/api/httpClient';
import { ApiResponse } from '@/shared/types/api';
import {
  GetRecruitmentDetailResponse,
  GetRecruitmentsResponse,
  RequestRecruitmentRequest,
  GetRecruitmentsParams,
} from '@/features/recruitment/types';

// 공고 목록 조회
export async function getRecruitments(
  params: GetRecruitmentsParams = {},
): Promise<ApiResponse<GetRecruitmentsResponse>> {
  const searchParams = new URLSearchParams();

  if (params.jobType) searchParams.set('jobType', params.jobType);
  if (params.name) searchParams.set('name', params.name);
  if (typeof params.page === 'number') searchParams.set('page', String(params.page));
  if (params.size) searchParams.set('size', String(params.size));
  const query = searchParams.toString();

  return await privateFetch<GetRecruitmentsResponse>(`/api/v1/posts${query ? `?${query}` : ''}`);
}

// 공고 상세 조회
export async function getRecruitmentDetail(
  postId: number,
): Promise<ApiResponse<GetRecruitmentDetailResponse>> {
  return await privateFetch<GetRecruitmentDetailResponse>(`/api/v1/posts/${postId}`, {
    next: { revalidate: 300, tags: ['recruitment', `recruitment-detail-${postId}`] },
  });
}

// 공고 게시 요청
export async function requestRecruitment(
  payload: RequestRecruitmentRequest,
): Promise<ApiResponse<null>> {
  const response = await privateFetch<null>(`/api/v1/posts/submissions`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return response;
}
