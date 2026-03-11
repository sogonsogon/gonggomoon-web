import { logout } from '@/features/auth/actions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { redirect } from 'next/navigation';

// 로그아웃
export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      queryClient.clear();
      redirect('/login');
    },
  });
}
