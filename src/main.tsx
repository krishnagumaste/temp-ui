import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvider } from './context/userDetailsContext';
import { RoutesWrapper } from './routes/routes.tsx';
import { ThemeProvider } from './theme/ThemeProvider.tsx';
import { Toaster } from 'hero-shad';
import './index.css';
import 'hero-shad/dist.style.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
          <Toaster />
          <RoutesWrapper />
        </ThemeProvider>
      </QueryClientProvider>
    </UserProvider>
  </React.StrictMode>
);
