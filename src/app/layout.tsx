import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './styles/styles.scss';
// import { ApolloWrapper } from '@/lib/apollo-wrapper';
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';
import { ThemeProvider } from '@/context/themeContext';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import Error from './error';

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
      <body
        className={`text-center bg-primary-light dark:bg-primary-dark text-primary-dark dark:text-primary-light`}
      >
        <div className="w-full md:w-10/12 px-4 md:px-0 inline-block">
          {/* <ErrorBoundary fallback={<Error error={new Error()} reset={() => {}} />}> */}
          <ThemeProvider>
            <Header />
            {children}
            <Footer />
          </ThemeProvider>
          {/* </ErrorBoundary> */}
        </div>
      </body>
    </html>
  );
}
