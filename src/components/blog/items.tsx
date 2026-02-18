'use client';
import React, { useState, useEffect } from 'react';
import { BlogDataType } from '@/context/blogContext';
import axios from 'axios';

// localStorage key
const LIKED_POSTS_KEY = 'maviblog_liked_posts';

// localStorage helper functions
const getLikedPosts = (): string[] => {
  if (typeof window === 'undefined') return [];
  try {
    const liked = localStorage.getItem(LIKED_POSTS_KEY);
    return liked ? JSON.parse(liked) : [];
  } catch {
    return [];
  }
};

const addLikedPost = (postId: string): void => {
  if (typeof window === 'undefined') return;
  try {
    const liked = getLikedPosts();
    if (!liked.includes(postId)) {
      liked.push(postId);
      localStorage.setItem(LIKED_POSTS_KEY, JSON.stringify(liked));
    }
  } catch (error) {
    console.error('localStorage error:', error);
  }
};

const isPostLiked = (postId: string): boolean => {
  const liked = getLikedPosts();
  return liked.includes(postId);
};

const Items = ({ data }: { data: BlogDataType }) => {
  const [likeCount, setLikeCount] = useState<number>(data.like || 0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // İlk yüklemede like sayısını ve beğenilme durumunu kontrol et
  useEffect(() => {
    // MongoDB'den gelen like sayısını kullan (undefined/null ise 0)
    const initialLikeCount =
      data.like !== undefined && data.like !== null ? data.like : 0;
    setLikeCount(initialLikeCount);

    if (data.id) {
      setIsLiked(isPostLiked(data.id));
    }

    console.log('Items - Blog ID:', data.id);
    console.log('Items - Initial like count:', initialLikeCount);
    console.log('Items - Data.like:', data.like);
  }, [data.like, data.id]);

  const handleLike = async () => {
    // Zaten beğenilmişse veya yükleniyorsa veya ID yoksa işlem yapma
    if (isLiked || isLoading || !data.id) return;

    setIsLoading(true);
    try {
      // Relative path kullan - Next.js API route'ları aynı domain'de
      const url = `/api/blog/${data.id}/like`;
      console.log('Like API URL:', url);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Like eklenirken bir hata oluştu');
      }

      const responseData = await response.json();
      console.log('Like response:', responseData);
      console.log('Like response.like:', responseData.like);
      console.log('Like response.blog?.like:', responseData.blog?.like);

      // Response'dan like sayısını al - önce response.like, sonra blog.like
      const newLikeCount =
        responseData.like !== undefined && responseData.like !== null
          ? responseData.like
          : responseData.blog?.like !== undefined &&
            responseData.blog?.like !== null
          ? responseData.blog.like
          : likeCount + 1;

      console.log('Yeni like sayısı:', newLikeCount);

      setLikeCount(newLikeCount);
      setIsLiked(true);

      // localStorage'a ekle
      addLikedPost(data.id);
    } catch (error: any) {
      console.error('Like hatası:', error);
      console.error('Error message:', error.message);
      // Hata durumunda optimistic update yapma, sadece kullanıcıya bilgi ver
    } finally {
      setIsLoading(false);
    }
  };

  // Kalp icon SVG
  const HeartIcon = ({ filled }: { filled: boolean }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4 inline-block mr-1"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
  );

  return (
    <div className="items mt-2 mb-2 text-sm font-[500] flex items-center">
      <span className="mr-5 pr-5 border-r-[1px] border-solid border-primary-dark dark:border-primary-light">
        {data.createdAt ? data.createdAt.toString().slice(0, 10) : ' '}
      </span>
      <span className="mr-5 pr-5 border-solid border-primary-dark dark:border-primary-light">
        {data.category ? data.category : 'Blog'}
      </span>
      {/* <span
        onClick={handleLike}
        className={`inline-flex items-center gap-1 cursor-pointer ${
          isLiked
            ? 'text-red-500 dark:text-red-400 cursor-not-allowed'
            : 'text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400'
        } transition-colors ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        title={isLiked ? 'Bu yazıyı zaten beğendiniz' : 'Beğen'}
      >
        <HeartIcon filled={isLiked} />
        <span>Beğen</span>
        {isLoading ? <span>...</span> : <span>{likeCount}</span>}
      </span> */}
    </div>
  );
};

export default Items;
