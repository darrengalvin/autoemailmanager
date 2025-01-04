'use client';

import { SetupProvider } from '@/contexts/SetupContext';
import { SetupContent } from './SetupContent';

export function SetupGuide() {
  return (
    <SetupProvider>
      <SetupContent />
    </SetupProvider>
  );
}