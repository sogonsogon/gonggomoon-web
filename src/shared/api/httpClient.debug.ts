import type { ApiErrorDetail } from '@/shared/types/api';

const ENABLE_FETCH_DEBUG = process.env.NODE_ENV !== 'production';

const LOG_LABELS = {
  REQUEST_SUCCESS: 'Request success (요청 성공)',
  REQUEST_FAILED: 'Request failed (요청 실패)',
  API_ERROR_CODE: 'API returned failure payload (응답 실패 payload)',
  UNEXPECTED_ERROR: 'Unexpected error (예상치 못한 오류)',
} as const;

type LogSchema = {
  '요청(request)': {
    url: string;
    method: string;
    headers: Record<string, string>;
    body?: string;
  };
  '응답(response)': {
    status?: number;
    statusText?: string;
    headers?: Record<string, string>;
    bodyRaw?: string;
    bodyJson?: unknown;
  };
  '오류(error)'?: {
    name?: string;
    message: string;
    stack?: string;
    cause?: unknown;
  };
};

export type FetchDebugInfo = {
  url: string;
  method: string;
  requestHeaders: Record<string, string>;
  requestBodyPreview?: string;
  status?: number;
  statusText?: string;
  responseHeaders?: Record<string, string>;
  responseBodyRaw?: string;
  responseBodyJson?: unknown;
};

export type ParsedApiResult<T> = {
  success?: boolean;
  code?: string;
  message?: string;
  data?: T | null;
  errors?: ApiErrorDetail[];
  timestamp?: string;
};

function debugLog(level: 'info' | 'error', label: string, payload: unknown): void {
  if (!ENABLE_FETCH_DEBUG) return;
  console[level](label, payload);
}

function headersToObject(headers: Headers): Record<string, string> {
  return Object.fromEntries(headers.entries());
}

function maskSensitiveHeaders(headers: Record<string, string>): Record<string, string> {
  const masked = { ...headers };

  const mask = (value?: string | null) =>
    value ? value.replace(/^(.{0,8}).+$/, '$1***') : (value ?? '');

  if (masked.Authorization) masked.Authorization = mask(masked.Authorization);
  if (masked.authorization) masked.authorization = mask(masked.authorization);

  if (masked.Cookie) masked.Cookie = '***';
  if (masked.cookie) masked.cookie = '***';

  if (masked['Set-Cookie']) masked['Set-Cookie'] = '***';
  if (masked['set-cookie']) masked['set-cookie'] = '***';

  return masked;
}

function normalizeErrors(errors: unknown): ApiErrorDetail[] {
  if (!Array.isArray(errors)) return [];
  return errors as ApiErrorDetail[];
}

function buildBodyPreview(body: RequestInit['body'], isFormData: boolean): string | undefined {
  if (!body) return undefined;

  if (isFormData && body instanceof FormData) {
    const keys = Array.from(body.keys());
    return `FormData(keys=${JSON.stringify(keys)})`;
  }

  if (typeof body === 'string') {
    return body.length > 2000 ? `${body.slice(0, 2000)}...(truncated)` : body;
  }

  if (body instanceof ArrayBuffer) {
    return `ArrayBuffer(byteLength=${body.byteLength})`;
  }

  if (typeof Blob !== 'undefined' && body instanceof Blob) {
    return `Blob(size=${body.size}, type=${body.type})`;
  }

  return `Body(type=${Object.prototype.toString.call(body)})`;
}

function buildLogPayload(debugInfo: FetchDebugInfo, extra?: LogSchema['오류(error)']): LogSchema {
  return {
    '요청(request)': {
      url: debugInfo.url,
      method: debugInfo.method,
      headers: debugInfo.requestHeaders,
      body: debugInfo.requestBodyPreview,
    },
    '응답(response)': {
      status: debugInfo.status,
      statusText: debugInfo.statusText,
      headers: debugInfo.responseHeaders,
      bodyRaw: debugInfo.responseBodyRaw,
      bodyJson: debugInfo.responseBodyJson,
    },
    ...(extra
      ? {
          '오류(error)': extra,
        }
      : {}),
  };
}

export function createFetchDebugInfo(
  url: string,
  options: RequestInit,
  headers: Headers,
  isFormData: boolean,
): FetchDebugInfo {
  return {
    url,
    method: (options.method || 'GET').toUpperCase(),
    requestHeaders: maskSensitiveHeaders(headersToObject(headers)),
    requestBodyPreview: buildBodyPreview(options.body, isFormData),
  };
}

export function fillResponseDebugInfo(debugInfo: FetchDebugInfo, response: Response): void {
  debugInfo.status = response.status;
  debugInfo.statusText = response.statusText;
  debugInfo.responseHeaders = maskSensitiveHeaders(headersToObject(response.headers));
}

export async function parseResponseBody<T>(
  response: Response,
  debugInfo: FetchDebugInfo,
): Promise<ParsedApiResult<T>> {
  const raw = await response.text();

  debugInfo.responseBodyRaw = raw.length > 8000 ? `${raw.slice(0, 8000)}...(truncated)` : raw;

  const contentType = response.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    try {
      const parsed = raw ? JSON.parse(raw) : null;
      debugInfo.responseBodyJson = parsed;

      return {
        success: parsed?.success,
        code: parsed?.code,
        message: parsed?.message,
        data: parsed?.data ?? null,
        errors: normalizeErrors(parsed?.errors),
        timestamp: parsed?.timestamp,
      };
    } catch (error) {
      debugInfo.responseBodyJson = { parseError: String(error) };

      return {
        success: false,
        code: 'INVALID_JSON',
        message: '응답 JSON 파싱에 실패했습니다.',
        data: null,
        errors: [],
        timestamp: new Date().toISOString(),
      };
    }
  }

  const fallback: ParsedApiResult<T> = {
    success: false,
    code: 'NON_JSON_RESPONSE',
    message: raw || 'JSON 형식이 아닌 응답입니다.',
    data: null,
    errors: [],
    timestamp: new Date().toISOString(),
  };

  debugInfo.responseBodyJson = fallback;
  return fallback;
}

export function logRequestSuccess(debugInfo: FetchDebugInfo): void {
  debugLog(
    'info',
    LOG_LABELS.REQUEST_SUCCESS,
    `${debugInfo.method} ${debugInfo.url} -> ${debugInfo.status}`,
  );
}

export function logRequestFailed(debugInfo: FetchDebugInfo): void {
  debugLog('error', LOG_LABELS.REQUEST_FAILED, buildLogPayload(debugInfo));
}

export function logApiFailure(debugInfo: FetchDebugInfo, message?: string): void {
  debugLog(
    'error',
    LOG_LABELS.API_ERROR_CODE,
    buildLogPayload(debugInfo, {
      name: 'ApiFailurePayload',
      message: message || 'success=false 응답이 반환되었습니다.',
    }),
  );
}

export function logUnexpectedError(debugInfo: FetchDebugInfo, error: unknown): void {
  const errObj =
    error instanceof Error
      ? {
          name: error.name,
          message: error.message,
          stack: error.stack,
          cause: error.cause,
        }
      : {
          message: String(error),
        };

  debugLog('error', LOG_LABELS.UNEXPECTED_ERROR, buildLogPayload(debugInfo, errObj));
}

export function logConfigError(endpoint: string, options: RequestInit = {}): void {
  const debugInfo: FetchDebugInfo = {
    url: endpoint,
    method: (options.method || 'GET').toUpperCase(),
    requestHeaders: {},
  };

  debugLog(
    'error',
    LOG_LABELS.UNEXPECTED_ERROR,
    buildLogPayload(debugInfo, {
      name: 'ConfigError',
      message: 'NEXT_PUBLIC_API_URL이 설정되지 않았습니다.',
    }),
  );
}
