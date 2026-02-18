'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import style from './style.module.scss';
import { useTheme } from '@/context/themeContext';
import Input from '../formElements/input';

const Navbar = () => {
  const { theme, handleToggleTheme } = useTheme();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = sessionStorage.getItem('token');
      setIsAuthenticated(!!token);
    }
  }, []);

  return (
    <nav
      className={`${style.navbar} border-primary-dark dark:border-primary-light`}
    >
      <ul className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-0 mb-3 md:mb-0">
        <li>
          <Link href="/" className="text-sm md:text-base">
            ANA SAYFA
          </Link>
        </li>
        <li>
          <Link href="/about" className="text-sm md:text-base">
            HAKKINDA
          </Link>
        </li>
        {isAuthenticated && (
          <li>
            <Link href="/addpost" className="text-sm md:text-base">
              YENİ YAZI
            </Link>
          </li>
        )}
      </ul>
      {/* <div className={`${style.search}`}>
        <Input placeholder="Yazı Ara" className="h-[40px] text-sm md:text-base" />
        <button
          onClick={handleToggleTheme}
          className="p-2 text-xs md:text-sm h-[40px] font-bold bg-primary-dark text-primary-light dark:bg-primary-light dark:text-primary-dark whitespace-nowrap"
        >
          {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </div> */}
    </nav>
  );
};

export default Navbar;
