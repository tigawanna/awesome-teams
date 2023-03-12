import React from 'react';
import ReactDOM from 'react-dom/client';
import { MutationCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import App from './App';
import './index.css';
import ErrorBoundary from './shared/errorboundary/ErrorBoundary';
import { ListResult, Record } from 'pocketbase';





const queryClient:QueryClient = new QueryClient({
  mutationCache:new MutationCache({
    onSuccess: async (data, variable, context, mutation) => {
      // console.group("global success  data,variable,context,mutation==== ",data,variable,context,mutation)
      if (Array.isArray(mutation.meta?.invalidates)) {
        return queryClient.invalidateQueries({
          queryKey:mutation.meta?.invalidates
        })
      }

      //  to update cache list items by pocketbase pagianted list queries
      if (Array.isArray(mutation.meta?.updatelistitems)) {
        const update_list_key = mutation.meta?.updatelistitems as string[]
        return queryClient.setQueryData(update_list_key, (oldData?:ListResult<Record>) => {
          const q_data = data as Record
          // console.log("oldData === ",oldData)
          if (q_data.id && oldData) {
            const updatedItems = oldData.items.map((item) => {
              if (item.id === q_data.id) {
                // Return the new object if the id matches
                return q_data;
              }
              // Otherwise, return the current item
              return item;
            });

            // Return the updated data with the new items array
            return {
              ...oldData,
              items: updatedItems,
            };
          }


          return oldData
        })
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
      <ReactQueryDevtools initialIsOpen={false} />
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </QueryClientProvider>

  </ErrorBoundary>
);
