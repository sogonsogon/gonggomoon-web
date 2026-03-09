interface RecruitmentRawContentSectionProps {
  content: string;
}

export default function RecruitmentDetailContent({ content }: RecruitmentRawContentSectionProps) {
  return (
    <section className="flex flex-col gap-4 pt-6">
      <h2 className="text-base font-bold text-gray-900">공고 원문</h2>
      <p className="whitespace-pre-line wrap-break-word text-sm leading-[1.7] text-gray-700">
        {content}
      </p>
    </section>
  );
}
