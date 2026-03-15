import type {
  ApiResponse,
  ApiErrorResponse,
  ApiSuccessResponse,
  ApiErrorDetail,
} from '@/shared/types/api';
import {
  createFetchDebugInfo,
  fillResponseDebugInfo,
  logApiFailure,
  logConfigError,
  logRequestFailed,
  logRequestSuccess,
  logUnexpectedError,
  parseResponseBody,
} from '@/shared/api/httpClient.debug';
import { cookies } from 'next/headers';

// 서버 환경: API_URL (런타임, localhost 가능)
// 클라이언트 환경: NEXT_PUBLIC_API_URL (빌드타임 번들, 공개 IP 필요)
const BASE_API_URL = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;

/**
 * 내부 헬퍼 함수: 예상치 못한 시스템/네트워크 에러를 표준 실패 포맷으로 규격화
 */
function createErrorResponse(
  code: string,
  message: string,
  errors: ApiErrorDetail[] = [],
  timestamp: string = new Date().toISOString(),
): ApiErrorResponse {
  return {
    success: false,
    code,
    message,
    data: null,
    errors,
    timestamp,
  };
}

function createSuccessResponse<T>(
  data: T,
  code: string = 'SUCCESS',
  message: string = '요청에 성공했습니다.',
  timestamp: string = new Date().toISOString(),
): ApiSuccessResponse<T> {
  return {
    success: true,
    code,
    message,
    data,
    timestamp,
  };
}

async function requestApi<T>(
  endpoint: string,
  options: RequestInit = {},
  config?: {
    requireAuth?: boolean;
    accessToken?: string;
    sessionExpiredMessage?: string;
  },
): Promise<ApiResponse<T>> {
  const requireAuth = config?.requireAuth ?? false;
  const accessToken = config?.accessToken;
  const sessionExpiredMessage =
    config?.sessionExpiredMessage ?? '세션이 만료되었습니다. 다시 로그인해 주세요.';

  if (!BASE_API_URL && !endpoint.startsWith('http')) {
    logConfigError(endpoint, options);
    return createErrorResponse('CONFIG_ERROR', 'NEXT_PUBLIC_API_URL이 설정되지 않았습니다.');
  }

  if (requireAuth && !accessToken) {
    return createErrorResponse('SESSION_EXPIRED', '접근 권한이 없습니다. 다시 로그인해 주세요.');
  }

  const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData;

  const headers = new Headers(options.headers);

  if (requireAuth && accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  if (!isFormData) {
    if (!headers.get('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }
  } else {
    headers.delete('Content-Type');
  }

  const url = endpoint.startsWith('http') ? endpoint : `${BASE_API_URL}${endpoint}`;
  const debugInfo = createFetchDebugInfo(url, options, headers, isFormData);

  try {
    const response = await fetch(url, {
      ...options,
      method: options.method || 'GET',
      headers,
    });

    fillResponseDebugInfo(debugInfo, response);

    const result = await parseResponseBody<T>(response, debugInfo);

    if (!response.ok) {
      logRequestFailed(debugInfo);

      if (response.status === 401) {
        return createErrorResponse(
          'SESSION_EXPIRED',
          sessionExpiredMessage,
          result.errors ?? [],
          result.timestamp,
        );
      }

      return createErrorResponse(
        result.code || 'HTTP_ERROR',
        result.message || '요청 처리에 실패했습니다.',
        result.errors ?? [],
        result.timestamp,
      );
    }

    if (result.success !== true) {
      logApiFailure(debugInfo, result.message);

      return createErrorResponse(
        result.code || 'HTTP_ERROR',
        result.message || '요청 처리에 실패했습니다.',
        result.errors ?? [],
        result.timestamp,
      );
    }

    logRequestSuccess(debugInfo);

    return createSuccessResponse<T>(
      result.data as T,
      result.code ?? 'SUCCESS',
      result.message ?? '요청에 성공했습니다.',
      result.timestamp ?? new Date().toISOString(),
    );
  } catch (error) {
    logUnexpectedError(debugInfo, error);
    return createErrorResponse('NETWORK_ERROR', '서버와의 통신에 실패했습니다.');
  }
}

/**
 * [Token O] 인증이 필요한 공통 Fetch
 * - proxy.ts에서 이미 갱신 처리를 완료했다고 가정
 * - 여기서 401이 발생하면 토큰이 완전히 만료된 상태이므로 세션 만료 에러를 반환
 * - 개발 환경에서 DEV_ACCESS_TOKEN이 있으면 쿠키 대신 사용
 */
export async function privateFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  const isDev = process.env.NODE_ENV === 'development';
  const devToken = process.env.DEV_ACCESS_TOKEN;

  let currentToken: string | undefined;

  if (isDev && devToken) {
    currentToken = devToken;
  } else {
    const cookieStore = await cookies();
    currentToken = cookieStore.get('access_token')?.value;
  }

  if (!currentToken) {
    return createErrorResponse('SESSION_EXPIRED', '접근 권한이 없습니다. 다시 로그인해 주세요.');
  }

  return requestApi<T>(endpoint, options, {
    requireAuth: true,
    accessToken: currentToken,
    sessionExpiredMessage: '세션이 만료되었습니다. 다시 로그인해 주세요.',
  });
}

/**
 * [Token X] 인증이 필요 없는 공통 Fetch
 */
export async function publicFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  return requestApi<T>(endpoint, options, {
    requireAuth: false,
  });
}
