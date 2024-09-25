import Image from 'next/image';
import React from 'react';
import style from './style.module.scss';
import Items from './items';
import { BlogDataType } from '@/context/blogContext';

const BlogDetail = ({ data }: { data: BlogDataType }) => {
  return (
    <div className={style.blogdetail}>
      <Image
        className=""
        src={data.img ? data.img : '/frankeinstein.jpeg'}
        alt="image title"
        width={400}
        height={200}
      />
      <Items data={data} />
      <h1>{data.title}</h1>
      <p>{data.content}</p>
    </div>
  );
};

export default BlogDetail;
