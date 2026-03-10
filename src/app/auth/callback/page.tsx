import { userQueryOptions } from '@/features/user/queries';
import { QueryClient } from '@tanstack/react-query';
import { redirect } from 'next/navigation';

export default async function CallbackPage() {
  const queryClient = new QueryClient();

  // 유저 정보 가져와서 관리
  await queryClient.prefetchQuery(userQueryOptions);

  // 메인페이지로 이동
  redirect('/');
}
