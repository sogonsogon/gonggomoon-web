import { Instagram, Facebook, Youtube, Linkedin } from 'lucide-react';
import Image from 'next/image';
import logo from '@/shared/assets/images/logo.png';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="flex flex-col items-center w-full border-t border-gray-200 bg-gray-50">
      <div className="hidden w-full max-w-7xl flex-col gap-6 px-4 py-10 md:flex">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Image
              src={logo}
              alt="공고문"
              sizes="100vw"
              style={{ width: '100px', height: 'auto' }}
            />
          </div>
          <div className="flex items-center gap-6">
            <Link
              href={'https://www.notion.so/3287e3ab744a80eda1bec107c7c34fd4?source=copy_link'}
              target="_blank"
              className="cursor-pointer text-sm font-medium text-gray-600"
            >
              이용약관
            </Link>
            <Link
              href={'https://www.notion.so/3287e3ab744a80cc97d9ef5351dd55e0?source=copy_link'}
              target="_blank"
              className="cursor-pointer text-sm font-medium text-gray-600"
            >
              개인정보 처리방침
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden w-full max-w-7xl items-center justify-between border-t border-gray-200 px-4 py-5 md:flex">
        <span className="text-xs text-gray-400">© 2026 소곤소곤</span>
      </div>

      <div className="w-full px-4 pb-[calc(env(safe-area-inset-bottom)+8.5rem)] pt-5 md:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Image
              src={logo}
              alt="공고문"
              sizes="100vw"
              style={{ width: '100px', height: 'auto' }}
            />
          </div>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
          <Link
            href={'https://www.notion.so/3287e3ab744a80eda1bec107c7c34fd4?source=copy_link'}
            target="_blank"
            className="cursor-pointer text-xs font-medium text-gray-500"
          >
            이용약관
          </Link>
          <Link
            href={'https://www.notion.so/3287e3ab744a80cc97d9ef5351dd55e0?source=copy_link'}
            target="_blank"
            className="cursor-pointer text-xs font-medium text-gray-600"
          >
            개인정보 처리방침
          </Link>
        </div>
        <p className="mt-3 text-xs text-gray-400">© 2026 소곤소곤</p>
      </div>
    </footer>
  );
}
