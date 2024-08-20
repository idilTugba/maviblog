import { BlogDataType } from '@/context/blogContext';
import BlogList from '../blog/blogList';

const CenterSide = ({ data }: { data: BlogDataType[] }) => {
  return (
    <div className="w-3/5 inline-block">
      <h2 className="pb-4 mb-6 text-3xl font-semibold border-solid border-b-2 w-full border-primary-dark dark:border-primary-light">
        GÜNCEL
      </h2>
      <BlogList data={data} />
    </div>
  );
};

export default CenterSide;
