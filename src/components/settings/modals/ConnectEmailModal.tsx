'use client';

import { useState } from 'react';
import { X, Mail, Loader } from 'lucide-react';
import { MicrosoftIcon } from '@/components/icons/MicrosoftIcon';

interface ConnectEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (provider: 'google' | 'microsoft') => void;
}

export function ConnectEmailModal({ isOpen, onClose, onConnect }: ConnectEmailModalProps) {
  const [connecting, setConnecting] = useState<'microsoft' | 'google' | null>(null);

  const handleConnect = async (provider: 'microsoft' | 'google') => {
    setConnecting(provider);
    try {
      await onConnect(provider);
    } finally {
      setConnecting(null);
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
            onClick={() => handleConnect('microsoft')}
            disabled={!!connecting}
            className="w-full flex items-center gap-3 p-4 bg-[#f3f6fc] hover:bg-[#e9ecf5] rounded-lg group transition-colors"
          >
            <div className="w-12 h-12 bg-[#05a6f0] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              {connecting === 'microsoft' ? (
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
            disabled={!!connecting}
            className="w-full flex items-center gap-3 p-4 bg-[#f8f9fa] hover:bg-[#f1f3f4] rounded-lg group transition-colors"
          >
            <div className="w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              {connecting === 'google' ? (
                <Loader className="w-6 h-6 animate-spin" />
              ) : (
                <Mail className="w-6 h-6 text-gray-600" />
              )}
            </div>
            <div className="text-left">
              <h3 className="font-medium text-gray-900">Google</h3>
              <p className="text-sm text-gray-500">Connect Gmail or Google Workspace account</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}