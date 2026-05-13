'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  /** Küçük önizleme görünümü (Next/Image className) */
  thumbnailClassName?: string;
};

export default function BlogImageLightbox({
  src,
  alt,
  width = 500,
  height = 200,
  thumbnailClassName = 'max-h-[550px] w-full object-contain',
}: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onClose = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  const modal =
    mounted &&
    open &&
    createPortal(
      <div
        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-4 sm:p-8"
        role="dialog"
        aria-modal="true"
        aria-label="Görsel tam boyut"
        onClick={onClose}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute right-3 top-3 z-[210] rounded-full border border-white/30 bg-neutral-900/80 px-4 py-2 text-sm font-medium text-white shadow-lg backdrop-blur-sm transition hover:bg-neutral-800"
        >
          Kapat
        </button>
        <div
          className="relative z-[205] flex max-h-[90vh] max-w-[95vw] items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Orijinal piksel boyutu; yalnızca viewport taşarsa küçültülür */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="h-auto w-auto max-h-[90vh] max-w-[95vw] object-contain"
          />
        </div>
      </div>,
      document.body
    );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative flex min-h-[550px] w-full cursor-zoom-in items-center justify-center border-0 bg-transparent p-0"
        aria-label={`${alt} — tam boyutta aç`}
      >
        <Image
          className={thumbnailClassName}
          src={src}
          alt={alt}
          width={width}
          height={height}
        />
        <span
          className="pointer-events-none absolute inset-0 rounded-sm ring-inset ring-transparent transition group-hover:bg-black/5 group-hover:ring-2 group-hover:ring-white/25"
          aria-hidden
        />
      </button>
      {modal}
    </>
  );
}
