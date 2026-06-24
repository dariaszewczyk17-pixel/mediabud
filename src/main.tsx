// cache-bust-mobile-fix-v2
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import App from './App.tsx'
import './index.css' // cache-bust-product-schema-v2

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,  // 5 min — dane świeże przez 5 minut
      gcTime: 30 * 60 * 1000,   // 30 min — garbage collection po 30 min
      refetchOnWindowFocus: false, // nie odświeżaj przy focus okna
      retry: 1, // jedna próba retry przy błędzie
    },
  },
})

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
// schema-fix-v3
window.__mb_build = "schema-v3-2026-06-24";
