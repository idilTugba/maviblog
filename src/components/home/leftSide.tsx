import { BlogDataType } from '@/context/blogContext';
import BlogList from '../blog/blogList';
import style from './styles.module.scss';

const LeftSide = ({ data }: { data: BlogDataType[] }) => {
  return (
    <div className="w-1/5 inline-block border-r-[1px] pr-2 border-solid border-primary-dark dark:border-primary-light">
      <h2 className="mb-5 ">TÜM YAZILAR</h2>
      {/* {data.set(item => item.category).map(item => {
        return (
          <li key={item.category}>{item.category}</li>
        )
      })} */}
      <BlogList data={data} className={style.leftSide} />
    </div>
  );
};

export default LeftSide;
