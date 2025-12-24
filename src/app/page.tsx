import getBlog from '@/utils/blogData';
import BlogContent from '@/components/blog/blogContent';
import { Suspense } from 'react';
import Loading from './loading';

// ISR: Her 60 saniyede bir sayfayı yeniden oluştur
export const revalidate = 60;

export default async function Home() {
  const latestBlogData = await getBlog.getAllBlog();

  // console.log('Latest Blog Data:', latestBlogData);
  return (
    <main className="flex flex-col md:flex-row text-left mt-8 gap-5">
      <Suspense fallback={<Loading />}>
        {latestBlogData ? (
          <BlogContent blogs={latestBlogData} />
        ) : (
          <p>Data Yüklenirken bir hata oluştu.</p>
        )}
      </Suspense>
    </main>
  );
}
