'use server';

import { privateFetch, publicFetch } from '@/shared/api/httpClient';
import { ApiResponse } from '@/shared/types/api';
import {
  GetRecruitmentDetailResponse,
  GetRecruitmentsResponse,
  RequestRecruitmentRequest,
  GetRecruitmentsParams,
  GetRecruitmentPlatformsResponse,
} from '@/features/recruitment/types';

// 공고 목록 조회
export async function getRecruitments(
  params: GetRecruitmentsParams = {},
): Promise<ApiResponse<GetRecruitmentsResponse>> {
  const searchParams = new URLSearchParams();

  if (params.jobType) searchParams.set('jobType', params.jobType);
  if (params.title) searchParams.set('title', params.title);
  if (typeof params.page === 'number') searchParams.set('page', String(params.page));
  if (typeof params.size === 'number') searchParams.set('size', String(params.size));
  const query = searchParams.toString();

  return await publicFetch<GetRecruitmentsResponse>(`/api/v1/posts${query ? `?${query}` : ''}`, {
    next: { revalidate: 60, tags: ['recruitmentList'] },
  });
}

// 공고 상세 조회
export async function getRecruitmentDetail(
  postId: number,
): Promise<ApiResponse<GetRecruitmentDetailResponse>> {
  return await publicFetch<GetRecruitmentDetailResponse>(`/api/v1/posts/${postId}`, {
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

// 플랫폼 목록 조회
export async function getRecruitmentPlatforms(): Promise<
  ApiResponse<GetRecruitmentPlatformsResponse>
> {
  return await privateFetch<GetRecruitmentPlatformsResponse>(`/api/v1/platforms`);
}
