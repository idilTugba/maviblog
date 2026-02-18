import BlogDetail from '@/components/blog/blogDetail';
import React, { Suspense } from 'react';
import Loading from '@/app/loading';
import dbConnect from '@/utils/dbconnect';
import BlogPost from '@/models/Blog';
import { BlogDataType } from '@/context/blogContext';

// ISR: Her 60 saniyede bir sayfayı yeniden oluştur
export const revalidate = 60;

async function BlogDetailContent({ id }: { id: string }) {
  try {
    await dbConnect();
    const blogData = await BlogPost.findById(id);
    
    if (!blogData) {
      return (
        <div className="flex items-center justify-center min-h-screen py-4 md:py-8 px-2 md:px-4">
          <div className="text-center text-gray-600">
            <p>Blog yazısı bulunamadı.</p>
          </div>
        </div>
      );
    }

    const blog = blogData.toJSON() as BlogDataType;

    return (
      <div className="flex items-center justify-center min-h-screen py-4 md:py-8 px-2 md:px-4">
        {/* Parşömen Container */}
        <div
          className="relative w-full max-w-4xl mx-auto md:min-h-[600px] md:pt-[100px] md:pb-[100px] md:pl-[80px] md:pr-[80px]"
          style={{
            backgroundImage: 'url(/parsomen.png)',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            minHeight: '930px',
            paddingTop: '80px',
            paddingBottom: '80px',
            paddingLeft: '60px',
            paddingRight: '60px',
          }}
        >
          {/* Scrollable Content Area */}
          <div
            className="overflow-y-auto md:max-h-[calc(100vh-300px)]"
            style={{
              maxHeight: 'calc(100vh - 200px)',
              paddingRight: '20px',
              paddingLeft: '20px',
              paddingTop: '20px',
              paddingBottom: '20px',
            }}
          >
            <div className="text-gray-800">
              <BlogDetail data={blog} />
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('BlogDetailContent - Error:', error);
    return (
      <div className="flex items-center justify-center min-h-screen py-4 md:py-8 px-2 md:px-4">
        <div className="text-center text-red-600">
          <p>Blog yazısı yüklenirken bir hata oluştu.</p>
          <p className="text-sm mt-2">
            {error instanceof Error ? error.message : 'Bilinmeyen hata'}
          </p>
        </div>
      </div>
    );
  }
}

export async function generateStaticParams() {
  try {
    await dbConnect();
    const blogs = await BlogPost.find();
    return blogs.map((blog) => ({
      id: blog._id.toString(),
    }));
  } catch (error) {
    console.error('generateStaticParams - Error:', error);
    return [];
  }
}

const Blog = async ({ params }: { params: { id: string } }) => {
  return (
    <Suspense fallback={<Loading />}>
      <BlogDetailContent id={params.id} />
    </Suspense>
  );
};

export default Blog;
