import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { pageEnterVariants } from '@/design-system/motion';
import { Header } from './Header';
import { Footer } from './Footer';
import { PageLoader } from './PageLoader';
import { RouteErrorBoundary } from './RouteErrorBoundary';

export function MainLayout() {
  const { pathname } = useLocation();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-[#08090D] text-[#F8FAFC]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-[8px] focus:bg-[#8B5CF6] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[#F8FAFC]"
      >
        Skip to main content
      </a>

      <Header />

      <main id="main-content" className="flex-1">
        <RouteErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            {prefersReducedMotion ? (
              <Outlet />
            ) : (
              <motion.div
                key={pathname}
                variants={pageEnterVariants}
                initial="hidden"
                animate="visible"
              >
                <Outlet />
              </motion.div>
            )}
          </Suspense>
        </RouteErrorBoundary>
      </main>

      <Footer />
    </div>
  );
}
