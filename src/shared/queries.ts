import { GetGenerationStatusResponse } from '@/shared/types';

export async function getGenerationStatus(id: number): Promise<GetGenerationStatusResponse> {
  // TODO: 실제 polling API 연동 후 교체
  // 예시:
  // const response = await fetch(`/api/generations/${id}`, { method: 'GET' });
  // if (!response.ok) throw new Error('생성 상태 조회에 실패했습니다.');
  // return response.json();

  console.log('생성 상태 polling 요청 id:', id);

  return {
    id,
    status: 'PROCESSING',
    error: null,
  };
}
