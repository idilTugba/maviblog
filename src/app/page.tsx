import CenterSide from '@/components/home/centerSide';
import Profile from '../components/profile/profile';
import BlogList from '@/components/blog/blogList';
import RightSide from '@/components/home/rightSide';
import { BlogDataType } from '@/context/blogContext';
import getBlogData from '@/utils/blogData';
import LeftSide from '@/components/home/leftSide';

export default async function Home() {
  const latestBlogData: BlogDataType[] = await getBlogData();

  return (
    <main className="flex mt-8 gap-5 text-left">
      <LeftSide data={latestBlogData} />
      <CenterSide data={latestBlogData} />
      <RightSide data={latestBlogData} />
    </main>
  );
}
