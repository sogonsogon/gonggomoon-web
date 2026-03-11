import { cookies } from 'next/headers';
import { ApiResponse, ApiErrorResponse, ApiSuccessResponse } from '@/shared/types/api';

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;
// 로컬 테스트를 위한 14일 기간의 엑세스 토큰
const ACCESS_TOKEN = process.env.DEV_ACCESS_TOKEN;

/**
 * 내부 헬퍼 함수: 예상치 못한 시스템/네트워크 에러를 표준 실패 포맷으로 규격화
 */
function createErrorResponse(code: string, message: string): ApiErrorResponse {
  return {
    success: false,
    code,
    message,
    data: null,
    errors: [],
    timestamp: new Date().toISOString(),
  };
}

/**
 * [Token O] 인증이 필요한 공통 Fetch
 * - proxy.ts에서 이미 갱신 처리를 완료했다고 가정
 * - 여기서 401이 발생하면 토큰이 완전히 만료된 상태이므로 세션 만료 에러를 반환
 */
export async function privateFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  // const cookieStore = await cookies();
  // const currentToken = cookieStore.get('accessToken')?.value;

  // if (!currentToken) {
  //   return createErrorResponse('SESSION_EXPIRED', '접근 권한이 없습니다. 다시 로그인해 주세요.');
  // }

  try {
    const response = await fetch(`${BASE_API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        ...options.headers,
      },
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      if (response.status === 401) {
        return createErrorResponse(
          'SESSION_EXPIRED',
          '세션이 만료되었습니다. 다시 로그인해 주세요.',
        );
      }

      return {
        success: false,
        code: result.code || 'HTTP_ERROR',
        message: result.message || '요청 처리에 실패했습니다.',
        data: null,
        errors: result.errors || [],
      };
    }

    return result as ApiSuccessResponse<T>;
  } catch (error) {
    return createErrorResponse('NETWORK_ERROR', '서버와의 통신에 실패했습니다.');
  }
}

/**
 * [Token X] 인증이 필요 없는 공통 Fetch
 */
export async function publicFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${BASE_API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      return {
        success: false,
        code: result.code || 'HTTP_ERROR',
        message: result.message || '요청 처리에 실패했습니다.',
        data: null,
        errors: result.errors || [],
      };
    }

    return result as ApiSuccessResponse<T>;
  } catch (error) {
    return createErrorResponse('NETWORK_ERROR', '서버와의 통신에 실패했습니다.');
  }
}
