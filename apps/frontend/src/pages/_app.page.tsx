import type { AppProps } from 'next/app';
import '@/styles/globals.scss';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProtectedLayout from './protected.layout';
import PublicLayout from './public.layout';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(pageProps.isAuthenticated);
  const router = useRouter();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 0,
      },
    },
  });

  if (pageProps.isAuthenticated !== isAuthenticated) {
    setIsAuthenticated(pageProps.isAuthenticated);
  }

  const Layout = isAuthenticated ? ProtectedLayout : PublicLayout;

  const animationForProtected = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const animation = isAuthenticated ? animationForProtected : {};

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Layout user={pageProps.userData}>
          <AnimatePresence mode='sync'>
            <motion.div key={router.route} {...animation}>
              <Component {...pageProps} />
            </motion.div>
          </AnimatePresence>
        </Layout>
      </QueryClientProvider>
    </>
  );
}
