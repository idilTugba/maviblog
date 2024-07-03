import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-4">404 - Sayfa Bulunamadı</h1>
      <p className="mb-4">Üzgünüz, aradığınız sayfa not exist.</p>
      <Link href="/">Ana sayfaya geri dön</Link>
    </div>
  );
}
