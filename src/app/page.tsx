import Profile from '../components/profile/profile';
import BlogList from '@/components/blog/blogList';
import { BlogDataType } from '@/context/blogContext';
import getBlogData from '@/utils/blogData';

export default async function Home() {
  const latestBlogData: BlogDataType[] = await getBlogData();

  return (
    <main className="text-center">
      <BlogList data={latestBlogData} />
    </main>
  );
}
