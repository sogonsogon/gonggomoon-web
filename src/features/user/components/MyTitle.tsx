interface MyTitleProps {
  title: string;
  description: string;
}

export default function MyTitle({ title, description }: MyTitleProps) {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-[22px] font-bold text-gray-900">{title}</h1>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
}
