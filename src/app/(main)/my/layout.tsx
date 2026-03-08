import MyNav from '@/features/user/components/layout/MyNav';

export default function MyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-1 w-full py-10 gap-12">
      <MyNav />
      {children}
    </div>
  );
}
