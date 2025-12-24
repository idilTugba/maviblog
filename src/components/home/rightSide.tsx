import { BlogDataType } from '@/context/blogContext';
import BlogList from '../blog/blogList';
import style from './styles.module.scss';

const RightSide = ({ data }: { data: BlogDataType[] }) => {
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
      <div className="w-2/5 border-l-gray-700 inline-block">
        <h4 className="pb-4 mb-6 text-3xl font-semibold border-solid border-b-2 w-full border-primary-dark dark:border-primary-light">
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
