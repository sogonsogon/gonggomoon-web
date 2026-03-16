'use client';

import { userQueryOptions } from '@/features/user/queries';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CallbackPage() {
  const queryClient = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    const prefetchUser = async () => {
      await queryClient.fetchQuery(userQueryOptions());
      const redirectPath = sessionStorage.getItem('login_redirect_path') || '/';
      sessionStorage.removeItem('login_redirect_path');
      router.replace(redirectPath);
    };

    prefetchUser();
  }, [queryClient, router]);

  return null;
}
