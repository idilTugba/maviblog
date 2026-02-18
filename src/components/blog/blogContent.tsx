import React from 'react';
import LeftSide from '../home/leftSide';
import CenterSide from '../home/centerSide';
import RightSide from '../home/rightSide';
import { BlogDataFromDB } from '@/context/blogContext';

async function BlogContent({ blogs }: { blogs: Promise<BlogDataFromDB> }) {
  const data = await blogs;
  // Güvenli default değerler
  const blogsArray = data?.blogs || [];

  return (
    <>
      <LeftSide data={blogsArray} />
      <CenterSide data={blogsArray} />
      <RightSide data={blogsArray} />
    </>
  );
}

export default BlogContent;
