import { companyKeys } from '@/features/company/queries';
import { industryKeys } from '@/features/industry/queries';
import { recruitmentKeys } from '@/features/recruitment/queries';
import { getUser, deleteUser } from '@/features/user/actions';
import { useAuthStore } from '@/shared/provider/AuthProvider';
import { Query, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const userQueryOptions = () => ({
  queryKey: ['user'],
  queryFn: async () => {
    const result = await getUser();

    if (!result.success) {
      return Promise.reject(result);
    }

    return result.data;
  },
  staleTime: Infinity,
  gcTime: 1000 * 60 * 60 * 24,
});

// 회원 정보 조회
export function useUser(options?: { enabled?: boolean }) {
  return useQuery({ ...userQueryOptions(), enabled: options?.enabled });
}

// 회원 탈퇴
export function useDeleteUser() {
  const queryClient = useQueryClient();
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
  return useMutation({
    mutationFn: () => deleteUser(),
    onSuccess: () => {
      queryClient.removeQueries({
        predicate: (query: Query) => {
          const publicKeys = [...companyKeys.all, ...industryKeys.all, ...recruitmentKeys.all];
          const currentKey = query.queryKey[0] as string;
          return !publicKeys.includes(currentKey);
        },
      });
      setIsLoggedIn(false);
    },
    onError: (error) => {
      console.error('탈퇴 실패:', error);
    },
  });
}
