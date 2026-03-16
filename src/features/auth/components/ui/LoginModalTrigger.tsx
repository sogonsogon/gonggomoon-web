'use client';

import { useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useLoginModal } from '@/features/auth/stores/useLoginModal';

export default function LoginModalTrigger() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const openDialog = useLoginModal((s) => s.openDialog);

  useEffect(() => {
    if (searchParams.get('loginRequired') === 'true') {
      openDialog();
      const params = new URLSearchParams(searchParams.toString());
      params.delete('loginRequired');
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname);
    }
  }, [searchParams, pathname, router, openDialog]);

  return null;
}