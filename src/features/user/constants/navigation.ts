import {
  UserIcon,
  BookmarkIcon,
  FolderIcon,
  BriefcaseIcon,
  LightbulbIcon,
  MessageCircleIcon,
  LucideIcon,
} from 'lucide-react';

export const ICON_MAP: Record<string, LucideIcon> = {
  profile: UserIcon,
  bookmark: BookmarkIcon,
  file: FolderIcon,
  experience: BriefcaseIcon,
  strategy: LightbulbIcon,
  interview: MessageCircleIcon,
};

export const MY_PAGE_NAV_ITEMS = [
  { href: '/my/profile', label: '프로필', iconKey: 'profile' },
  { href: '/my/bookmark', label: '북마크', iconKey: 'bookmark' },
  { href: '/my/file', label: '내 파일', iconKey: 'file' },
  { href: '/my/experience', label: '내 경험', iconKey: 'experience' },
  { href: '/my/strategy', label: '포폴 전략', iconKey: 'strategy' },
  { href: '/my/interview', label: '면접 질문', iconKey: 'interview' },
] as const;

export type NavItemKey = (typeof MY_PAGE_NAV_ITEMS)[number]['iconKey'];
