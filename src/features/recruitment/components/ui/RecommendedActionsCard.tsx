import { Zap } from 'lucide-react';

interface RecommendedActionsCardProps {
  actions: string[];
}

export default function RecommendedActionsCard({ actions }: RecommendedActionsCardProps) {
  return (
    <section className="overflow-hidden rounded-xl border border-gray-100">
      <div className="flex items-center gap-2 px-4 py-3.5">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-100">
          <Zap className="h-3 w-3 text-blue-600" />
        </div>
        <span className="text-[13px] font-bold text-gray-900">이 공고 맞춤 추천 활동</span>
        <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-600">
          AI 추천
        </span>
      </div>

      <div className="h-px bg-gray-100" />

      <ul className="flex flex-col">
        {actions.map((action, index) => (
          <li
            key={`${action}-${index}`}
            className={`flex items-center gap-3 px-4 py-3 ${
              index < actions.length - 1 ? 'border-b border-gray-100' : ''
            }`}
          >
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600">
              <span className="text-[11px] font-bold text-white">{index + 1}</span>
            </div>
            <span className="text-[13px] font-semibold text-gray-800">{action}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
