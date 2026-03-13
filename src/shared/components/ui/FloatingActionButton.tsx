import Link from 'next/link';
import { ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';

type FloatingActionButtonBaseProps = {
  icon: ReactNode;
  label: ReactNode;
  ariaLabel: string;
  wrapperClassName?: string;
  buttonClassName?: string;
  labelClassName?: string;
};

type FloatingActionButtonProps =
  | (FloatingActionButtonBaseProps & {
      href: string;
      onClick?: never;
    })
  | (FloatingActionButtonBaseProps & {
      onClick: () => void;
      href?: never;
    });

export default function FloatingActionButton({
  icon,
  label,
  ariaLabel,
  href,
  onClick,
  wrapperClassName,
  buttonClassName,
  labelClassName,
}: FloatingActionButtonProps) {
  const wrapperClass = cn('fixed bottom-8 right-8 z-50', wrapperClassName);

  const interactiveClass = cn(
    'flex flex-col items-center gap-1.5 rounded-md',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3182f6] focus-visible:ring-offset-2',
  );

  const buttonClass = cn(
    'flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition hover:bg-gray-50',
    buttonClassName,
  );

  const textClass = cn(
    'text-center text-[11px] font-medium leading-tight text-gray-600',
    labelClassName,
  );

  const content = (
    <>
      <div className={buttonClass}>{icon}</div>
      <span className={textClass}>{label}</span>
    </>
  );

  if (href) {
    return (
      <div className={wrapperClass}>
        <Link href={href} aria-label={ariaLabel} className={interactiveClass}>
          {content}
        </Link>
      </div>
    );
  }

  return (
    <div className={wrapperClass}>
      <button
        type="button"
        onClick={onClick}
        aria-label={ariaLabel}
        className={cn(interactiveClass, 'cursor-pointer')}
      >
        {content}
      </button>
    </div>
  );
}
