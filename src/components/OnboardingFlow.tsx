import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Heart, Brain, Sparkles } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

const onboardingSteps = [
  {
    title: "Welcome to ZenFlow",
    description: "Your journey to chakra healing and energy balance begins here",
    icon: Sparkles,
    content: "ZenFlow combines ancient chakra wisdom with modern meditation techniques to help you achieve holistic wellness and spiritual growth."
  },
  {
    title: "Interactive Chakra Experience", 
    description: "Touch and explore your seven energy centers",
    icon: Heart,
    content: "Our interactive meditation figure lets you explore each chakra individually. Touch any energy point to learn about its properties and begin targeted healing practices."
  },
  {
    title: "Guided Breathing & Learning",
    description: "Synchronized breathing exercises and comprehensive education",
    icon: Brain,
    content: "Follow guided breathing patterns designed for each chakra, and access our extensive library of articles covering the science and practice of energy healing."
  }
];

export function OnboardingFlow({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('zenflow_onboarding_complete');
    if (hasSeenOnboarding) {
      setIsVisible(false);
      onComplete();
    }
  }, [onComplete]);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    localStorage.setItem('zenflow_onboarding_complete', 'true');
    setIsVisible(false);
    onComplete();
  };

  const handleSkip = () => {
    handleComplete();
  };

  if (!isVisible) return null;

  const step = onboardingSteps[currentStep];
  const IconComponent = step.icon;

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 w-fit">
            <IconComponent className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-xl">{step.title}</CardTitle>
          <CardDescription>{step.description}</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <p className="text-center text-muted-foreground leading-relaxed">
            {step.content}
          </p>
          
          <div className="flex justify-center space-x-2">
            {onboardingSteps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full transition-colors ${
                  index === currentStep ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
          
          <div className="flex justify-between items-center pt-4">
            <Button variant="ghost" onClick={handleSkip} className="text-muted-foreground">
              Skip
            </Button>
            
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">
                {currentStep + 1} of {onboardingSteps.length}
              </Badge>
              <Button onClick={handleNext} className="min-w-[100px]">
                {currentStep === onboardingSteps.length - 1 ? 'Get Started' : 'Next'}
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}