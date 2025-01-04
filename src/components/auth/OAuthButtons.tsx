'use client';

import { useState } from 'react';
import { Mail, Loader } from 'lucide-react';
import { MicrosoftIcon } from '@/components/icons/MicrosoftIcon';
import { signInWithMicrosoft } from '@/utils/auth';

export function OAuthButtons() {
  const [isLoading, setIsLoading] = useState<'microsoft' | 'google' | null>(null);

  const handleMicrosoftLogin = async () => {
    try {
      setIsLoading('microsoft');
      await signInWithMicrosoft();
    } catch (error) {
      console.error('Microsoft login error:', error);
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="space-y-3">
      <button
        onClick={handleMicrosoftLogin}
        disabled={!!isLoading}
        className="w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-[#2F2F2F] text-white rounded-lg hover:bg-[#1F1F1F] transition-colors disabled:opacity-50"
      >
        {isLoading === 'microsoft' ? (
          <Loader className="w-5 h-5 animate-spin" />
        ) : (
          <MicrosoftIcon className="w-5 h-5" />
        )}
        Continue with Microsoft
      </button>

      <button
        disabled
        className="w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-gray-100 text-gray-400 rounded-lg cursor-not-allowed"
      >
        <Mail className="w-5 h-5" />
        Continue with Google (Coming Soon)
      </button>

      <p className="text-xs text-center text-gray-500 mt-4">
        By continuing, you agree to grant access to your emails for AI processing
      </p>
    </div>
  );
}