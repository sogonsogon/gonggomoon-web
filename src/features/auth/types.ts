// 유저 role
export type UserRole = 'MEMBER' | 'ADMIN';

// 유저
export type User = {
  email: string;
  name: string;
  profileImageUrl: string | null;
  roles: UserRole[];
};
