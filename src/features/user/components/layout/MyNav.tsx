import { MY_PAGE_NAV_ITEMS } from '@/features/user/constants/navigation';
import MyNavItem from '@/features/user/components/layout/MyNavItem';

export default function MyNav() {
  return (
    <nav className="w-45 shrink-0">
      <div className="rounded-lg p-2">
        <p className="mb-1 w-full px-3 pb-1 text-xs font-semibold text-gray-500">마이페이지</p>
        <ul className="flex flex-col gap-1">
          {MY_PAGE_NAV_ITEMS.map((item) => (
            <MyNavItem key={item.href} {...item} />
          ))}
        </ul>
      </div>
    </nav>
  );
}
