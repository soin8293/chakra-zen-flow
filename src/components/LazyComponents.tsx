import { lazy, Suspense } from 'react';

// Lazy load components for better performance
const MeditationSession = lazy(() => import('@/components/MeditationSession').then(module => ({ default: module.MeditationSession })));
const ChakraInfoPage = lazy(() => import('@/components/ChakraInfoPage').then(module => ({ default: module.ChakraInfoPage })));
const ArticlePage = lazy(() => import('@/components/ArticlePage').then(module => ({ default: module.ArticlePage })));

// Loading fallback component
const PageLoading = () => (
  <div className="min-h-screen bg-gradient-cosmic flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
      <p className="text-white/70">Loading ZenFlow...</p>
    </div>
  </div>
);

// Wrap components with Suspense
export const LazyMeditationSession = (props: any) => (
  <Suspense fallback={<PageLoading />}>
    <MeditationSession {...props} />
  </Suspense>
);

export const LazyChakraInfoPage = (props: any) => (
  <Suspense fallback={<PageLoading />}>
    <ChakraInfoPage {...props} />
  </Suspense>
);

export const LazyArticlePage = (props: any) => (
  <Suspense fallback={<PageLoading />}>
    <ArticlePage {...props} />
  </Suspense>
);