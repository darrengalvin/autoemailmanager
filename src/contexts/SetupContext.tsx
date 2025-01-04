'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { steps } from '@/components/setup/config/steps';

type StepId = (typeof steps)[number]['id'];

interface SetupContextType {
  currentStep: StepId;
  completedSteps: StepId[];
  completeStep: (step: StepId) => void;
  goToStep: (step: StepId) => void;
}

const SetupContext = createContext<SetupContextType | null>(null);

export function SetupProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState<StepId>(steps[0].id);
  const [completedSteps, setCompletedSteps] = useState<StepId[]>([]);

  const completeStep = (step: StepId) => {
    setCompletedSteps(prev => {
      if (prev.includes(step)) return prev;
      return [...prev, step];
    });
    
    // Move to next step if available
    const currentIndex = steps.findIndex(s => s.id === step);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id);
    }
  };

  const goToStep = (step: StepId) => {
    setCurrentStep(step);
  };

  return (
    <SetupContext.Provider value={{
      currentStep,
      completedSteps,
      completeStep,
      goToStep
    }}>
      {children}
    </SetupContext.Provider>
  );
}

export function useSetup() {
  const context = useContext(SetupContext);
  if (!context) {
    throw new Error('useSetup must be used within a SetupProvider');
  }
  return context;
}