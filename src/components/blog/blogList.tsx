'use client';
import React, { useEffect, memo } from 'react';
import { BlogDataType, useBlogData } from '@/context/blogContext';
import Image from 'next/image';
import Link from 'next/link';

const BlogList = memo(function BlogList({
  data,
  className,
}: {
  data: BlogDataType[];
  className?: string;
}) {
  const { blogData, setBlogData } = useBlogData();
  useEffect(() => {
    setBlogData(data);
  }, [data, setBlogData]);

  return (
    <div>
      {data.map((item, index) => {
        return (
          <article className={`${className} mb-4`} key={index + item.title}>
            <Image
              className="w-full max-h-[400px]"
              src={item.img}
              alt={item.title}
              width={500}
              height={200}
            />
            <div className="items mt-2 mb-2 text-sm font-[500]">
              <span className="mr-5 pr-5 border-r-[1px] border-solid border-primary-dark dark:border-primary-light">
                12.08.2024
              </span>
              <span className="mr-5 pr-5 border-r-[1px] border-solid border-primary-dark dark:border-primary-light">
                Categorie
              </span>
              <span>Like</span>
            </div>
            <div className={'title text-left font-bold text-xl'}>
              <Link href="#">{item.title}</Link>
            </div>
            <div className={'description text-base'}>{item.description}</div>
          </article>
        );
      })}
    </div>
  );
});

export default BlogList;
