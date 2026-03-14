import { Building2 } from 'lucide-react';
import type { Company } from '@/features/company/types';
import { COMPANY_LABEL_MAP } from '@/features/company/constants/companyOptions';

interface CompanyDetailHeaderProps {
  company: Company;
}

export default function CompanyDetailHeader({ company }: CompanyDetailHeaderProps) {
  return (
    <div className="flex items-center gap-4 pb-6">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gray-100">
        <Building2 className="h-7 w-7 text-gray-400" />
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-2xl font-bold text-gray-900">{company.companyName}</span>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-md bg-blue-50 px-2.5 py-1">
            <span className="text-[12px] font-semibold text-blue-600">{company.industryName}</span>
          </div>

          <div className="flex items-center gap-1 rounded-md bg-gray-100 px-2.5 py-1">
            <span className="text-[12px] font-semibold text-gray-600">
              {COMPANY_LABEL_MAP[company.companyType]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
