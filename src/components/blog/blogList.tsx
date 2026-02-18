'use client';
import React, { useEffect, useState } from 'react';
import { BlogDataType } from '@/context/blogContext';
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
  const [showIframe, setShowIframe] = useState(false);

  useEffect(() => {
    setShowIframe(true);
  }, []);

  return (
    <div>
      {data?.map((item, index) => {
        // Resim path'ini düzelt - public klasöründeki resimler için
        // images hem string[] hem de string olabilir
        const getImageSrc = (images: string[] | string | undefined): string | null => {
          if (!images) return null;
          
          // Eğer string ise direkt kullan
          if (typeof images === 'string') {
            const img = images.trim();
            if (!img) return null;
            if (img.startsWith('http://') || img.startsWith('https://')) return img;
            if (img.startsWith('/')) return img;
            return `/${img}`;
          }
          
          // Eğer array ise ilk elemanı al
          if (Array.isArray(images) && images.length > 0) {
            const img = images[0].trim();
            if (!img) return null;
            if (img.startsWith('http://') || img.startsWith('https://')) return img;
            if (img.startsWith('/')) return img;
            return `/${img}`;
          }
          
          return null;
        };

        const imageSrc = getImageSrc(item.images);

        return (
          
          <article
            className={`${className} mb-4 border-primary-darksecond dark:border-primary-lightsecond`}
            key={index + item.title}
          >
            {imageSrc && (
              <Image
                className="w-full max-h-[400px]"
                src={imageSrc}
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
