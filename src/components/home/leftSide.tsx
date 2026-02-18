import { BlogDataType } from '@/context/blogContext';
import BlogList from '../blog/blogList';
import style from './styles.module.scss';

type GroupedDataType = {
  [key: string]: BlogDataType[];
};

const LeftSide = ({ data }: { data: BlogDataType[] }) => {
  const groupedData = Array.isArray(data)
    ? data.reduce<GroupedDataType>((acc, item) => {
        const { category } = item;

        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(item);
        return acc;
      }, {})
    : {};

  // Her kategori içindeki blogları tarihe göre sırala (en yeni en üstte)
  Object.keys(groupedData).forEach((category) => {
    groupedData[category].sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA; // Azalan sıralama (en yeni en üstte)
    });
  });

  return (
    <div className="w-full md:w-1/5 inline-block border-r-0 md:border-r-[1px] pr-0 md:pr-2 border-b-[1px] md:border-b-0 pb-5 md:pb-0 mb-5 md:mb-0 border-solid border-primary-dark dark:border-primary-light">
      <h2 className="mb-5 text-xl md:text-base">BLOG YAZILARI</h2>

      {Object.keys(groupedData)?.map((item) => {
        return (
          <div key={`category-${item}`} className="mb-2">
            <p className="font-bold text-sm">{item}</p>
            <BlogList data={groupedData[item]} className={style.leftSide} />
          </div>
        );
      })}
    </div>
  );
};

export default LeftSide;
