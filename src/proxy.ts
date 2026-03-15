import { NextRequest, NextResponse } from 'next/server';

const BASE_API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;

export async function proxy(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;

  const isTokenExpired = !accessToken;

  if (isTokenExpired && refreshToken) {
    try {
      // 2. 토큰 재발급 API 호출
      const refreshApiUrl = `${BASE_API_URL}/api/v1/auth/reissue`;
      const refreshRes = await fetch(refreshApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `refreshToken=${refreshToken}`,
        },
      });

      if (refreshRes.ok) {
        const result = await refreshRes.json();

        if (result.success && result.data) {
          const newAccessToken = result.data.accessToken;
          const newRefreshToken = result.data.refreshToken;

          request.cookies.set('access_token', newAccessToken);
          request.cookies.set('refresh_token', newRefreshToken);

          const requestHeaders = new Headers(request.headers);
          requestHeaders.set('Cookie', request.cookies.toString());

          const response = NextResponse.next({
            request: { headers: requestHeaders },
          });

          response.cookies.set('access_token', newAccessToken, {
            maxAge: 60 * 60, // 1시간
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
            path: '/',
          });
          response.cookies.set('refresh_token', newRefreshToken, {
            maxAge: 60 * 60 * 24 * 14, // 14일
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
            path: '/',
          });

          return response;
        }
      }
    } catch (error) {
      // 갱신 실패 시 조작 없이 통과 (이후 httpClient가 401/SESSION_EXPIRED 반환)
    }
  }

  return NextResponse.next();
}

// 정적 자원(이미지, 폰트 등) 요청에는 실행되지 않도록 최적화
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
