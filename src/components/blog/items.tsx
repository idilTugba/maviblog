import React from 'react';
import { BlogDataType } from '@/context/blogContext';

const Items = ({ data }: { data: BlogDataType }) => {
  console.log(data);
  return (
    <div className="items mt-2 mb-2 text-sm font-[500]">
      <span className="mr-5 pr-5 border-r-[1px] border-solid border-primary-dark dark:border-primary-light">
        {data.createdAt ? data.createdAt.toString().slice(0, 10) : ' '}
      </span>
      <span className="mr-5 pr-5 border-r-[1px] border-solid border-primary-dark dark:border-primary-light">
        {data.category ? data.category : 'Blog'}
      </span>
      <span>Like</span>
    </div>
  );
};

export default Items;
