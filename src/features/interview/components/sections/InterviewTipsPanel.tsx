import { Star } from 'lucide-react';

export default function InterviewTipsPanel() {
  return (
    <div className="flex w-75 shrink-0 flex-col gap-4">
      <div className="flex items-center gap-1.5">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#fff3e0]">
          <Star className="h-3.5 w-3.5 text-amber-500" />
        </div>
        <span className="text-sm font-bold text-gray-900">면접 대비 팁</span>
      </div>
      <div className="flex flex-col gap-4 rounded-xl border border-gray-100 bg-white px-4 py-4.5">
        <div className="flex flex-col gap-3.5">
          {TIPS.map((tip) => (
            <div key={tip.title} className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                <span className="text-xs font-bold text-gray-800">{tip.title}</span>
              </div>
              <p className="pl-3 text-[11px] leading-[1.6] text-gray-500">{tip.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const TIPS = [
  {
    title: 'STAR 기법 활용',
    desc: '경험 기반 질문에는 상황·과제·행동·결과를 구체적으로 서술하세요.',
  },
  {
    title: '숫자로 표현하기',
    desc: '성과는 가능한 한 수치로 표현해 신뢰도를 높이세요.',
  },
  {
    title: '역질문 준비',
    desc: '면접 말미에 기업과 직무에 대한 역질문을 1~2개 준비해 두세요.',
  },
];
