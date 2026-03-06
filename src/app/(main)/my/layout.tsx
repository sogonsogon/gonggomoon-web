import MyNav from '@/features/user/components/MyNav';

export default function MyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-1">
      {/* TODO: <MyNav/> */}
      {children}
    </div>
  );
}
