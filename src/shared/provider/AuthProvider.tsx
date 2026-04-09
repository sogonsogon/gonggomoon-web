// src/shared/providers/AuthProvider.tsx
'use client';

import { createContext, useContext, useState, useEffect } from 'react';

type AuthContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
};

// 변경 함수도 함께 Context에 담습니다.
const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export function AuthProvider({
  isLoggedIn: initialIsLoggedIn,
  children,
}: {
  isLoggedIn: boolean;
  children: React.ReactNode;
}) {
  // 서버에서 넘겨받은 초기값으로 useState 세팅
  const [isLoggedIn, setIsLoggedIn] = useState(initialIsLoggedIn);

  // Next.js 라우터 이동 등으로 서버 초기값이 변경될 때 동기화 (안전장치)
  useEffect(() => {
    setIsLoggedIn(initialIsLoggedIn);
  }, [initialIsLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
