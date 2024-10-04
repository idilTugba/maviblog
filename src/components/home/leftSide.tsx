import { BlogDataType } from '@/context/blogContext';
import BlogList from '../blog/blogList';
import style from './styles.module.scss';

type GroupedDataType = {
  [key: string]: BlogDataType[];
};

const LeftSide = ({ data }: { data: BlogDataType[] }) => {
  const groupedData = data.reduce<GroupedDataType>((acc, item) => {
    const { category } = item;

    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  return (
    <div className="w-1/5 inline-block border-r-[1px] pr-2 border-solid border-primary-dark dark:border-primary-light">
      <h2 className="mb-5 ">TÜM YAZILAR</h2>
      {}
      {Object.keys(groupedData).map((item) => {
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
