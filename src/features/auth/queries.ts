import { logout } from '@/features/auth/actions';
import { companyKeys } from '@/features/company/queries';
import { industryKeys } from '@/features/industry/queries';
import { recruitmentKeys } from '@/features/recruitment/queries';
import { useAuthStore } from '@/shared/provider/AuthProvider';
import { isProtectedRoute } from '@/shared/utils/isProtectedRoute';
import { Query, useMutation, useQueryClient } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';

// 로그아웃
export function useLogout() {
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const router = useRouter();
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
  return useMutation({
    mutationFn: async () => {
      queryClient.removeQueries({
        predicate: (query: Query) => {
          const publicKeys = [...companyKeys.all, ...industryKeys.all, ...recruitmentKeys.all];
          const currentKey = query.queryKey[0] as string;
          return !publicKeys.includes(currentKey);
        },
      });
      if (isProtectedRoute(pathname)) router.replace('/');
      await logout();
      setIsLoggedIn(false);
    },
  });
}
