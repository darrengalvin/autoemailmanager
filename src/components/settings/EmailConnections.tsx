'use client';

import { useState } from 'react';
import { Mail, AlertCircle, Check, Loader2 } from 'lucide-react';
import { MicrosoftIcon } from '@/components/icons/MicrosoftIcon';

interface ConnectionStatus {
  microsoft: boolean;
  google: boolean;
}

export function EmailConnections() {
  const [connecting, setConnecting] = useState<'microsoft' | 'google' | null>(null);
  const [connected, setConnected] = useState<ConnectionStatus>({
    microsoft: false,
    google: false
  });

  const handleConnect = async (provider: 'microsoft' | 'google') => {
    setConnecting(provider);
    // Simulate connection process
    await new Promise(resolve => setTimeout(resolve, 1500));
    setConnected(prev => ({ ...prev, [provider]: true }));
    setConnecting(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-900">Email Account Connections</h2>
        <p className="mt-1 text-sm text-gray-500">Connect your email accounts to enable AI-powered email management</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Microsoft Account */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <MicrosoftIcon className="w-8 h-8 text-blue-600" />
              <div>
                <h3 className="font-medium text-gray-900">Microsoft Account</h3>
                <p className="text-sm text-gray-500">Connect your Outlook or Office 365 account</p>
              </div>
            </div>
            <button
              onClick={() => handleConnect('microsoft')}
              disabled={connecting === 'microsoft' || connected.microsoft}
              className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                connected.microsoft
                  ? 'bg-green-50 text-green-600'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {connecting === 'microsoft' ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Connecting...</>
              ) : connected.microsoft ? (
                <><Check className="w-4 h-4" /> Connected</>
              ) : (
                'Connect'
              )}
            </button>
          </div>
        </div>

        {/* Google Account */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Mail className="w-8 h-8 text-red-500" />
              <div>
                <h3 className="font-medium text-gray-900">Google Account</h3>
                <p className="text-sm text-gray-500">Connect your Gmail account</p>
              </div>
            </div>
            <button
              onClick={() => handleConnect('google')}
              disabled={connecting === 'google' || connected.google}
              className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                connected.google
                  ? 'bg-green-50 text-green-600'
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              {connecting === 'google' ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Connecting...</>
              ) : connected.google ? (
                <><Check className="w-4 h-4" /> Connected</>
              ) : (
                'Connect'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}