import React from 'react';
import ReactDOM from 'react-dom/client';
import { MutationCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import App from './App';
import './index.css';
import ErrorBoundary from './shared/errorboundary/ErrorBoundary';





const queryClient:QueryClient = new QueryClient({
  mutationCache:new MutationCache({
    onSuccess: async (data, variable, context, mutation) => {
      if (Array.isArray(mutation.meta?.invalidates)) {
        return queryClient.invalidateQueries({
          queryKey:mutation.meta?.invalidates
        })
      }
      if (Array.isArray(mutation.meta?.updates)) {
        return queryClient.setQueryData([mutation.meta?.invalidates], data)
      }
    }
  }),

  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ErrorBoundary>
  <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </QueryClientProvider>

  </ErrorBoundary>
);
