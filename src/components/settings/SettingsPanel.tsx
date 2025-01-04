'use client';

import { useState, useEffect } from 'react';
import { AdminSettings } from '@/types';
import { SettingsHeader } from './SettingsHeader';
import { SettingsSidebar } from './SettingsSidebar';
import { GeneralSettings } from './sections/GeneralSettings';
import { BrandingSettings } from './sections/BrandingSettings';
import { AIModelsTab } from './sections/ai/AIModelsTab';
import { EmailSettings } from './sections/EmailSettings';
import { SecuritySettings } from './sections/SecuritySettings';
import { DatabaseSettings } from './sections/DatabaseSettings';
import { IntegrationsSettings } from './sections/IntegrationsSettings';
import { saveSettings, loadSettings } from '@/utils/settings';

type SettingsSection = 'general' | 'branding' | 'ai-models' | 'email' | 'integrations' | 'security' | 'database';

const defaultSettings: AdminSettings = {
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
      maxTokensPerEmail: 2000,
      monthlyTokenBudget: 100000,
      processRules: {
        processAll: true,
        processFromList: false,
        processWithKeywords: false
      }
    },
    tokenUsage: {
      currentMonthTokens: 0,
      monthlyLimit: 100000,
      costPerThousandTokens: 0.02
    },
    models: {
      anthropic: {
        enabled: true,
        apiKey: '',
        maxTokens: 2000,
        temperature: 0.7,
        prompts: {
          systemPrompt: '',
          additionalInstructions: ''
        }
      }
    },
    defaultModel: 'anthropic'
  },
  microsoftClientId: '',
  microsoftTenantId: '',
  supabaseConfig: {
    url: '',
    key: '',
    embeddingsTable: 'embeddings'
  },
  branding: {
    logoUrl: null,
    primaryColor: '#014380',
    secondaryColor: '#014584',
    companyName: '',
    emailSignature: ''
  },
  openaiApiKey: '',
  anthropicApiKey: ''
};

export function SettingsPanel() {
  const [activeSection, setActiveSection] = useState<SettingsSection>('ai-models');
  const [settings, setSettings] = useState<AdminSettings>(defaultSettings);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadSettings()
      .then(savedSettings => {
        if (savedSettings) {
          setSettings(savedSettings);
        }
      })
      .catch(console.error);
  }, []);

  const handleSettingsUpdate = async (newSettings: Partial<AdminSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    
    setIsSaving(true);
    try {
      await saveSettings(updatedSettings);
    } catch (error) {
      console.error('Failed to save settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SettingsHeader />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <SettingsSidebar 
            activeSection={activeSection} 
            onSectionChange={setActiveSection} 
          />
          
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {isSaving && (
                <div className="mb-4 text-sm text-blue-600">
                  Saving changes...
                </div>
              )}

              {activeSection === 'general' && (
                <GeneralSettings settings={settings} onUpdate={handleSettingsUpdate} />
              )}
              {activeSection === 'branding' && (
                <BrandingSettings config={settings.branding} onUpdate={(branding) => handleSettingsUpdate({ branding })} />
              )}
              {activeSection === 'ai-models' && (
                <AIModelsTab
                  models={settings.emailSettings.models}
                  defaultModel={settings.emailSettings.defaultModel}
                  onUpdate={(models, defaultModel) => handleSettingsUpdate({
                    emailSettings: {
                      ...settings.emailSettings,
                      models,
                      ...(defaultModel && { defaultModel })
                    }
                  })}
                />
              )}
              {activeSection === 'email' && (
                <EmailSettings 
                  settings={settings.emailSettings} 
                  onUpdate={(partialEmailSettings) => handleSettingsUpdate({
                    emailSettings: { ...settings.emailSettings, ...partialEmailSettings }
                  })} 
                />
              )}
              {activeSection === 'integrations' && (
                <IntegrationsSettings />
              )}
              {activeSection === 'security' && (
                <SecuritySettings settings={settings} onUpdate={handleSettingsUpdate} />
              )}
              {activeSection === 'database' && (
                <DatabaseSettings 
                  config={settings.supabaseConfig} 
                  onUpdate={(partialConfig) => handleSettingsUpdate({
                    supabaseConfig: { ...settings.supabaseConfig, ...partialConfig }
                  })} 
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}