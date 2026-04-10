import { createStore } from 'zustand/vanilla';

export type AuthState = {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
};

export const createAuthStore = (initProps?: Partial<AuthState>) => {
  return createStore<AuthState>()((set) => ({
    isLoggedIn: initProps?.isLoggedIn ?? false,
    setIsLoggedIn: (value) => set({ isLoggedIn: value }),
  }));
};

export type AuthStore = ReturnType<typeof createAuthStore>;
