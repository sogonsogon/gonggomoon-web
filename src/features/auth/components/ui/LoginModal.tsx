'use client';

import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { MoonStar, Search, Sparkles, MessagesSquare } from 'lucide-react';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function LoginModal({ open, onClose }: LoginModalProps) {
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) onClose();
  };

  const handleLogin = async () => {
    window.location.href = `${BASE_API_URL}/api/v1/auth/social/login/naver`;
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="gap-0 overflow-hidden rounded-2xl border-gray-100 p-0 max-w-[25rem]">
        <DialogHeader className="flex flex-col items-center gap-3 px-8 pb-7 pt-8">
          <DialogTitle className="flex items-center gap-1.5">
            <MoonStar className="h-5.5 w-5.5 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">공고문</span>
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-gray-500">
            취업 준비의 모든 것, 공고문과 함께하세요
          </DialogDescription>
        </DialogHeader>

        <div className="h-px bg-gray-100" />

        <div className="flex flex-col gap-5 px-8 py-6">
          <Button
            type="button"
            onClick={handleLogin}
            className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#03a94d] cursor-pointer hover:bg-[#029944]"
          >
            <span className="flex h-4.5 w-4.5 items-center justify-center text-[15px] font-extrabold leading-none text-white">
              N
            </span>
            <span className="text-lg font-semibold tracking-tight text-white">네이버 로그인</span>
          </Button>

          <div className="h-px bg-gray-200" />

          <div className="flex flex-col gap-2.5 rounded-[10px] bg-gray-50 px-4 py-3.5">
            {BENEFITS.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2.5">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-blue-100">
                  <Icon className="h-3 w-3 text-blue-600" />
                </div>
                <span className="text-xs font-medium text-gray-700">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-gray-100" />

        <div className="px-8 py-4">
          <p className="text-center text-[11px] text-gray-400">
            가입 시{' '}
            <span className="cursor-pointer font-medium text-blue-600">서비스 이용약관</span> 및{' '}
            <span className="cursor-pointer font-medium text-blue-600">개인정보 처리방침</span>에
            동의하게 됩니다.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const BENEFITS = [
  { icon: Search, label: '339개+ 공고를 한눈에 탐색' },
  { icon: Sparkles, label: 'AI 포트폴리오 전략 자동 생성' },
  { icon: MessagesSquare, label: '맞춤 면접 질문 자동 생성' },
];
