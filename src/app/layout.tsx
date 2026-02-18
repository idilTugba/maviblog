import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './styles/styles.scss';
import { ThemeProvider } from '@/context/themeContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mavi Neşe Gölcük Blog',
  description: '...',
  other: {
    'preconnect-googleapis': 'https://fonts.googleapis.com',
    'preconnect-gstatic': 'https://fonts.gstatic.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-primary-light dark:bg-primary-dark text-primary-dark dark:text-primary-light`} style={{ margin: 0, padding: 0 }}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
