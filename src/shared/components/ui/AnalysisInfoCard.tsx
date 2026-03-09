interface AnalysisInfoCardProps {
  title: string;
  content: string | string[];
  preserveLineBreak?: boolean;
}

export default function AnalysisInfoCard({
  title,
  content,
  preserveLineBreak = false,
}: AnalysisInfoCardProps) {
  const isList = Array.isArray(content);

  return (
    <div className="flex flex-col gap-2 rounded-xl border border-gray-100 bg-gray-50 p-4">
      <span className="text-xs font-semibold text-gray-500">{title}</span>

      {isList ? (
        <ul className="flex flex-col gap-1.5">
          {content.map((item, index) => (
            <li key={`${item}-${index}`} className="text-sm leading-relaxed text-gray-800">
              • {item}
            </li>
          ))}
        </ul>
      ) : (
        <p
          className={`text-sm leading-relaxed text-gray-800 ${
            preserveLineBreak ? 'whitespace-pre-line' : ''
          }`}
        >
          {content}
        </p>
      )}
    </div>
  );
}
