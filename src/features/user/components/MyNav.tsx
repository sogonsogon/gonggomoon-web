import Link from 'next/link';
import { User, Bookmark, Folder, Briefcase, Lightbulb, MessageCircle } from 'lucide-react';

type MyNavProps = {
  activePath:
    | '/my/profile'
    | '/my/bookmark'
    | '/my/file'
    | '/my/experience'
    | '/my/strategy'
    | '/my/interview';
};

const navItems = [
  { href: '/my/profile', icon: User, label: '프로필' },
  { href: '/my/bookmark', icon: Bookmark, label: '북마크' },
  { href: '/my/file', icon: Folder, label: '내 파일' },
  { href: '/my/experience', icon: Briefcase, label: '내 경험' },
  { href: '/my/strategy', icon: Lightbulb, label: '포폴 전략' },
  { href: '/my/interview', icon: MessageCircle, label: '면접 질문' },
] as const;

export default function MyNav({ activePath }: MyNavProps) {
  return (
    <nav className="w-45 shrink-0">
      <div className="rounded-lg p-2">
        <p className="mb-1 w-full px-3 pb-1 text-xs font-semibold text-gray-500">마이페이지</p>
        <ul className="flex flex-col gap-1">
          {navItems.map(({ href, icon: Icon, label }) => {
            const isActive = activePath === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 ${
                    isActive ? 'bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                  <span
                    className={`text-sm ${
                      isActive ? 'font-semibold text-blue-700' : 'font-medium text-gray-700'
                    }`}
                  >
                    {label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
