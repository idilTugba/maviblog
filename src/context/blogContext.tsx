'use client';
import { createContext, useContext, useEffect, useState } from 'react';

export interface BlogDataType {
  title: string;
  description: string;
  img: string;
  id?: number;
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
    description: 'lorem ipsum....',
    img: 'frankenistein.jpeg',
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
    console.log('mutate');
  }, [blogData]);

  const value: BlogContextType = {
    blogData,
    setBlogData,
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};

export const useBlogData = () => useContext(BlogContext);
