import { Calendar, Globe, MapPin, Users } from 'lucide-react';
import type { Company } from '@/features/company/types';

interface CompanyMetaGridProps {
  company: Company;
}

export default function CompanyMetaGrid({ company }: CompanyMetaGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 pb-6">
      {company.employeeCount !== undefined && (
        <div className="flex min-h-18 items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3.5">
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
        <div className="flex min-h-18 items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3.5">
          <MapPin className="h-4 w-4 shrink-0 text-gray-400" />
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] text-gray-400">주소지</span>
            <span className="text-[13px] font-semibold text-gray-800">{company.address}</span>
          </div>
        </div>
      )}

      {company.foundedYear !== undefined && (
        <div className="flex min-h-18 items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3.5">
          <Calendar className="h-4 w-4 shrink-0 text-gray-400" />
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] text-gray-400">설립연도</span>
            <span className="text-[13px] font-semibold text-gray-800">{company.foundedYear}년</span>
          </div>
        </div>
      )}

      {company.websiteUrl && (
        <div className="flex min-h-18 items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3.5">
          <Globe className="h-4 w-4 shrink-0 text-gray-400" />
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] text-gray-400">홈페이지</span>
            <a
              href={company.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-semibold text-blue-500 hover:underline"
            >
              바로가기
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
