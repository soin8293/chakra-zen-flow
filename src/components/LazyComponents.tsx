import { lazy, Suspense } from 'react';

// Lazy load components for better performance and app store optimization
const MeditationSession = lazy(() => import('@/components/MeditationSession').then(module => ({ default: module.MeditationSession })));
const ChakraInfoPage = lazy(() => import('@/components/ChakraInfoPage').then(module => ({ default: module.ChakraInfoPage })));
const ArticlePage = lazy(() => import('@/components/ArticlePage').then(module => ({ default: module.ArticlePage })));
const BookmarksPage = lazy(() => import('@/components/BookmarksPage').then(module => ({ default: module.BookmarksPage })));
const ProfilePage = lazy(() => import('@/components/ProfilePage').then(module => ({ default: module.ProfilePage })));
const ChakraArticle = lazy(() => import('@/components/ChakraArticle').then(module => ({ default: module.ChakraArticle })));
const SessionComplete = lazy(() => import('@/components/SessionComplete').then(module => ({ default: module.SessionComplete })));
const MeditationPrep = lazy(() => import('@/components/MeditationPrep').then(module => ({ default: module.MeditationPrep })));

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

export const LazyBookmarksPage = (props: any) => (
  <Suspense fallback={<PageLoading />}>
    <BookmarksPage {...props} />
  </Suspense>
);

export const LazyProfilePage = (props: any) => (
  <Suspense fallback={<PageLoading />}>
    <ProfilePage {...props} />
  </Suspense>
);

export const LazyChakraArticle = (props: any) => (
  <Suspense fallback={<PageLoading />}>
    <ChakraArticle {...props} />
  </Suspense>
);

export const LazySessionComplete = (props: any) => (
  <Suspense fallback={<PageLoading />}>
    <SessionComplete {...props} />
  </Suspense>
);

export const LazyMeditationPrep = (props: any) => (
  <Suspense fallback={<PageLoading />}>
    <MeditationPrep {...props} />
  </Suspense>
);