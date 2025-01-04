'use client';

import { useState } from 'react';
import { useEmailStore } from '@/store/emailStore';

export function useAICompose() {
  const [isGenerating, setIsGenerating] = useState(false);
  const { settings } = useEmailStore();

  const generateResponse = async (subject: string) => {
    try {
      setIsGenerating(true);
      
      // Simulate AI response generation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // This is where you'd integrate with your AI service
      // For now, returning a mock response
      const tone = settings.tone;
      const signature = settings.signature;
      
      const response = `Dear recipient,

I hope this email finds you well. I am writing regarding ${subject}.

[AI-generated content would go here based on the subject and tone: ${tone}]

Best regards,
${signature}`;

      return response;
    } catch (error) {
      console.error('Error generating AI response:', error);
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generateResponse,
    isGenerating
  };
}