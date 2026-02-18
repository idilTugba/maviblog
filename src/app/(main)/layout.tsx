import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{
        backgroundImage: 'url(/blogbg.jpg)',
      }}
    >
      <div className="text-center">
        <div className="w-full md:w-10/12 px-4 md:px-0 inline-block">
          <Header />
          {children}
          <Footer />
        </div>
      </div>
    </div>
  );
}
