import { getUser, deleteUser } from '@/features/user/actions';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { redirect } from 'next/navigation';

export const userQueryOptions = () => ({
  queryKey: ['user'],
  queryFn: async () => {
    const result = await getUser();

    if (!result.success) {
      return Promise.reject(result);
    }

    return result.data;
  },
  // 캐싱 유지 시간
  staleTime: Infinity,
  // 언마운트 되어도 유지되는 시간
  gcTime: 1000 * 60 * 60 * 24, // 24시간
});

// 회원 정보 조회
export function useUser() {
  return useQuery(userQueryOptions());
}

// 회원 탈퇴
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteUser(),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['user'] });
      redirect('/login');
    },
    onError: (error) => {
      console.error('탈퇴 실패:', error);
    },
  });
}
