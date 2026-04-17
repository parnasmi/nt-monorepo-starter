// Source: apps/dashboard/src/app/providers/publicProvider/PublicProvider.tsx
// Target: apps/naiton/src/app/providers/publicProvider/PublicProvider.tsx
// Adapt: remove dashboard-specific hooks (useAuth, useDocumentTitle, useMetaDescription),
//        replace with naiton equivalents. Keep QueryClient + apiSubscribe pattern.

import { getRouteAuth } from '@/shared/const/router.const.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useEffect, useLayoutEffect } from 'react';
import { Toaster } from 'sonner';
import { useBoundStore } from '@/shared/store';
import { apiSubscribe } from '@/shared/api/api';
import { useLocation, useNavigate } from 'react-router';
import storage from '@/shared/lib/storage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 60_000,
      refetchOnWindowFocus: true,
    },
  },
});

useBoundStore.subscribe((state) => {
  apiSubscribe(state);
});

export const PublicProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isLoginPage = pathname === getRouteAuth() || pathname.startsWith('/auth');
  const isAuthenticated = useBoundStore((s) => s.isAuthenticated);

  useLayoutEffect(() => {
    if (isAuthenticated && isLoginPage) {
      navigate('/app/dashboard');
    }
  }, [isLoginPage, navigate, isAuthenticated]);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
};
