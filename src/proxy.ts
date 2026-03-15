import { NextRequest, NextResponse } from 'next/server';

const BASE_API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;

export async function proxy(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;

  // 토큰 재발급
  if (!accessToken && refreshToken) {
    try {
      const refreshRes = await fetch(`${BASE_API_URL}/api/v1/auth/reissue`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      if (refreshRes.ok) {
        const tokenData = await refreshRes.json();
        const newAccessToken = tokenData.accessToken;
        const newRefreshToken = tokenData.refreshToken;

        const requestHeaders = new Headers(request.headers);
        let cookieString = requestHeaders.get('cookie') || '';

        if (cookieString.includes('access_token=')) {
          // 기존 쿠키에 엑세스 토큰이 있을 경우 교체
          cookieString = cookieString.replace(
            /access_token=[^;]+/,
            `access_token=${newAccessToken}`,
          );
        } else {
          // 기존 쿠키에 없을 경우 쿠키에 추가
          cookieString = cookieString
            ? `${cookieString}; access_token=${newAccessToken}`
            : `access_token=${newAccessToken}`;
        }

        if (newRefreshToken) {
          if (cookieString.includes('refresh_token=')) {
            // 기존 쿠키에 리프레시 토큰이 있을 경우 교체
            cookieString = cookieString.replace(
              /refresh_token=[^;]+/,
              `refresh_token=${newRefreshToken}`,
            );
          } else {
            // 기존 쿠키에 없을 경우 쿠키에 추가
            cookieString += `; refresh_token=${newRefreshToken}`;
          }
        }

        requestHeaders.set('cookie', cookieString);

        const response = NextResponse.next({
          request: { headers: requestHeaders },
        });

        response.cookies.set('access_token', newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'none',
          path: '/',
          maxAge: 60 * 59, // Proxy에서 선제적 만료 처리
        });

        if (newRefreshToken) {
          response.cookies.set('refresh_token', newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
            path: '/',
            maxAge: 60 * 60 * 24 * 14,
          });
        }

        return response;
      } else {
        const response = NextResponse.next();
        response.cookies.delete('access_token');
        response.cookies.delete('refresh_token');
        return response;
      }
    } catch (error) {
      console.error('[Proxy] 토큰 재발급 실패', error);
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
