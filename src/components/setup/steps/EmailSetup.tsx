'use client';

import { useState } from 'react';
import { Mail, Shield, Bot, Lock, Loader2 } from 'lucide-react';
import { MicrosoftIcon } from '@/components/icons/MicrosoftIcon';
import { signInWithMicrosoft } from '@/utils/auth';

interface EmailSetupProps {
  onComplete: () => void;
}

export function EmailSetup({ onComplete }: EmailSetupProps) {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleMicrosoftConnect = async () => {
    try {
      setIsConnecting(true);
      await signInWithMicrosoft();
      onComplete();
    } catch (error) {
      console.error('Failed to connect Microsoft account:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 pb-6 border-b">
        <Mail className="w-8 h-8 text-primary" />
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Connect Your Email</h2>
          <p className="text-gray-600">Choose your email provider to get started</p>
        </div>
      </div>

      <div className="grid gap-8">
        {/* Security Info */}
        <div className="bg-green-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-green-900 mb-4">Your Data Privacy & Security</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-green-600 mt-1" />
              <div>
                <p className="font-medium text-green-900">Secure Connection</p>
                <p className="text-green-700">We only request necessary permissions to manage your emails</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Bot className="w-5 h-5 text-green-600 mt-1" />
              <div>
                <p className="font-medium text-green-900">AI Assistant</p>
                <p className="text-green-700">Our AI will help manage your emails but you maintain full control</p>
              </div>
            </div>
          </div>
        </div>

        {/* Provider Options */}
        <div className="grid gap-4">
          <button
            onClick={handleMicrosoftConnect}
            disabled={isConnecting}
            className="flex items-center gap-4 p-4 bg-[#f3f6fc] hover:bg-[#e9ecf5] rounded-lg group transition-colors"
          >
            <div className="w-12 h-12 bg-[#05a6f0] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              {isConnecting ? (
                <Loader2 className="w-6 h-6 text-white animate-spin" />
              ) : (
                <MicrosoftIcon className="w-6 h-6 text-white" />
              )}
            </div>
            <div className="text-left">
              <h3 className="font-medium text-gray-900">Microsoft 365</h3>
              <p className="text-sm text-gray-500">Connect Outlook or Office 365 account</p>
            </div>
          </button>

          <button
            disabled
            className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg opacity-50 cursor-not-allowed"
          >
            <div className="w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
              <Mail className="w-6 h-6 text-gray-400" />
            </div>
            <div className="text-left">
              <h3 className="font-medium text-gray-900">Gmail</h3>
              <p className="text-sm text-gray-500">Coming soon</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}