'use client';

import { useState } from 'react';
import { X, Mail, Loader } from 'lucide-react';
import { MicrosoftIcon } from '@/components/icons/MicrosoftIcon';
import { createClient } from '@/utils/supabase/client';

interface ConnectEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConnectEmailModal({ isOpen, onClose }: ConnectEmailModalProps) {
  const [isConnecting, setIsConnecting] = useState<'microsoft' | 'google' | null>(null);
  const supabase = createClient();

  const handleConnect = async (provider: 'azure' | 'google') => {
    try {
      setIsConnecting(provider === 'azure' ? 'microsoft' : 'google');
      await supabase.auth.signInWithOAuth({
        provider,
        options: {
          scopes: provider === 'azure' ? 
            'Mail.Read Mail.Send' :
            'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send',
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
    } catch (error) {
      console.error('Connection error:', error);
    } finally {
      setIsConnecting(null);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Connect Email Account</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => handleConnect('azure')}
            disabled={!!isConnecting}
            className="w-full flex items-center gap-3 p-4 bg-[#f3f6fc] hover:bg-[#e9ecf5] rounded-lg group transition-colors"
          >
            <div className="w-12 h-12 bg-[#05a6f0] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              {isConnecting === 'microsoft' ? (
                <Loader className="w-6 h-6 text-white animate-spin" />
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
            onClick={() => handleConnect('google')}
            disabled={!!isConnecting}
            className="w-full flex items-center gap-3 p-4 bg-[#f8f9fa] hover:bg-[#f1f3f4] rounded-lg group transition-colors"
          >
            <div className="w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              {isConnecting === 'google' ? (
                <Loader className="w-6 h-6 animate-spin" />
              ) : (
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              )}
            </div>
            <div className="text-left">
              <h3 className="font-medium text-gray-900">Google</h3>
              <p className="text-sm text-gray-500">Connect Gmail or Google Workspace account</p>
            </div>
          </button>
        </div>

        <p className="mt-6 text-xs text-gray-500 text-center">
          By connecting an account, you agree to grant access to your emails for AI processing
        </p>
      </div>
    </div>
  );
}