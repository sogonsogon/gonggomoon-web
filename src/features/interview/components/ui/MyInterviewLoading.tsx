export default function MyInterviewLoading() {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div className="h-30 animate-pulse bg-gray-100 px-5 pb-4 pt-5" />
            <div className="flex h-9 items-center justify-center">
              <div className="h-3.5 w-8 animate-pulse rounded bg-gray-100" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
