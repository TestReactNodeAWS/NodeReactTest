import { StylesProvider } from '@material-ui/core';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { Theme } from './components/Theme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export const AppProviders: React.FC = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {/* injectFirst lets styled-components styles override Material UI's. */}
    <StylesProvider injectFirst>
      <Theme>
        <BrowserRouter>{children}</BrowserRouter>
      </Theme>
    </StylesProvider>
  </QueryClientProvider>
);
