import { ChartColumnBig, LayoutList, Sparkles, Tag, TriangleAlert, Zap } from 'lucide-react';

export default function StrategyPanelsSkeleton() {
  return (
    <div className="flex items-start gap-6 max-lg:flex-col max-lg:items-stretch max-lg:gap-5">
      <div className="flex w-full flex-1 flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#c9e2ff]">
            <Sparkles className="h-3.5 w-3.5 text-[#2272eb]" />
          </div>
          <span className="text-[15px] font-bold text-gray-900">AI 전략 분석</span>
        </div>

        <div className="flex flex-col gap-6 rounded-xl border border-gray-100 p-6 max-md:gap-4 max-md:p-3.5">
          <section className="flex flex-col gap-3.5">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2272eb]">
                <span className="text-[14px] font-bold text-white">1</span>
              </div>
              <span className="text-[14px] font-semibold text-gray-900">핵심 포지셔닝 메시지</span>
            </div>

            <div className="rounded-lg border border-[#c9e2ff] bg-[#e8f3ff] px-4 py-3 max-md:px-3.5 max-md:py-2.5">
              <div className="flex max-w-3xl flex-col gap-2.5">
                <div className="h-4 w-full animate-pulse rounded bg-[#cfe4ff]" />
                <div className="h-4 w-10/12 animate-pulse rounded bg-[#cfe4ff]" />
                <div className="h-4 w-7/12 animate-pulse rounded bg-[#cfe4ff]" />
              </div>
            </div>
          </section>

          <div className="h-px bg-gray-100" />

          <section className="flex flex-col gap-3.5">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2272eb]">
                <span className="text-[14px] font-bold text-white">2</span>
              </div>
              <span className="text-[14px] font-semibold text-gray-900">경험별 전략 포인트</span>
            </div>

            <div className="flex flex-col gap-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 rounded-lg border border-gray-100 px-4 py-3 max-md:flex-col max-md:items-start max-md:gap-2 max-md:px-3.5 max-md:py-2.5"
                >
                  <div className="h-6 w-16 shrink-0 animate-pulse rounded-full bg-gray-100" />
                  <div className="flex min-w-0 max-w-3xl flex-1 flex-col gap-2">
                    <div className="h-4 w-32 animate-pulse rounded bg-gray-100" />
                    <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
                    <div className="h-4 w-10/12 animate-pulse rounded bg-gray-100" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="h-px bg-gray-100" />

          <section className="flex flex-col gap-3.5">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2272eb]">
                <span className="text-[14px] font-bold text-white">3</span>
              </div>
              <span className="text-[14px] font-semibold text-gray-900">경험 정렬 전략</span>
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-100">
              {Array.from({ length: 3 }).map((_, idx) => {
                const isLast = idx === 2;

                return (
                  <div
                    key={idx}
                    className={`flex items-center gap-4 px-4 py-3 max-md:gap-3 max-md:px-3.5 max-md:py-2.5 ${
                      !isLast ? 'border-b border-gray-100' : ''
                    }`}
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#c9e2ff]">
                      <span className="text-[14px] font-bold leading-none text-[#1b64da]">
                        {idx + 1}
                      </span>
                    </div>

                    <div className="flex min-w-0 max-w-3xl flex-1 flex-col gap-2">
                      <div className="h-4 w-36 animate-pulse rounded bg-gray-100" />
                      <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
                      <div className="h-4 w-8/12 animate-pulse rounded bg-gray-100" />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>

      <div className="flex w-75 shrink-0 flex-col items-stretch gap-4 max-lg:w-full max-lg:shrink max-md:gap-3">
        <div className="flex w-full items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100">
            <LayoutList className="h-3.5 w-3.5 text-blue-600" />
          </div>
          <span className="text-[15px] font-bold text-gray-900">구조화 데이터</span>
        </div>

        <div className="flex w-full flex-col gap-3 rounded-xl border border-gray-100 px-4 py-4.5 max-md:px-3.5 max-md:py-3.5">
          <div className="flex items-center gap-1.5">
            <Tag className="h-3.5 w-3.5 text-gray-500" />
            <span className="text-[12px] font-bold text-gray-700">강조 키워드</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <div className="h-8 w-14 animate-pulse rounded-full bg-gray-100" />
            <div className="h-8 w-16 animate-pulse rounded-full bg-gray-100" />
            <div className="h-8 w-12 animate-pulse rounded-full bg-gray-100" />
            <div className="h-8 w-15 animate-pulse rounded-full bg-gray-100" />
            <div className="h-8 w-13 animate-pulse rounded-full bg-gray-100" />
          </div>
        </div>

        <div className="flex w-full flex-col gap-3 rounded-xl border border-gray-100 px-4 py-4.5 max-md:px-3.5 max-md:py-3.5">
          <div className="flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-gray-500" />
            <span className="text-[12px] font-bold text-gray-700">강조 역량</span>
          </div>
          <div className="flex flex-col gap-2.5">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gray-300" />
                <div className="flex flex-1 flex-col gap-2">
                  <div className="h-3.5 w-full animate-pulse rounded bg-gray-100" />
                  <div className="h-3.5 w-10/12 animate-pulse rounded bg-gray-100" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex w-full flex-col gap-2.5 rounded-xl border border-gray-100 px-4 py-4.5 max-md:px-3.5 max-md:py-3.5">
          <div className="flex items-center gap-1.5">
            <ChartColumnBig className="h-3.5 w-3.5 text-gray-500" />
            <span className="text-[12px] font-bold text-gray-700">KPI 체크리스트</span>
          </div>
          <div className="flex flex-col gap-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gray-300" />
                <div className="h-3.5 w-full animate-pulse rounded bg-gray-100" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex w-full flex-col gap-3 rounded-xl border border-[#fde68a] bg-[#fffbeb] px-4 py-4.5 max-md:px-3.5 max-md:py-3.5">
          <div className="flex items-center gap-1.5">
            <TriangleAlert className="h-3.5 w-3.5 text-[#d97706]" />
            <span className="text-[12px] font-bold text-[#92400e]">보완 가이드</span>
          </div>
          <div className="h-px bg-[#fde68a]" />
          <div className="flex flex-col gap-3">
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="flex flex-col gap-2">
                <div className="h-3.5 w-24 animate-pulse rounded bg-[#fde7b0]" />
                <div className="h-3.5 w-full animate-pulse rounded bg-[#fde7b0]" />
                <div className="h-3.5 w-11/12 animate-pulse rounded bg-[#fde7b0]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
