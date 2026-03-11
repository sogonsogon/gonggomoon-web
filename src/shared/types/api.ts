// 성공 응답 타입
export interface ApiSuccessResponse<T> {
  success: true;
  code: string;
  message: string;
  data: T;
  timestamp?: string;
}

// 실패 응답의 상세 에러 배열 타입
export interface ApiErrorDetail {
  field: string;
  reason: string;
}

// 실패 응답 타입
export interface ApiErrorResponse {
  success: false;
  code: string;
  message: string;
  data: null;
  errors?: ApiErrorDetail[];
  timestamp?: string;
}

// 공통 응답 유니온 타입
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
