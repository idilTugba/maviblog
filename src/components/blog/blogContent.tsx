import React from 'react';
import LeftSide from '../home/leftSide';
import CenterSide from '../home/centerSide';
import RightSide from '../home/rightSide';
import { BlogDataFromDB } from '@/context/blogContext';

async function BlogContent({ blogs }: { blogs: Promise<BlogDataFromDB> }) {
  const data = await blogs;
  return (
    <>
      <LeftSide data={data.blogs} />
      <CenterSide data={data.blogs} />
      <RightSide data={data.blogs} />
    </>
  );
}

export default BlogContent;
