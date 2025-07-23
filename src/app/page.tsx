import getBlog from '@/utils/blogData';
import BlogContent from '@/components/blog/blogContent';
import { Suspense } from 'react';
import Loading from './loading';

export default async function Home() {
  const latestBlogData = await getBlog.getAllBlog();

  // console.log('Latest Blog Data:', latestBlogData);
  return (
    <main className="flex text-left mt-8 gap-5">
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
