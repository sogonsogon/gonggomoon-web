import Link from 'next/link';
import { ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';

type FloatingActionButtonProps = {
  icon: ReactNode;
  label: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
};

export default function FloatingActionButton({
  icon,
  label,
  href,
  onClick,
  className,
}: FloatingActionButtonProps) {
  const wrapperClass = cn(
    'fixed bottom-8 right-8 z-50 flex flex-col items-center gap-1.5',
    className,
  );

  const buttonClass =
    'flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition hover:bg-gray-50';

  const labelClass = 'text-center text-[11px] font-medium leading-tight text-gray-600';

  const content = (
    <>
      <div className={buttonClass}>{icon}</div>
      <span className={labelClass}>{label}</span>
    </>
  );

  if (href) {
    return (
      <div className={wrapperClass}>
        <Link href={href} className="flex flex-col items-center gap-1.5">
          {content}
        </Link>
      </div>
    );
  }

  return (
    <button type="button" onClick={onClick} className={cn(wrapperClass, 'cursor-pointer')}>
      {content}
    </button>
  );
}
