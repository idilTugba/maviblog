import CenterSide from '@/components/home/centerSide';
import Profile from '../components/profile/profile';
import BlogList from '@/components/blog/blogList';
import RightSide from '@/components/home/rightSide';
import { BlogDataType } from '@/context/blogContext';
import getBlog from '@/utils/blogData';
import LeftSide from '@/components/home/leftSide';

export default async function Home() {
  const latestBlogData: BlogDataType[] = await getBlog.getAllBlog();

  return (
    <main className="flex text-left mt-8 gap-5">
      <LeftSide data={latestBlogData} />
      <CenterSide data={latestBlogData} />
      <RightSide data={latestBlogData} />
    </main>
  );
}
