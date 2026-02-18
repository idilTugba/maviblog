import { BlogDataType } from '@/context/blogContext';
import BlogList from '../blog/blogList';
import style from './styles.module.scss';

const CenterSide = ({ data }: { data: BlogDataType[] }) => {
  console.log('CenterSide data:', data);
  
  // Güvenli default değer - data undefined veya array değilse boş array kullan
  if (!data || !Array.isArray(data)) {
    return (
      <div className="w-full md:w-3/5 inline-block order-2 md:order-none">
        <h2 className="pb-4 mb-6 text-2xl md:text-3xl font-semibold border-solid border-b-2 w-full border-primary-dark dark:border-primary-light">
          GÜNCEL
        </h2>
        <p className="text-gray-500 dark:text-gray-400">Henüz blog yazısı yok.</p>
      </div>
    );
  }
  
  // En yeni yazılar en üstte olacak şekilde sırala (createdAt'e göre azalan)
  const sortedData = [...data].sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return dateB - dateA; // Azalan sıralama (en yeni en üstte)
  });

  return (
    <div className="w-full md:w-3/5 inline-block order-2 md:order-none">
      <h2 className="pb-4 mb-6 text-2xl md:text-3xl font-semibold border-solid border-b-2 w-full border-primary-dark dark:border-primary-light">
        GÜNCEL
      </h2>
      <BlogList data={sortedData} className={style.centerSide} />
    </div>
  );
};

export default CenterSide;
