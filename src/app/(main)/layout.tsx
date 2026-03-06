import Footer from '@/shared/components/layout/Footer';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-1 flex-col items-center">
      <div className="flex flex-1 max-w-7xl w-full">{children}</div>
      <Footer />
    </div>
  );
}
