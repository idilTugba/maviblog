// apollo.tsx
'use client';

import { ApolloLink, HttpLink } from '@apollo/client';
import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support';
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev';
import { setVerbosity } from 'ts-invariant';
import { ThemeProvider } from '@/context/themeContext';
import { setContext } from '@apollo/client/link/context';

if (process.env.NODE_ENV === 'development') {
  setVerbosity('debug');
  loadDevMessages();
  loadErrorMessages();
}

function makeClient() {
  const token =
    typeof window !== 'undefined' ? sessionStorage.getItem('token') : '';

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: 'http://localhost:3000/api/graphql',
      credentials: 'same-origin',
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    }),
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      <ThemeProvider>{children}</ThemeProvider>
    </ApolloNextAppProvider>
  );
}
