import Image from 'next/image';
import React from 'react';
import style from './style.module.scss';
import Items from './items';
import { BlogDataType } from '@/context/blogContext';

const BlogDetail = ({ data }: { data: BlogDataType }) => {
  const preserveLines = Boolean(data.preserveLineBreaks);

  const imageSrc =
    data.images && data.images.length > 0
      ? data.images[0].startsWith('/')
        ? data.images[0]
        : `/${data.images[0]}`
      : null;

  return (
    <div className={style.blogdetail}>
      <div className={style.blogdetail_content_fullwidth}>
        {data.videos && data.videos.length > 0 && (
          <iframe
            width="100%"
            height="250"
            src={data.videos}
            title="Video Player"
            allowFullScreen
          ></iframe>
        )}
        <Items data={data} />
        <h1>{data.title}</h1>
        <div
          className={
            preserveLines
              ? `${style.content} ${style.contentPreserveLines}`
              : style.content
          }
        >
          {data.content?.split('\n\n').map((paragraph, index) => {
            if (paragraph.trim() === '') return null;
            return <p key={index}>{paragraph.trim()}</p>;
          })}
        </div>
        {imageSrc && (
          <div className={style.blogdetail_image}>
            <Image
              className="w-full max-h-[400px]"
              src={imageSrc}
              alt={data.title}
              width={500}
              height={200}
            />
            {data.imageCaption && (
              <p className="mt-3 text-center text-gray-600 italic text-sm md:text-base">
                {data.imageCaption}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetail;
