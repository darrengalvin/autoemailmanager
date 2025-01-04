'use client';

import { useRouter } from 'next/navigation';
import { Bot, ArrowLeft, ArrowRight } from 'lucide-react';
import { useSetup } from '@/contexts/SetupContext';
import { SetupProgress } from './SetupProgress';
import { steps, StepId } from './config/steps';
import { createClient } from '@/utils/supabase/client';

export function SetupContent() {
  const router = useRouter();
  const { currentStep, completedSteps, completeStep, goToStep } = useSetup();
  const CurrentStepComponent = steps.find(s => s.id === currentStep)?.component;
  
  const currentIndex = steps.findIndex(s => s.id === currentStep);
  const isFirstStep = currentIndex === 0;
  const isLastStep = currentIndex === steps.length - 1;

  const handleStepComplete = async (step: StepId) => {
    completeStep(step);

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

        // Redirect to dashboard
        router.push('/?setup=complete');
      } catch (error) {
        console.error('Failed to mark setup as complete:', error);
      }
    }
  };

  const handleNext = () => {
    if (!isLastStep) {
      goToStep(steps[currentIndex + 1].id);
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      goToStep(steps[currentIndex - 1].id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto pt-12 px-4 pb-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Bot className="w-10 h-10 text-primary" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">System Setup</h1>
            <p className="text-gray-600">Complete these steps to set up your Smart Email Manager</p>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <SetupProgress
            steps={steps}
            currentStep={currentStep}
            completedSteps={completedSteps}
            onStepClick={goToStep}
          />
        </div>

        {/* Current Step Content */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          {CurrentStepComponent && (
            <CurrentStepComponent 
              onComplete={() => handleStepComplete(currentStep)}
            />
          )}
        </div>

        {/* Navigation */}
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
      </div>
    </div>
  );
}