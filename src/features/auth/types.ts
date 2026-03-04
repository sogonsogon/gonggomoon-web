// 유저 role
export type UserRole = 'MEMBER' | 'ADMIN';

// 유저
export type User = {
  id: string;
  email: string;
  name: string;
  profileImageUrl: string | null;
  roles: UserRole[];
};
