import { User } from '@/features/auth/types';

export const mockUsers: User[] = [
  {
    id: 'u_1001',
    email: 'sooyeon.kim@example.com',
    name: '김수연',
    profileImageUrl: 'https://picsum.photos/seed/user1001/200/200',
    roles: ['MEMBER'],
  },
  {
    id: 'u_1002',
    email: 'admin@example.com',
    name: '관리자',
    profileImageUrl: null,
    roles: ['ADMIN'],
  },
];
