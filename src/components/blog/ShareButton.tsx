'use client';

import React, { useState } from 'react';

interface ShareButtonProps {
  title: string;
}

const ShareButton = ({ title }: ShareButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = title;

  const shareActions = {
    native: () => {
      if (navigator.share) {
        navigator
          .share({
            title: shareText,
            url: shareUrl,
            text: shareText,
          })
          .then(() => setIsOpen(false))
          .catch(() => {});
      } else {
        // Fallback: copy link
        copyLink();
      }
    },
    twitter: () => {
      const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        shareText,
      )}&url=${encodeURIComponent(shareUrl)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      setIsOpen(false);
    },
    facebook: () => {
      const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl,
      )}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      setIsOpen(false);
    },
    whatsapp: () => {
      const text = `${shareText} ${shareUrl}`;
      const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      setIsOpen(false);
    },
    telegram: () => {
      const url = `https://t.me/share/url?url=${encodeURIComponent(
        shareUrl,
      )}&text=${encodeURIComponent(shareText)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      setIsOpen(false);
    },
    copyLink: () => {
      copyLink();
    },
    instagram: () => {
      // Instagram web'den doğrudan paylaşım desteklemiyor; linki kopyala + uygulama aç
      copyLink();
      window.open(
        'https://www.instagram.com/',
        '_blank',
        'noopener,noreferrer',
      );
      setIsOpen(false);
    },
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    }
  };

  const shareOptions = [
    { key: 'native', label: 'Cihazda paylaş', icon: '📱' },
    { key: 'twitter', label: "X'te paylaş", icon: '𝕏' },
    { key: 'facebook', label: "Facebook'ta paylaş", icon: 'f' },
    { key: 'whatsapp', label: "WhatsApp'ta paylaş", icon: '💬' },
    { key: 'telegram', label: "Telegram'da paylaş", icon: '✈️' },
    { key: 'copyLink', label: 'Link kopyala', icon: '🔗' },
    {
      key: 'instagram',
      label: "Instagram'da paylaşma linki kopyala, uygulamayı aç",
      icon: '📷',
    },
  ];

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        aria-label="Paylaş"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4"
        >
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
        Paylaş
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="share-modal-title"
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-xl shadow-xl max-w-sm w-full p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              id="share-modal-title"
              className="text-lg font-semibold text-gray-900 dark:text-white mb-4"
            >
              Paylaş
            </h2>
            <ul className="space-y-1">
              {shareOptions.map(({ key, label, icon }) => (
                <li key={key}>
                  <button
                    type="button"
                    onClick={() =>
                      shareActions[key as keyof typeof shareActions]()
                    }
                    className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-800 dark:text-gray-200"
                  >
                    <span className="text-xl w-8 text-center">{icon}</span>
                    <span>{label}</span>
                    {key === 'copyLink' && copyFeedback && (
                      <span className="ml-auto text-sm text-green-600">
                        Kopyalandı!
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="mt-4 w-full py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              İptal
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ShareButton;
