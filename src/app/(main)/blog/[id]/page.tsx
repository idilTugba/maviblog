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
      <div className="flex items-center justify-center min-h-screen py-2 md:py-4 lg:py-8 px-1 sm:px-2 md:px-4">
        {/* Parşömen Container */}
        <div
          className="relative w-[95%] sm:w-[90%] md:w-full max-w-5xl mx-auto min-h-[600px] sm:min-h-[700px] md:min-h-[800px] lg:min-h-[1000px] pt-[150px] pb-[150px] pr-[30px] pl-[30px] sm:pt-[300px] sm:pb-[200px] sm:pl-[50px] sm:pr-[50px] md:pt-[200px] md:pb-[200px] md:pl-[70px] md:pr-[70px] lg:pt-[120px] lg:pb-[120px] lg:pl-[100px] lg:pr-[100px] "
          style={{
            backgroundImage: 'url(/parsomen.png)',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        >
          {/* Scrollable Content Area */}
          <div
            className="overflow-y-auto sm:max-h-[calc(100vh-200px)] md:max-h-[calc(100vh-300px)] lg:max-h-[calc(100vh-350px)] sm:pr-[25px] md:pr-[30px] lg:pr-[40px] sm:pl-[25px] md:pl-[30px] lg:pl-[40px] sm:pt-[25px] md:pt-[30px] lg:pt-[40px] sm:pb-[25px] md:pb-[30px] lg:pb-[40px]"
            style={{
              maxHeight: 'calc(100vh - 150px)',
              paddingRight: '15px',
              paddingLeft: '15px',
              paddingTop: '15px',
              paddingBottom: '15px',
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
