import { Instagram, Facebook, Youtube, Linkedin } from 'lucide-react';
import Image from 'next/image';
import logo from '@/shared/assets/images/logo.png';

export default function Footer() {
  return (
    <footer className="flex flex-col items-center w-full border-t border-gray-200 bg-gray-50">
      <div className="flex flex-col gap-6 py-10 w-full max-w-7xl px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Image src={logo} alt="공고문" width={100} height={32} />
          </div>
          <div className="flex items-center gap-6">
            <span className="cursor-pointer text-sm font-medium text-gray-600">기업소개</span>
            <span className="cursor-pointer text-sm font-medium text-gray-600">광고문의</span>
            <span className="cursor-pointer text-sm font-medium text-gray-600">고객센터</span>
            <span className="cursor-pointer text-sm font-medium text-gray-600">이용약관</span>
            <span className="cursor-pointer text-sm font-medium text-gray-600">블로그</span>
            <span className="cursor-pointer text-sm font-semibold text-gray-600">
              개인정보 처리방침
            </span>
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
      <div className="flex items-center justify-between border-t border-gray-200 px-4 w-full max-w-7xl py-5">
        <span className="text-xs text-gray-400">© 2026 소곤소곤, Inc.</span>
        <div className="flex items-center gap-4">
          <Instagram className="h-4.5 w-4.5 text-gray-400" />
          <Facebook className="h-4.5 w-4.5 text-gray-400" />
          <Youtube className="h-4.5 w-4.5 text-gray-400" />
          <Linkedin className="h-4.5 w-4.5 text-gray-400" />
        </div>
      </div>
    </footer>
  );
}
