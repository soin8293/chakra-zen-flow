import { useState } from "react";
import { chakras, Chakra, UserProfile } from "@/types/chakra";
import { MeditationFigure } from "@/components/MeditationFigure";
import { ParticleBackground } from "@/components/ParticleBackground";
import { MeditationPrep } from "@/components/MeditationPrep";
import { MeditationSession } from "@/components/MeditationSession";
import { SessionComplete } from "@/components/SessionComplete";
import { BottomSheet } from "@/components/BottomSheet";
import { ProfilePage } from "@/components/ProfilePage";
import { ChakraInfoPage } from "@/components/ChakraInfoPage";
import { ChakraArticle } from "@/components/ChakraArticle";

type AppScreen = 
  | 'home' 
  | 'prep' 
  | 'session' 
  | 'complete' 
  | 'profile' 
  | 'chakra-info' 
  | 'chakra-article';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('home');
  const [selectedChakra, setSelectedChakra] = useState<Chakra | null>(null);
  const [sessionDuration, setSessionDuration] = useState<number>(5);
  const [expandingChakraId, setExpandingChakraId] = useState<string | null>(null);

  // Mock user profile data
  const [userProfile] = useState<UserProfile>({
    totalMinutesMeditated: 127,
    currentStreak: 5,
    longestStreak: 12,
    favoritChakra: 'heart',
    sessionsCompleted: 23
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

  const handleStartMeditation = (duration: number) => {
    setSessionDuration(duration);
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
    setCurrentScreen('chakra-article');
  };

  const handleBack = () => {
    if (currentScreen === 'chakra-article') {
      setCurrentScreen('chakra-info');
    } else {
      setCurrentScreen('home');
    }
  };

  // Render current screen
  if (currentScreen === 'prep' && selectedChakra) {
    return (
      <MeditationPrep
        chakra={selectedChakra}
        onBack={handleBackToHome}
        onStart={handleStartMeditation}
      />
    );
  }

  if (currentScreen === 'session' && selectedChakra) {
    return (
      <MeditationSession
        chakra={selectedChakra}
        duration={sessionDuration}
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
      />
    );
  }

  if (currentScreen === 'chakra-article' && selectedChakra) {
    return (
      <ChakraArticle
        chakra={selectedChakra}
        onBack={handleBack}
      />
    );
  }

  // Home screen
  return (
    <div className="min-h-screen bg-gradient-cosmic relative overflow-hidden">
      {/* Particle background */}
      <ParticleBackground />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        {/* App title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
            ChakraFlow
          </h1>
          <p className="text-white/70">Guided chakra meditation</p>
        </div>

        {/* Meditation figure with chakras */}
        <div className="flex-1 flex items-center justify-center w-full max-w-md">
          <MeditationFigure
            onChakraClick={handleChakraClick}
            expandingChakraId={expandingChakraId}
          />
        </div>

        {/* Breathing instruction */}
        <div className="text-center text-white/60 mb-4">
          <p className="text-sm">Tap a chakra to begin your meditation journey</p>
        </div>
      </div>

      {/* Bottom sheet menu */}
      <BottomSheet
        onProfileClick={handleProfileClick}
        onChakraInfoClick={handleChakraInfoClick}
      />
    </div>
  );
};

export default Index;
