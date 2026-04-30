import Image from 'next/image';
import React from 'react';
import style from './style.module.scss';
import Items from './items';
import { BlogDataType } from '@/context/blogContext';

/** Basit <a href="https://...">metin</a> → [metin](url) (yalnızca http/https) */
function normalizeHtmlAnchorsToMarkdown(text: string): string {
  return text.replace(
    /<a\s+[^>]*href=["'](https?:\/\/[^"']+)["'][^>]*>([^<]*)<\/a>/gi,
    (_, url: string, label: string) => {
      const t = label.trim();
      return `[${t || url}](${url})`;
    }
  );
}

function linkifyPlainUrls(
  text: string,
  paragraphIndex: number,
  keyBase: number
): React.ReactNode[] {
  const parts = text.split(/(https?:\/\/[^\s<]+)/g);
  return parts.map((part, i) => {
    if (/^https?:\/\//.test(part)) {
      return (
        <a
          key={`p${paragraphIndex}-u-${keyBase + i}`}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
        >
          {part}
        </a>
      );
    }
    return part;
  });
}

function renderRichParagraph(text: string, paragraphIndex: number): React.ReactNode {
  const normalized = normalizeHtmlAnchorsToMarkdown(text);
  const out: React.ReactNode[] = [];
  let rest = normalized;
  let linkIdx = 0;
  const md = /\[(.+?)\]\((https?:\/\/[^)\s]+)\)/;

  while (rest.length > 0) {
    const m = rest.match(md);
    if (!m || m.index === undefined) {
      out.push(...linkifyPlainUrls(rest, paragraphIndex, linkIdx));
      break;
    }
    if (m.index > 0) {
      out.push(...linkifyPlainUrls(rest.slice(0, m.index), paragraphIndex, linkIdx));
      linkIdx += 32;
    }
    out.push(
      <a
        key={`p${paragraphIndex}-md-${linkIdx++}`}
        href={m[2]}
        target="_blank"
        rel="noopener noreferrer"
      >
        {m[1]}
      </a>
    );
    rest = rest.slice(m.index + m[0].length);
  }
  return <>{out}</>;
}

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
            return (
              <p key={index}>{renderRichParagraph(paragraph.trim(), index)}</p>
            );
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
