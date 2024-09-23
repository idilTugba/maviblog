import CenterSide from '@/components/home/centerSide';
import BlogList from '@/components/blog/blogList';
import RightSide from '@/components/home/rightSide';
import { BlogDataFromDB } from '@/context/blogContext';
import getBlog from '@/utils/blogData';
import LeftSide from '@/components/home/leftSide';

export default async function Home() {
  const latestBlogData: BlogDataFromDB = await getBlog.getAllBlog();
  return (
    <main className="flex text-left mt-8 gap-5">
      <LeftSide data={latestBlogData.blogs} />
      <CenterSide data={latestBlogData.blogs} />
      <RightSide data={latestBlogData.blogs} />
    </main>
  );
}
