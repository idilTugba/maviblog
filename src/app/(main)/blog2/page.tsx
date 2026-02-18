import getBlog from '@/utils/blogData';
import BlogContent from '@/components/blog/blogContent';
import { Suspense } from 'react';
import Loading from '../../loading';

// ISR: Her 60 saniyede bir sayfayı yeniden oluştur
export const revalidate = 60;

export default async function BlogPage() {
  // getAllBlog zaten cache ile Promise döndürüyor, await etmeden geçiriyoruz
  const latestBlogDataPromise = getBlog.getAllBlog();

  return (
    <main className="flex flex-col md:flex-row text-left mt-8 gap-5">
      <Suspense fallback={<Loading />}>
        <BlogContent blogs={latestBlogDataPromise} />
      </Suspense>
    </main>
  );
}
