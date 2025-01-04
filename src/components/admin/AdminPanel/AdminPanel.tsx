'use client';

import { useState } from 'react';
import { AdminSettings as AdminSettingsType } from '@/types';
import { ApiSettings } from './ApiSettings';
import { EmailSettings } from './EmailSettings';
import { EmailConnections } from './EmailConnections';

export function AdminPanel() {
  const [settings, setSettings] = useState<AdminSettingsType>({
    openaiApiKey: '',
    anthropicApiKey: '',
    microsoftClientId: '',
    microsoftTenantId: '',
    supabaseConfig: {
      url: '',
      key: '',
      embeddingsTable: ''
    },
    branding: {
      logoUrl: null,
      primaryColor: '',
      secondaryColor: '',
      companyName: '',
      emailSignature: ''
    },
    emailSettings: {
      tone: 'formal',
      language: 'en',
      signature: '',
      replyDelay: 0,
      excludedEmails: [],
      aiRules: {
        enabled: false,
        allowedSenders: [],
        excludedSenders: [],
        keywords: [],
        maxTokensPerEmail: 0,
        monthlyTokenBudget: 0,
        processRules: {
          processAll: false,
          processFromList: false,
          processWithKeywords: false
        }
      },
      tokenUsage: {
        currentMonthTokens: 0,
        monthlyLimit: 0,
        costPerThousandTokens: 0
      },
      models: {},
      defaultModel: ''
    },
  });

  const handleSettingsUpdate = (newSettings: Partial<AdminSettingsType>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#014380] to-[#014584]">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Admin Control Panel</h1>
        
        <div className="space-y-6">
          {/* Email Connections */}
          <EmailConnections />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* API Settings */}
            <ApiSettings 
              settings={settings} 
              onUpdate={handleSettingsUpdate} 
            />
            
            {/* Email Settings */}
            <EmailSettings 
              settings={settings.emailSettings} 
              onUpdate={(partialSettings) => 
                handleSettingsUpdate({ emailSettings: { ...settings.emailSettings, ...partialSettings } })
              } 
            />
          </div>

          <div className="flex justify-end">
            <button className="px-6 py-2 bg-white text-primary rounded-md hover:bg-gray-100 transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}