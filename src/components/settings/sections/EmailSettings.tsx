'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';
import { EmailSettings as EmailSettingsType } from '@/types';
import { ConnectEmailModal } from '../modals/ConnectEmailModal';
import { EmailExclusions } from './EmailExclusions';
import { EmailDelaySettings } from './EmailDelaySettings';

interface EmailSettingsProps {
  settings: EmailSettingsType;
  onUpdate: (settings: Partial<EmailSettingsType>) => void;
}

export function EmailSettings({ settings, onUpdate }: EmailSettingsProps) {
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);

  const handleConnect = async (provider: 'google' | 'microsoft') => {
    console.log(`Connecting to ${provider}...`);
    setIsConnectModalOpen(false);
  };

  const handleAddExclusion = (email: string, reason?: string) => {
    const newExclusion = {
      id: crypto.randomUUID(),
      email,
      reason,
      addedAt: new Date(),
      addedBy: settings.userId || 'unknown'
    };

    onUpdate({
      excludedEmails: [...(settings.excludedEmails || []), newExclusion]
    });
  };

  const handleRemoveExclusion = (id: string) => {
    onUpdate({
      excludedEmails: (settings.excludedEmails || []).filter(item => item.id !== id)
    });
  };

  return (
    <div className="space-y-8">
      {/* Email Delay Settings */}
      <EmailDelaySettings 
        settings={settings}
        onUpdate={onUpdate}
      />

      {/* Email Exclusions */}
      <EmailExclusions
        excludedEmails={settings.excludedEmails || []}
        onAdd={handleAddExclusion}
        onRemove={handleRemoveExclusion}
      />

      <ConnectEmailModal 
        isOpen={isConnectModalOpen}
        onClose={() => setIsConnectModalOpen(false)}
        onConnect={handleConnect}
      />
    </div>
  );
}