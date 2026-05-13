'use client';
import React, { useEffect, useState } from 'react';
import { BlogDataType } from '@/context/blogContext';
import Link from 'next/link';
import Items from './items';
import BlogImageLightbox from './BlogImageLightbox';

const BlogList = function BlogList({
  data,
  className,
  titlesOnly = false,
}: {
  data: BlogDataType[];
  className?: string;
  /** true: yalnızca yazı başlığı (ör. /blog liste sayfası) */
  titlesOnly?: boolean;
}) {
  const [showIframe, setShowIframe] = useState(false);

  useEffect(() => {
    if (titlesOnly) return;
    setShowIframe(true);
  }, [titlesOnly]);

  return (
    <div>
      {data?.map((item, index) => {
        if (titlesOnly) {
          return (
            <article
              className={`${className} mb-3 border-primary-darksecond dark:border-primary-lightsecond`}
              key={index + item.title}
            >
              <div className="title text-left font-bold text-lg md:text-xl">
                <Link href={`/blog/${item.id}`} className="text-gray-800 hover:underline">
                  {item.title}
                </Link>
              </div>
            </article>
          );
        }

        const getImageSrc = (images: string[] | string | undefined): string | null => {
          if (!images) return null;

          if (typeof images === 'string') {
            const img = images.trim();
            if (!img) return null;
            if (img.startsWith('http://') || img.startsWith('https://')) return img;
            if (img.startsWith('/')) return img;
            return `/${img}`;
          }

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
            {imageSrc && <BlogImageLightbox src={imageSrc} alt={item.title} />}
            {showIframe && item.videos !== undefined && item.videos ? (
              <iframe width="100%" height="250" src={item.videos} title={item.title} />
            ) : null}

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
