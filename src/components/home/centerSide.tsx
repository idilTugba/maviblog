import { BlogDataType } from '@/context/blogContext';
import BlogList from '../blog/blogList';
import style from './styles.module.scss';

const CenterSide = ({ data }: { data: BlogDataType[] }) => {
  // En yeni yazılar en üstte olacak şekilde sırala (createdAt'e göre azalan)
  const sortedData = [...data].sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return dateB - dateA; // Azalan sıralama (en yeni en üstte)
  });

  return (
    <div className="w-3/5 inline-block">
      <h2 className="pb-4 mb-6 text-3xl font-semibold border-solid border-b-2 w-full border-primary-dark dark:border-primary-light">
        GÜNCEL
      </h2>
      <BlogList data={sortedData} className={style.centerSide} />
    </div>
  );
};

export default CenterSide;
