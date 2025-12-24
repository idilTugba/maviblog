'use client';
import { createContext, useContext, useEffect, useState } from 'react';

export interface BlogDataFromDB {
  blogs: BlogDataType[];
}

export interface BlogDataType {
  title: string;
  content: string;
  images?: string[] | string;
  videos?: string;
  id?: string;
  createdAt?: Date;
  category: string;
  featured?: boolean | string | number;
  like?: number;
}

interface BlogProviderType {
  children: React.ReactNode;
}

export interface BlogContextType {
  blogData: BlogDataType[];
  setBlogData: React.Dispatch<React.SetStateAction<BlogDataType[]>>;
}

const initialData = [
  {
    title: 'LOREM IPSUM',
    content: 'lorem ipsum....',
    category: 'Makale',
  },
];

const defaultContext = {
  blogData: initialData,
  setBlogData: (blogData: BlogDataType[]) => {},
};

const BlogContext = createContext(defaultContext);

export const BlogProvider = ({ children }: BlogProviderType) => {
  const [blogData, setBlogData] = useState<BlogDataType[]>(initialData);

  useEffect(() => {
    setBlogData(blogData);
  }, [blogData]);

  const value: BlogContextType = {
    blogData,
    setBlogData,
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};

export const useBlogData = () => useContext(BlogContext);
