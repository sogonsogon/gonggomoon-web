import Link from 'next/link';
import { Calendar, Globe, MapPin, Users } from 'lucide-react';
import type { Company } from '@/features/company/types';

interface CompanyMetaGridProps {
  company: Company;
}

export default function CompanyMetaGrid({ company }: CompanyMetaGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 pb-6 max-md:gap-2.5 max-md:pb-5">
      {company.employeeCount !== undefined && (
        <div className="flex min-h-18 items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3.5 max-md:min-h-15 max-md:items-start max-md:gap-2 max-md:px-3 max-md:py-2.5">
          <Users className="h-4 w-4 shrink-0 text-gray-400" />
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] text-gray-400">사원 수</span>
            <span className="text-[13px] font-semibold text-gray-800">
              {company.employeeCount.toLocaleString()}명
            </span>
          </div>
        </div>
      )}

      {company.address && (
        <div className="flex min-h-18 min-w-0 items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3.5 max-md:min-h-15 max-md:items-start max-md:gap-2 max-md:px-3 max-md:py-2.5">
          <MapPin className="h-4 w-4 shrink-0 text-gray-400" />
          <div className="flex min-w-0 flex-col gap-0.5">
            <span className="text-[11px] text-gray-400">주소지</span>
            <span className="break-words text-[13px] font-semibold text-gray-800 max-md:leading-snug">
              {company.address}
            </span>
          </div>
        </div>
      )}

      {company.foundedYear !== undefined && (
        <div className="flex min-h-18 items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3.5 max-md:min-h-15 max-md:items-start max-md:gap-2 max-md:px-3 max-md:py-2.5">
          <Calendar className="h-4 w-4 shrink-0 text-gray-400" />
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] text-gray-400">설립연도</span>
            <span className="text-[13px] font-semibold text-gray-800">{company.foundedYear}년</span>
          </div>
        </div>
      )}

      {company.companyUrl && (
        <div className="flex min-h-18 min-w-0 items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3.5 max-md:min-h-15 max-md:items-start max-md:gap-2 max-md:px-3 max-md:py-2.5">
          <Globe className="h-4 w-4 shrink-0 text-gray-400" />
          <div className="flex min-w-0 flex-col gap-0.5">
            <span className="text-[11px] text-gray-400">홈페이지</span>
            <Link
              href={company.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="truncate text-[13px] font-semibold text-blue-500 hover:underline"
            >
              바로가기
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
