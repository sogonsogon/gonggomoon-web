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
            <span className="cursor-pointer text-sm font-medium text-gray-600">기업소개</span>
            <span className="cursor-pointer text-sm font-medium text-gray-600">광고문의</span>
            <span className="cursor-pointer text-sm font-medium text-gray-600">고객센터</span>
            <Link
              href={'https://www.notion.so/3287e3ab744a80eda1bec107c7c34fd4?source=copy_link'}
              target="_blank"
              className="cursor-pointer text-sm font-medium text-gray-600"
            >
              이용약관
            </Link>
            <span className="cursor-pointer text-sm font-medium text-gray-600">블로그</span>
            <Link
              href={'https://www.notion.so/3287e3ab744a80cc97d9ef5351dd55e0?source=copy_link'}
              target="_blank"
              className="cursor-pointer text-sm font-semibold text-gray-600"
            >
              개인정보 처리방침
            </Link>
          </div>
        </div>
        <div className="h-px bg-gray-200" />
        <div className="flex flex-col gap-1.5">
          <p className="text-xs text-gray-500">(주)소곤소곤</p>
          <p className="text-xs text-gray-500">
            서울특별시 송파구 백제고분로37길 22 원티드 그라운드&nbsp;&nbsp;|&nbsp;&nbsp;전화번호:
            02-000-0000
          </p>
          <p className="text-xs text-gray-500">
            사업자등록번호: 000-00-00000&nbsp;&nbsp;|&nbsp;&nbsp;통신판매번호:
            2024-서울강남-0000&nbsp;&nbsp;|&nbsp;&nbsp;유료직업소개사업등록번호: (국내)
            제2024-0000000-00-0-00000호
          </p>
        </div>
        <div className="h-px bg-gray-200" />
        <div className="flex items-center gap-6">
          <span className="cursor-pointer text-xs text-gray-500">채용서비스 문의</span>
          <span className="cursor-pointer text-xs text-gray-500">워크스페이스 문의</span>
          <span className="cursor-pointer text-xs text-gray-500">포폴전략 문의</span>
          <span className="cursor-pointer text-xs text-gray-500">모의면접 문의</span>
          <span className="cursor-pointer text-xs text-gray-500">취업지원시스템 문의</span>
          <span className="cursor-pointer text-xs text-gray-500">IR 문의</span>
        </div>
      </div>
      <div className="hidden w-full max-w-7xl items-center justify-between border-t border-gray-200 px-4 py-5 md:flex">
        <span className="text-xs text-gray-400">© 2026 소곤소곤, Inc.</span>
        <div className="flex items-center gap-4">
          <Instagram className="h-4.5 w-4.5 text-gray-400" />
          <Facebook className="h-4.5 w-4.5 text-gray-400" />
          <Youtube className="h-4.5 w-4.5 text-gray-400" />
          <Linkedin className="h-4.5 w-4.5 text-gray-400" />
        </div>
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
          <div className="flex items-center gap-3">
            <Instagram className="h-4 w-4 text-gray-400" />
            <Facebook className="h-4 w-4 text-gray-400" />
            <Youtube className="h-4 w-4 text-gray-400" />
            <Linkedin className="h-4 w-4 text-gray-400" />
          </div>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
          <span className="cursor-pointer text-xs text-gray-500">고객센터</span>
          <Link
            href={'https://www.notion.so/3287e3ab744a80eda1bec107c7c34fd4?source=copy_link'}
            target="_blank"
            className="cursor-pointer text-xs text-gray-500"
          >
            이용약관
          </Link>
          <Link
            href={'https://www.notion.so/3287e3ab744a80cc97d9ef5351dd55e0?source=copy_link'}
            target="_blank"
            className="cursor-pointer text-xs font-semibold text-gray-600"
          >
            개인정보 처리방침
          </Link>
        </div>
        <p className="mt-3 text-xs text-gray-400">© 2026 소곤소곤, Inc.</p>
      </div>
    </footer>
  );
}
