import { BlogDataType } from '@/context/blogContext';
import BlogList from '../blog/blogList';
import style from './styles.module.scss';

const RightSide = ({ data }: { data: BlogDataType[] }) => {
  return (
    <>
      <div className="w-2/5 border-l-gray-700 inline-block">
        <h4 className="pb-4 mb-6 text-3xl font-semibold border-solid border-b-2 w-full border-primary-dark dark:border-primary-light">
          Özel Seçkiler
        </h4>

        <BlogList data={data} className={style.rightSide} />
      </div>
    </>
  );
};

export default RightSide;
