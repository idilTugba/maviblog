import BlogDetail from '@/components/blog/blogDetail';
import React from 'react';
import getBlog from '@/utils/blogData';
import { BlogDataFromDB, BlogDataType } from '@/context/blogContext';

// ISR: Her 60 saniyede bir sayfayı yeniden oluştur
export const revalidate = 60;

type BlogData = {
  blog: BlogDataType;
};

const Blog = async ({ params }: { params: { id: string } }) => {
  const blog: BlogData = await getBlog.getBlogData(params.id);
  return <BlogDetail data={blog.blog} />;
};

export async function generateStaticParams() {
  const blogs: BlogDataFromDB = await getBlog.getAllBlog();

  const data = blogs?.blogs;

  if (!Array.isArray(data)) {
    console.warn(
      'generateStaticParams: blogs.blogs verisi beklenmedik biçimde geldi:',
      data
    );
    return [];
  }

  return data?.map((blog) => ({
    id: blog.id?.toString(),
  }));
}

export default Blog;
