'use client';
import Link from 'next/link';
import style from './style.module.scss';
import { useTheme } from '@/context/themeContext';
import Input from '../formElements/input';

const Navbar = () => {
  const { theme, handleToggleTheme } = useTheme();
  return (
    <nav
      className={`${style.navbar} border-primary-dark dark:border-primary-light`}
    >
      <ul>
        <li>
          <Link href="/">ANA SAYFA</Link>
        </li>
        <li>
          <Link href="/about">HAKKINDA</Link>
        </li>
      </ul>
      <div className={`${style.search}`}>
        <Input placeholder="Yazı Ara" className="mr-3" />
        <button
          onClick={handleToggleTheme}
          className="p-2 text-sm h-[40px] font-bold bg-primary-dark text-primary-light dark:bg-primary-light dark:text-primary-dark"
        >
          {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
