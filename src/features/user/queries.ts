import { getUser, withdrawUser } from '@/features/user/actions';
import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { redirect } from 'next/navigation';

export const userQueryOptions = {
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
};

// 회원 정보 조회
export function useUser() {
  // useSuspenseQuery를 사용하면, 로딩과 에러 처리를 외부로 위임
  // Next.js 프레임워크가 가로채서 loading.tsx, error.tsx 띄움
  return useQuery(userQueryOptions);
}

// 회원 탈퇴
export function useWithdrawUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => withdrawUser(),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['user'] });
      redirect('/login');
    },
    onError: (error) => {
      console.error('탈퇴 실패:', error);
    },
  });
}
