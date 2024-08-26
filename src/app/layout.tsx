import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './styles/styles.scss';
import { ApolloWrapper } from '@/lib/apollo-wrapper';
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mavi Neşe Gölcük Blog',
  description: '...',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`text-center bg-primary-light dark:bg-primary-dark text-primary-dark dark:text-primary-light`}
      >
        <div className="w-10/12 inline-block">
          <ApolloWrapper>
            <Header />
            {children}
            <Footer />
          </ApolloWrapper>
        </div>
      </body>
    </html>
  );
}
