import Link from 'next/link';

export default function Home() {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(/homebg.jpg)',
      }}
    >
      <div className="text-center">
        <Link
          href="/blog"
          className="inline-block bg-[#c5c69a] text-[#332f23] font-semibold text-lg px-12 py-5 rounded-[2rem] hover:bg-gray-50 transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          GİRİŞ
        </Link>
      </div>
    </div>
  );
}
