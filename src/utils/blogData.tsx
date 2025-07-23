import axios from 'axios';
import { cache } from 'react';

const getAllBlog = cache(async () => {
  try {
    const data = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/blog`);
    const allBlogData = await data.data;
    // console.log('All Blog Data:', allBlogData);
    return allBlogData;
  } catch (error) {
    return error;
  }
});

const getBlogData = cache(async (id: string) => {
  try {
    const data = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/blog/${id}`
    );
    const blogData = await data.data;
    return blogData;
  } catch (error) {
    return error;
  }
});

const getBlog = { getAllBlog, getBlogData };

export default getBlog;
