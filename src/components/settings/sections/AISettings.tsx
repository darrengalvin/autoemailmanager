'use client';

import { useState } from 'react';
import { Bot } from 'lucide-react';
import { AdminSettings } from '@/types';
import { TokenUsageStats } from './TokenUsageStats';
import { AIRulesSettings } from './AIRulesSettings';
import { AIModelSettings } from './AIModelSettings';

interface AISettingsProps {
  settings: AdminSettings;
  onUpdate: (settings: Partial<AdminSettings>) => void;
}

export function AISettings({ settings, onUpdate }: AISettingsProps) {
  const handleModelUpdate = (models: typeof settings.emailSettings.models, defaultModel?: string) => {
    onUpdate({
      emailSettings: {
        ...settings.emailSettings,
        models,
        ...(defaultModel && { defaultModel })
      }
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2">
        <Bot className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-medium">AI Configuration</h2>
      </div>

      {/* Token Usage Statistics */}
      <TokenUsageStats 
        settings={settings.emailSettings}
        onUpdate={(tokenSettings) => onUpdate({
          emailSettings: {
            ...settings.emailSettings,
            tokenUsage: tokenSettings.tokenUsage || {
              currentMonthTokens: 0,
              monthlyLimit: 100000,
              costPerThousandTokens: 0.02
            }
          }
        })}
      />

      {/* AI Model Settings */}
      <AIModelSettings
        models={settings.emailSettings.models || {}}
        defaultModel={settings.emailSettings.defaultModel || 'anthropic'}
        onUpdate={handleModelUpdate}
      />

      {/* AI Processing Rules */}
      <AIRulesSettings 
        rules={settings.emailSettings.aiRules}
        onUpdate={(rules) => onUpdate({
          emailSettings: {
            ...settings.emailSettings,
            aiRules: { ...settings.emailSettings.aiRules, ...rules }
          }
        })}
      />
    </div>
  );
}