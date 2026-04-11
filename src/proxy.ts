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
        // Edge 호환성을 고려한 Set-Cookie 안전 추출
        let setCookieHeaders: string[] = [];
        if (typeof response.headers.getSetCookie === 'function') {
          setCookieHeaders = response.headers.getSetCookie();
        } else {
          // getSetCookie가 없는 환경을 위한 Fallback 로직
          const rawSetCookie = response.headers.get('set-cookie');
          if (rawSetCookie) {
            // 쿠키 날짜 포맷(Expires=Wed, 21 Oct 2015...)에 포함된 쉼표를 피해 분리하는 정규식
            setCookieHeaders = rawSetCookie.split(/,(?=\s*[a-zA-Z0-9_\-]+(?:=|$))/);
          }
        }

        // 하위(서버 컴포넌트/액션)로 전달될 request 헤더 업데이트
        const requestHeaders = new Headers(request.headers);

        // 새로 받은 쿠키들을 파싱하여 request 객체 내부 상태에 동기화
        setCookieHeaders.forEach((cookieStr) => {
          const [firstPart] = cookieStr.split(';');
          const [name, ...valueParts] = firstPart.split('=');
          if (name && valueParts.length > 0) {
            const value = valueParts.join('=').trim();
            request.cookies.set(name.trim(), value);
          }
        });

        // 내부 상태가 업데이트된 전체 쿠키 문자열을 requestHeaders에 덮어쓰기
        requestHeaders.set('cookie', request.cookies.toString());

        // 변경된 요청 헤더를 포함하여 NextResponse 생성 (현재 요청 흐름 수정)
        const nextResponse = NextResponse.next({
          request: {
            headers: requestHeaders,
          },
        });

        // 클라이언트 브라우저에 내려줄 응답 헤더에도 Set-Cookie 설정
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
