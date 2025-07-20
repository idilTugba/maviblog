'use client';
import React, { useEffect, memo, useState } from 'react';
import { BlogDataType, useBlogData } from '@/context/blogContext';
import Image from 'next/image';
import Link from 'next/link';
import Items from './items';

const BlogList = function BlogList({
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

  const [showIframe, setShowIframe] = useState(false);

  useEffect(() => {
    setShowIframe(true);
  }, []);

  return (
    <div>
      {data?.map((item, index) => {
        return (
          
          <article
            className={`${className} mb-4 border-primary-darksecond dark:border-primary-lightsecond`}
            key={index + item.title}
          >
            {item.images && item.images.length > 0 && (
              <Image
                className="w-full max-h-[400px]"
                src={item.images[0]}
                alt={item.title}
                width={500}
                height={200}
              />
            )} 
            {showIframe && item.videos !== undefined && item.videos ? (
              <iframe width="100%" height="250"
                src={item.videos}>
              </iframe>): <u></u>}

            <Items data={item} />
            <div className={'title text-left font-bold text-xl'}>
              <Link href={`/blog/${item.id}`}>{item.title}</Link>
            </div>
            <div className={'description text-base'}>{item.content}</div>
          </article>
        );
      })}
    </div>
  );
};

export default BlogList;
