import { Suspense } from 'react';
import Loading from '../../loading';
import { BlogDataType } from '@/context/blogContext';
import BlogList from '@/components/blog/blogList';
import style from '@/components/home/styles.module.scss';
import dbConnect from '@/utils/dbconnect';
import BlogPost from '@/models/Blog';

// ISR: Her 60 saniyede bir sayfayı yeniden oluştur
export const revalidate = 60;

type GroupedDataType = {
  [key: string]: BlogDataType[];
};

async function ParchementContent() {
  try {
    // Server-side'da direkt MongoDB'den veri al
    await dbConnect();
    const blogsData = await BlogPost.find().sort({ createdAt: -1 });
    const blogsArray = blogsData.map((blog) => blog.toJSON()) as BlogDataType[];

    console.log('ParchementContent - Blogs array length:', blogsArray.length);
    console.log('ParchementContent - First blog:', blogsArray[0]);

    // Kategorilere göre grupla (leftSide.tsx mantığı)
    const groupedData: GroupedDataType = Array.isArray(blogsArray)
      ? blogsArray.reduce<GroupedDataType>((acc, item) => {
          const { category } = item;

          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(item);
          return acc;
        }, {})
      : {};

    console.log('ParchementContent - Grouped data:', groupedData);
    console.log(
      'ParchementContent - Grouped data keys:',
      Object.keys(groupedData)
    );

    // Her kategori içindeki blogları tarihe göre sırala (en yeni en üstte)
    Object.keys(groupedData).forEach((category) => {
      groupedData[category].sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA; // Azalan sıralama (en yeni en üstte)
      });
    });

    return (
      <div className="flex items-center justify-center min-h-screen py-2 md:py-4 lg:py-8 px-1 sm:px-2 md:px-4">
        {/* Parşömen Container */}
        <div
          className="relative w-[95%] sm:w-[90%] md:w-full max-w-5xl mx-auto min-h-[600px] sm:min-h-[700px] md:min-h-[800px] lg:min-h-[1000px] pt-[90px] pb-[90px] pr-[30px] pl-[30px] sm:pt-[300px] sm:pb-[200px] sm:pl-[50px] sm:pr-[50px] md:pt-[200px] md:pb-[200px] md:pl-[70px] md:pr-[70px] lg:pt-[120px] lg:pb-[120px] lg:pl-[100px] lg:pr-[100px] "
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
            <h2 className="text-2xl md:text-4xl font-bold mb-8 text-left text-gray-800">
              BLOG YAZILARI
            </h2>

            {/* Kategoriler ve Yazılar - leftSide.tsx mantığı */}
            {Object.keys(groupedData).length > 0 ? (
              <div className="space-y-6">
                {Object.keys(groupedData)?.map((item) => {
                  return (
                    <div key={`category-${item}`} className="mb-6">
                      <p className="font-bold text-lg md:text-xl mb-4 text-left text-gray-800 border-b-2 border-gray-600 pb-2">
                        {item}
                      </p>
                      <BlogList
                        data={groupedData[item]}
                        className={style.leftSide}
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center text-gray-600 py-8">
                <p>Henüz blog yazısı yok.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('ParchementContent - Error:', error);
    return (
      <div className="flex items-center justify-center min-h-screen py-4 md:py-8 px-2 md:px-4">
        <div className="text-center text-red-600">
          <p>Blog yazıları yüklenirken bir hata oluştu.</p>
          <p className="text-sm mt-2">
            {error instanceof Error ? error.message : 'Bilinmeyen hata'}
          </p>
        </div>
      </div>
    );
  }
}

export default async function BlogPage() {
  return (
    <main className="min-h-screen">
      <Suspense fallback={<Loading />}>
        <ParchementContent />
      </Suspense>
    </main>
  );
}
