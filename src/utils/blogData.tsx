import { BlogDataType } from '@/context/blogContext';
import { cache } from 'react';

const getAllBlog = cache(async () => {
  const blogData: BlogDataType[] = await fetch('http://localhost:3002/blogs')
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      console.log(err);
    });

  return blogData;
});

const getBlogData = cache(async (id: string) => {
  const blogData: BlogDataType = await fetch(
    'http://localhost:3002/blogs/' + id
  )
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      console.log(err);
    });

  return blogData;
});

const getBlog = { getAllBlog, getBlogData };

export default getBlog;
