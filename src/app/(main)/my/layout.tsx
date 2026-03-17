import MyNav from '@/features/user/components/layout/MyNav';

export default function MyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col flex-1 w-full gap-4 px-4 pt-6 pb-10 md:flex-row md:min-h-180 md:pt-10 md:pb-20 md:gap-12">
      <MyNav />
      {children}
    </div>
  );
}
