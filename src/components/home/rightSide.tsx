import { BlogDataType } from '@/context/blogContext';
import BlogList from '../blog/blogList';
import style from './styles.module.scss';

const RightSide = ({ data }: { data: BlogDataType[] }) => {
  // Güvenli default değer - data undefined veya array değilse boş array kullan
  if (!data || !Array.isArray(data)) {
    return (
      <div className="w-full md:w-2/5 border-l-0 md:border-l-gray-700 border-t-[1px] md:border-t-0 pt-5 md:pt-0 mt-5 md:mt-0 inline-block order-3 md:order-none">
        <h4 className="pb-4 mb-6 text-2xl md:text-3xl font-semibold border-solid border-b-2 w-full border-primary-dark dark:border-primary-light">
          Özel Seçkiler
        </h4>
        <p className="text-gray-500 dark:text-gray-400">
          Henüz özel seçki blog yok.
        </p>
      </div>
    );
  }
  
  // Sadece özel seçki olan blogları filtrele
  // featured değeri true, "true" string'i veya 1 olabilir
  const featuredBlogs = data
    .filter(
      (blog) =>
        blog.featured === true ||
        blog.featured === 'true' ||
        blog.featured === 1
    )
    // En yeni yazılar en üstte olacak şekilde sırala (createdAt'e göre azalan)
    .sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA; // Azalan sıralama (en yeni en üstte)
    });

  // Debug için
  console.log('All blogs:', data.length);
  console.log('Featured blogs:', featuredBlogs.length);
  console.log(
    'Featured check:',
    data.map((b) => ({ title: b.title, featured: b.featured }))
  );

  return (
    <>
      <div className="w-full md:w-2/5 border-l-0 md:border-l-gray-700 border-t-[1px] md:border-t-0 pt-5 md:pt-0 mt-5 md:mt-0 inline-block order-3 md:order-none">
        <h4 className="pb-4 mb-6 text-2xl md:text-3xl font-semibold border-solid border-b-2 w-full border-primary-dark dark:border-primary-light">
          Özel Seçkiler
        </h4>

        {featuredBlogs.length > 0 ? (
          <BlogList data={featuredBlogs} className={style.rightSide} />
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            Henüz özel seçki blog yok.
          </p>
        )}
      </div>
    </>
  );
};

export default RightSide;
