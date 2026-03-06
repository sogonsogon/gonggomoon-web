import Footer from '@/shared/components/layout/Footer';

export default function SideBarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* TODO: sidebar */}
      <div className="flex flex-1 flex-col">
        <div className="flex flex-1">{children}</div>
        <Footer />
      </div>
    </>
  );
}
