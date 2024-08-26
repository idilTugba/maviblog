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
        src={data.img}
        alt="image title"
        width={400}
        height={200}
      />
      <Items />
      <h1>{data.title}</h1>
      <p>{data.description}</p>
    </div>
  );
};

export default BlogDetail;
