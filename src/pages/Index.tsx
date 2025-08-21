import { useState } from "react";
import { chakras, Chakra, UserProfile } from "@/types/chakra";
import { MeditationFigure } from "@/components/MeditationFigure";
import { ParticleBackground } from "@/components/ParticleBackground";
import { MeditationPrep } from "@/components/MeditationPrep";
import { MeditationSession } from "@/components/MeditationSession";
import { SessionComplete } from "@/components/SessionComplete";
import { NavigationSheet } from "@/components/NavigationSheet";
import { MeditationCTA } from "@/components/MeditationCTA";
import { ProfilePage } from "@/components/ProfilePage";
import { ChakraInfoPage } from "@/components/ChakraInfoPage";
import { ChakraArticle } from "@/components/ChakraArticle";
import { ArticlePage } from "@/components/ArticlePage";
import { BookmarksPage } from "@/components/BookmarksPage";
import { OnboardingFlow } from "@/components/OnboardingFlow";

type AppScreen = 
  | 'home' 
  | 'prep' 
  | 'session' 
  | 'complete' 
  | 'profile' 
  | 'chakra-info' 
  | 'chakra-article'
  | 'article'
  | 'bookmarks';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('home');
  const [selectedChakra, setSelectedChakra] = useState<Chakra | null>(null);
  const [sessionDuration, setSessionDuration] = useState<number>(5);
  const [sessionConfig, setSessionConfig] = useState<{ level: 'beginner'|'intermediate'|'advanced'; presetOverride: 'spec'|'calm'|'balance'|'energize'; includeHolds: boolean; }>({ level: 'beginner', presetOverride: 'balance', includeHolds: false });
  const [expandingChakraId, setExpandingChakraId] = useState<string | null>(null);
  const [articleOrigin, setArticleOrigin] = useState<'prep' | 'info' | null>(null);
  const [currentArticleId, setCurrentArticleId] = useState<string | null>(null);
  const [searchTag, setSearchTag] = useState<string>('');
  const [hasActiveSession, setHasActiveSession] = useState<boolean>(false);
  const [showOnboarding, setShowOnboarding] = useState<boolean>(true);

  // Mock user profile data
  const [userProfile] = useState<UserProfile>({
    totalMinutesMeditated: 127,
    currentStreak: 5,
    longestStreak: 12,
    favoritChakra: 'heart',
    sessionsCompleted: 23,
    bookmarks: [],
    readingHistory: []
  });

  const handleChakraClick = (chakraId: string) => {
    const chakra = chakras.find(c => c.id === chakraId);
    if (chakra) {
      setExpandingChakraId(chakraId);
      setSelectedChakra(chakra);
      
      // Delay to show expansion animation
      setTimeout(() => {
        setCurrentScreen('prep');
        setExpandingChakraId(null);
      }, 800);
    }
  };

const handleStartMeditation = (opts: { duration: number; level: 'beginner'|'intermediate'|'advanced'; presetOverride: 'spec'|'calm'|'balance'|'energize'; includeHolds: boolean; }) => {
  setSessionDuration(opts.duration);
  setSessionConfig({ level: opts.level, presetOverride: opts.presetOverride, includeHolds: opts.includeHolds });
  setCurrentScreen('session');
};

  const handleSessionComplete = () => {
    setCurrentScreen('complete');
  };

  const handleRestartSession = () => {
    setCurrentScreen('session');
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
    setSelectedChakra(null);
  };

  const handleProfileClick = () => {
    setCurrentScreen('profile');
  };

  const handleChakraInfoClick = () => {
    setCurrentScreen('chakra-info');
  };

  const handleChakraSelect = (chakra: Chakra) => {
    setSelectedChakra(chakra);
    setArticleOrigin('info');
    setCurrentScreen('chakra-article');
  };

  const handleArticleSelect = (articleId: string) => {
    setCurrentArticleId(articleId);
    setCurrentScreen('article');
  };

  const handleBookmarksClick = () => {
    setCurrentScreen('bookmarks');
  };

  const handleTagClick = (tag: string) => {
    setSearchTag(tag);
    setCurrentScreen('chakra-info');
  };

  const handleBack = () => {
    if (currentScreen === 'chakra-article') {
      if (articleOrigin === 'prep') {
        setCurrentScreen('prep');
      } else if (articleOrigin === 'info') {
        setCurrentScreen('chakra-info');
      } else {
        setCurrentScreen('home');
      }
      setArticleOrigin(null);
    } else if (currentScreen === 'article') {
      setCurrentScreen('chakra-info');
      setCurrentArticleId(null);
    } else if (currentScreen === 'bookmarks') {
      setCurrentScreen('chakra-info');
    } else {
      setCurrentScreen('home');
    }
    // Reset search tag when navigating back
    if (currentScreen !== 'chakra-info') {
      setSearchTag('');
    }
  };

// Render current screen
if (currentScreen === 'prep' && selectedChakra) {
  return (
    <MeditationPrep
      chakra={selectedChakra}
      onBack={handleBackToHome}
      onStart={handleStartMeditation}
      onLearn={() => { setArticleOrigin('prep'); setCurrentScreen('chakra-article'); }}
    />
  );
}

if (currentScreen === 'session' && selectedChakra) {
  return (
    <MeditationSession
      chakra={selectedChakra}
      duration={sessionDuration}
      level={sessionConfig.level}
      presetOverride={sessionConfig.presetOverride}
      includeHolds={sessionConfig.includeHolds}
      onComplete={handleSessionComplete}
      onExit={handleBackToHome}
    />
  );
}

  if (currentScreen === 'complete' && selectedChakra) {
    return (
      <SessionComplete
        chakra={selectedChakra}
        duration={sessionDuration}
        onRestart={handleRestartSession}
        onBackToHome={handleBackToHome}
      />
    );
  }

  if (currentScreen === 'profile') {
    return (
      <ProfilePage
        profile={userProfile}
        onBack={handleBackToHome}
      />
    );
  }

  if (currentScreen === 'chakra-info') {
    return (
      <ChakraInfoPage
        onBack={handleBackToHome}
        onChakraSelect={handleChakraSelect}
        onArticleSelect={handleArticleSelect}
        onBookmarksClick={handleBookmarksClick}
        initialSearchTag={searchTag}
      />
    );
  }

  if (currentScreen === 'article' && currentArticleId) {
    return (
      <ArticlePage
        articleId={currentArticleId}
        onBack={handleBack}
        onNavigateToArticle={handleArticleSelect}
        onTagClick={handleTagClick}
      />
    );
  }

  if (currentScreen === 'bookmarks') {
    return (
      <BookmarksPage
        onBack={handleBack}
        onNavigateToArticle={handleArticleSelect}
      />
    );
  }

  if (currentScreen === 'chakra-article' && selectedChakra) {
    return (
      <ChakraArticle
        chakra={selectedChakra}
        onBack={handleBack}
        onArticleSelect={handleArticleSelect}
      />
    );
  }

  // Show onboarding first
  if (showOnboarding) {
    return <OnboardingFlow onComplete={() => setShowOnboarding(false)} />;
  }

  // Home screen
  return (
    <div className="min-h-screen bg-gradient-cosmic relative overflow-hidden">
      {/* Particle background (dimmed for better contrast) */}
      <div className="opacity-40">
        <ParticleBackground />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header with streak indicator */}
        <div className="text-center pt-8 pb-6 px-4">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">
              ZenFlow
            </h1>
            <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">
              <span className="text-lg">🔥</span>
              <span className="text-white font-semibold">{userProfile.currentStreak}</span>
            </div>
          </div>
          <p className="text-white/70 text-lg">Guided chakra meditation</p>
          <p className="text-white/50 text-sm mt-1">
            {userProfile.totalMinutesMeditated} minutes • {userProfile.sessionsCompleted} sessions
          </p>
        </div>

        {/* Primary CTA */}
        <div className="px-4">
          <MeditationCTA
            isActive={hasActiveSession}
            onStart={() => {
              // Quick start with root chakra
              const rootChakra = chakras.find(c => c.id === 'root');
              if (rootChakra) {
                setSelectedChakra(rootChakra);
                setCurrentScreen('prep');
              }
            }}
            onResume={() => {
              if (selectedChakra) {
                setCurrentScreen('session');
              }
            }}
          />
        </div>

        {/* Meditation figure with chakras */}
        <div className="flex-1 flex items-center justify-center px-4">
          <MeditationFigure
            onChakraClick={handleChakraClick}
            expandingChakraId={expandingChakraId}
          />
        </div>

        {/* Instruction */}
        <div className="text-center text-white/60 pb-6 px-4">
          <p className="text-sm">Tap a chakra point to customize your session</p>
        </div>
      </div>

      {/* Navigation sheet */}
      <NavigationSheet
        onProfileClick={handleProfileClick}
        onChakraInfoClick={handleChakraInfoClick}
      />
    </div>
  );
};

export default Index;
