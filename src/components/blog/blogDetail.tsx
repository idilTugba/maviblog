import Image from 'next/image';
import React from 'react';
import style from './style.module.scss';
import Items from './items';
import { BlogDataType } from '@/context/blogContext';

const BlogDetail = ({ data }: { data: BlogDataType }) => {
  return (
    <div className={style.blogdetail}>
      {data.images && data.images.length > 0 && (
        <Image
          className="w-full max-h-[400px]"
          src={data.images[0]}
          alt={data.title}
          width={500}
          height={200}
        />  
      )}
      {data.videos && data.videos.length > 0 && (
        <iframe
          width="100%"
          height="250"
          src={data.videos}
          title="Video Player"
          allowFullScreen
        ></iframe>
      ) }
      <Items data={data} />
      <h1>{data.title}</h1>
      <p>{data.content}</p>
    </div>
  );
};

export default BlogDetail;
