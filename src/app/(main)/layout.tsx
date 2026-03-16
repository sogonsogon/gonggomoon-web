import Footer from '@/shared/components/layout/Footer';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-1 flex-col items-center">
      <div className="flex min-w-0 w-full max-w-7xl flex-1">{children}</div>
      <Footer />
    </div>
  );
}
