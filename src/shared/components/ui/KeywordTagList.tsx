interface KeywordTagListProps {
  title: string;
  keywords: string[];
  variant?: 'blue' | 'gray';
}

const KEYWORD_VARIANT_CLASS = {
  blue: 'bg-blue-50 text-blue-700',
  gray: 'bg-gray-100 text-gray-700',
} as const;

export default function KeywordTagList({ title, keywords, variant = 'gray' }: KeywordTagListProps) {
  return (
    <div className="flex flex-col gap-2.5 rounded-xl border border-gray-100 bg-gray-50 p-4">
      <span className="text-xs font-semibold text-gray-500">{title}</span>
      <div className="flex flex-wrap gap-1.5">
        {keywords.map((keyword, index) => (
          <span
            key={`${keyword}-${index}`}
            className={`rounded-full px-2.5 py-1 text-xs font-medium ${
              KEYWORD_VARIANT_CLASS[variant]
            }`}
          >
            {keyword}
          </span>
        ))}
      </div>
    </div>
  );
}
