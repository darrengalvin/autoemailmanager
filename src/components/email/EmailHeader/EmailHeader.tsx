'use client';

import { Mail } from 'lucide-react';
import { UserProfile } from '@/components/common/UserProfile';
import { ProcessingMode } from './ProcessingMode';
import { useAuth } from '@/hooks/useAuth';
import { ConnectEmailModal } from '../ConnectEmailModal';
import { useState } from 'react';

interface EmailHeaderProps {
  title: string;
  onCompose: () => void;
}

export function EmailHeader({ title, onCompose }: EmailHeaderProps) {
  const { user } = useAuth();
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);

  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
          </div>
          
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <ProcessingMode />
                <button 
                  onClick={onCompose} 
                  className="px-4 py-2 bg-primary text-white hover:bg-primary-dark rounded-md flex items-center gap-2 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Compose
                </button>
                <UserProfile />
              </>
            ) : (
              <button
                onClick={() => setIsConnectModalOpen(true)}
                className="px-4 py-2 bg-primary text-white hover:bg-primary-dark rounded-md"
              >
                Connect Account
              </button>
            )}
          </div>
        </div>
      </div>

      <ConnectEmailModal 
        isOpen={isConnectModalOpen}
        onClose={() => setIsConnectModalOpen(false)}
      />
    </div>
  );
}