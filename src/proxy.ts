import { ReissueTokenResponse } from '@/features/auth/types';
import { publicFetch } from '@/shared/api/httpClient';
import { isProtectedRoute } from '@/shared/utils/isProtectedRoute';
import { NextRequest, NextResponse } from 'next/server';

const BASE_API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;

function redirectToLoginRequired(request: NextRequest): NextResponse {
  const referer = request.headers.get('referer');
  let redirectUrl: URL;

  if (referer) {
    redirectUrl = new URL(referer);
  } else {
    redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/';
  }

  redirectUrl.searchParams.set('loginRequired', 'true');

  return NextResponse.redirect(redirectUrl);
}

export async function proxy(request: NextRequest) {
  // if (process.env.NODE_ENV === 'development') {
  //   return NextResponse.next();
  // }

  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('access_token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;

  // access_token도 refresh_token도 없는 완전 비로그인
  if (!accessToken && !refreshToken) {
    if (isProtectedRoute(pathname)) {
      return redirectToLoginRequired(request);
    }
    return NextResponse.next();
  }

  const isTokenExpired = !accessToken;

  if (isTokenExpired && refreshToken) {
    try {
      // 토큰 재발급 API 호출
      const refreshApiUrl = `${BASE_API_URL}/api/v1/auth/reissue`;
      const response = await fetch(refreshApiUrl, {
        method: 'POST',
        headers: {
          Cookie: `refresh_token=${refreshToken}`,
        },
      });

      if (response.ok) {
        const nextResponse = NextResponse.next();
        const setCookieHeaders = response.headers.getSetCookie?.() ?? [];
        for (const cookie of setCookieHeaders) {
          nextResponse.headers.append('Set-Cookie', cookie);
        }
        return nextResponse;
      }
    } catch (error) {
      // 갱신 실패
    }

    // refresh_token은 있었지만 재발급 실패 → 보호 경로면 로그인 모달로
    if (isProtectedRoute(pathname)) {
      return redirectToLoginRequired(request);
    }
  }

  return NextResponse.next();
}

// 정적 자원(이미지, 폰트 등) 요청에는 실행되지 않도록 최적화
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
