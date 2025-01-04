'use client';

import { LucideIcon } from 'lucide-react';
import { StepId } from './config/steps';

interface SetupProgressProps {
  steps: ReadonlyArray<{
    id: StepId;
    title: string;
    description: string;
    icon: LucideIcon;
  }>;
  currentStep: StepId;
  completedSteps: StepId[];
  onStepClick: (stepId: StepId) => void;
}

export function SetupProgress({ steps, currentStep, completedSteps, onStepClick }: SetupProgressProps) {
  return (
    <div className="grid gap-4">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isActive = step.id === currentStep;
        const isCompleted = completedSteps.includes(step.id);
        const isClickable = isCompleted || completedSteps.includes(steps[index - 1]?.id);

        return (
          <button
            key={step.id}
            onClick={() => isClickable && onStepClick(step.id)}
            disabled={!isClickable}
            className={`relative flex items-start gap-4 p-4 rounded-lg transition-all text-left ${
              isActive ? 'bg-blue-50 ring-1 ring-blue-100 scale-102' : 
              isCompleted ? 'bg-green-50' : 
              'bg-gray-50'
            } ${isClickable ? 'cursor-pointer hover:ring-1 hover:ring-gray-200' : 'cursor-not-allowed opacity-50'}`}
          >
            {/* Connection Line */}
            {index < steps.length - 1 && (
              <div 
                className={`absolute left-7 top-12 bottom-0 w-0.5 ${
                  isCompleted ? 'bg-green-200' : 'bg-gray-200'
                }`} 
              />
            )}

            {/* Icon */}
            <div className={`relative z-10 p-2 rounded-full transition-colors ${
              isActive ? 'bg-blue-100 text-blue-600 ring-4 ring-blue-50' :
              isCompleted ? 'bg-green-100 text-green-600' :
              'bg-gray-100 text-gray-400'
            }`}>
              <Icon className="w-5 h-5" />
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h3 className={`font-medium ${
                  isActive ? 'text-blue-900' :
                  isCompleted ? 'text-green-900' :
                  'text-gray-900'
                }`}>
                  {step.title}
                </h3>
                {!isCompleted && !isActive && (
                  <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                    {isClickable ? 'Ready' : 'Locked'}
                  </span>
                )}
              </div>
              <p className={`text-sm mt-1 ${
                isActive ? 'text-blue-600' :
                isCompleted ? 'text-green-600' :
                'text-gray-500'
              }`}>
                {step.description}
              </p>
            </div>

            {/* Status */}
            <div className="flex items-center">
              {isCompleted && (
                <span className="text-sm font-medium text-green-600">
                  Completed
                </span>
              )}
              {isActive && (
                <span className="text-sm font-medium text-blue-600 animate-pulse">
                  In Progress
                </span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}