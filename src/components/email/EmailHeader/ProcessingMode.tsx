'use client';

import { Bot } from 'lucide-react';
import { useEmailStore } from '@/store/emailStore';

export function ProcessingMode() {
  const { settings, updateSettings } = useEmailStore();
  const isAuto = settings.aiRules?.enabled ?? false;

  const handleModeChange = (auto: boolean) => {
    updateSettings({
      aiRules: {
        ...settings.aiRules,
        enabled: auto
      },
      tone: 'formal',
      language: '',
      signature: '',
      replyDelay: 0,
      excludedEmails: [],
      tokenUsage: {
        currentMonthTokens: 0,
        monthlyLimit: 0,
        costPerThousandTokens: 0
      },
      models: {},
      defaultModel: ''
    });
  };

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-md">
      <Bot className="w-4 h-4 text-primary" />
      <select
        value={isAuto ? 'auto' : 'manual'}
        onChange={(e) => handleModeChange(e.target.value === 'auto')}
        className="bg-transparent text-gray-700 border-none text-sm focus:ring-0 cursor-pointer"
      >
        <option value="auto">Auto Process</option>
        <option value="manual">Manual Process</option>
      </select>
    </div>
  );
}