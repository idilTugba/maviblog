import BlogDetail from '@/components/blog/blogDetail';
import React from 'react';
import getBlog from '@/utils/blogData';
import { BlogDataType } from '@/context/blogContext';

const Blog = async ({ params }: { params: any }) => {
  const blog: BlogDataType = await getBlog.getBlogData(params.id);
  return <BlogDetail data={blog} />;
};

export async function generateStaticParams() {
  const blogs: BlogDataType[] = await getBlog.getAllBlog();
  const params = blogs.map((blog) => ({
    id: blog.id?.toString(),
  }));
  return params;
}

export default Blog;
