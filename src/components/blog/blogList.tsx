'use client';
import React, { useEffect } from 'react';
import { BlogDataType, useBlogData } from '@/context/blogContext';
import Image from 'next/image';

const BlogList = ({ data }: { data: BlogDataType[] }) => {
  const { blogData, setBlogData } = useBlogData();
  useEffect(() => {
    setBlogData(data);
  }, [data, setBlogData]);

  return (
    <div>
      {data.map((item, index) => {
        return (
          <div key={index + item.title}>
            <Image src={item.img} alt={item.title} width={500} height={200} />
            <div>{item.title}</div>
            <div>{item.description}</div>
          </div>
        );
      })}
    </div>
  );
};

export default BlogList;
