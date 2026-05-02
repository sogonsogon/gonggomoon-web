interface GenerationPendingNoticeProps {
  title: string;
  description: string;
}

export default function GenerationPendingNotice({
  title,
  description,
}: GenerationPendingNoticeProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4"
    >
      <div className="relative mt-1.5 flex h-2.5 w-2.5 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-500" />
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold text-blue-900">{title}</p>
        <p className="text-sm leading-6 text-blue-700">{description}</p>
      </div>
    </div>
  );
}
