'use client';

import { useRouter } from 'next/navigation';
import { Bot, ArrowLeft, ArrowRight, X } from 'lucide-react';
import { useSetup } from '@/contexts/SetupContext';
import { SetupProgress } from './SetupProgress';
import { steps, setupSteps, welcomeStep, StepId } from './config/steps';
import { createClient } from '@/utils/supabase/client';
import { useState } from 'react';

export function SetupContent() {
  const router = useRouter();
  const { currentStep, completedSteps, completeStep, goToStep } = useSetup();
  const [showSetup, setShowSetup] = useState(true);
  const CurrentStepComponent = steps.find(s => s.id === currentStep)?.component;
  
  const currentIndex = steps.findIndex(s => s.id === currentStep);
  const isFirstStep = currentIndex === 1; // First step after welcome
  const isLastStep = currentIndex === steps.length - 1;
  const isWelcomeStep = currentStep === welcomeStep.id;

  const handleStepComplete = async (step: StepId) => {
    completeStep(step);

    // If this was the welcome step, move to the first setup step
    if (step === welcomeStep.id) {
      goToStep(setupSteps[0].id);
      return;
    }

    // If this was the last step
    if (step === steps[steps.length - 1].id) {
      try {
        // Mark setup as complete in user settings
        const supabase = createClient();
        if (!supabase) throw new Error('Supabase client not initialized');
        
        await supabase
          .from('user_settings')
          .upsert({
            setup_completed: true,
            setup_completed_at: new Date().toISOString()
          });

        // Close setup and refresh the page
        setShowSetup(false);
        router.refresh();
      } catch (error) {
        console.error('Failed to mark setup as complete:', error);
      }
    }
  };

  const handleNext = () => {
    if (!isLastStep) {
      const nextIndex = currentIndex + 1;
      goToStep(steps[nextIndex].id);
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      const prevIndex = currentIndex - 1;
      // Don't go back to welcome step
      if (steps[prevIndex].id !== welcomeStep.id) {
        goToStep(steps[prevIndex].id);
      }
    }
  };

  if (!showSetup) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal content */}
      <div className="relative w-full max-h-[90vh] overflow-y-auto">
        <div className="relative max-w-4xl mx-auto bg-white rounded-xl shadow-xl">
          {/* Close button */}
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={() => setShowSetup(false)}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="px-8 py-12">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
              <Bot className="w-10 h-10 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {isWelcomeStep ? 'Welcome to Smart Email Manager' : 'Smart Email Manager Setup'}
                </h1>
                <p className="text-gray-600">
                  {isWelcomeStep 
                    ? 'Your self-hosted AI email assistant'
                    : 'Complete these steps to get started with your email assistant'}
                </p>
              </div>
            </div>

            <div className={isWelcomeStep ? '' : 'grid grid-cols-1 lg:grid-cols-4 gap-8'}>
              {/* Main Content */}
              <div className={isWelcomeStep ? 'w-full' : 'lg:col-span-3'}>
                <div className="bg-white rounded-xl shadow-sm p-8">
                  {CurrentStepComponent && (
                    <CurrentStepComponent 
                      onComplete={() => handleStepComplete(currentStep)}
                    />
                  )}
                </div>

                {/* Navigation - Only show for non-welcome steps */}
                {!isWelcomeStep && (
                  <div className="flex justify-between mt-6">
                    <button
                      onClick={handlePrevious}
                      disabled={isFirstStep}
                      className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Previous
                    </button>

                    <button
                      onClick={handleNext}
                      disabled={isLastStep || !completedSteps.includes(currentStep)}
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Setup Progress - Only show for non-welcome steps */}
              {!isWelcomeStep && (
                <div className="lg:col-span-1">
                  <div className="sticky top-6">
                    <SetupProgress
                      steps={setupSteps}
                      currentStep={currentStep}
                      completedSteps={completedSteps}
                      onStepClick={goToStep}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}