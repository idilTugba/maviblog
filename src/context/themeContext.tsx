'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface ThemeProviderType {
  children: React.ReactNode;
}

interface ThemeContextType {
  theme: string;
  handleToggleTheme: () => void;
}

const defaultContext: ThemeContextType = {
  theme: 'light',
  handleToggleTheme: () => {},
};

const ThemeContext = createContext<ThemeContextType>(defaultContext);

export const ThemeProvider = ({ children }: ThemeProviderType) => {
  const [theme, setTheme] = useState<string>('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.add(storedTheme);
    }
  }, []);

  const handleToggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
  };

  const value = {
    theme,
    handleToggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
