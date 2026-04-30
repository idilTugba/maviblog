import Link from 'next/link';

export default function Home() {
  return (
    <div
      className="fixed inset-0 flex flex-col bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(/homebg.jpg)',
      }}
    >
      <figure className="mx-auto w-fit max-w-full shrink-0 px-6 pt-16 sm:pt-10 md:pt-20">
        <blockquote
          className="m-0 text-center font-serif text-[#fff] text-2xl sm:text-xl md:text-[2.5rem] md:leading-10 tracking-wide [text-shadow:0_1px_2px_rgba(40,40,40,0.9),0_0_24px_rgba(252,245,229,0.5)]"
          lang="tr"
        >
          BİR BAHÇE BİR EVDEN DAHA BÜYÜK BİR ŞEYDİR.
        </blockquote>
        <figcaption className="mt-2 text-right text-sm tracking-wide text-[#fff] [text-shadow:0_1px_2px_rgba(40,40,40,0.9),0_0_24px_rgba(252,245,229,0.5)]">
          Mavi Neşe
        </figcaption>
      </figure>

      <div className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <Link
            href="/blog"
            className="inline-block bg-[#c5c69a] text-[#332f23] font-semibold text-lg px-12 py-5 rounded-[2rem] hover:bg-gray-50 transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            GİRİŞ
          </Link>
        </div>
      </div>
    </div>
  );
}
