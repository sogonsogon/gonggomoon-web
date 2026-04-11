'use client';

import { createContext, useContext, useEffect, useRef } from 'react';
import { useStore } from 'zustand';
import { createAuthStore, type AuthStore, type AuthState } from '@/features/auth/stores/authStore';

export const AuthStoreContext = createContext<AuthStore | null>(null);

export function AuthStoreProvider({
  children,
  isLoggedIn,
}: {
  children: React.ReactNode;
  isLoggedIn: boolean;
}) {
  const storeRef = useRef<AuthStore>(null);

  if (!storeRef.current) {
    storeRef.current = createAuthStore({ isLoggedIn });
  }

  useEffect(() => {
    if (storeRef.current) {
      storeRef.current.setState({ isLoggedIn });
    }
  }, [isLoggedIn]);

  return <AuthStoreContext.Provider value={storeRef.current}>{children}</AuthStoreContext.Provider>;
}

export function useAuthStore<T>(selector: (state: AuthState) => T): T {
  const authStoreContext = useContext(AuthStoreContext);

  if (!authStoreContext) {
    throw new Error(`useAuthStore는 AuthStoreProvider 안에서 사용되어야 합니다.`);
  }

  return useStore(authStoreContext, selector);
}
