'use client';

import { AdminSettings } from '@/types';
import { Key, Bot } from 'lucide-react';

interface ApiSettingsProps {
  settings: AdminSettings;
  onUpdate: (settings: Partial<AdminSettings>) => void;
}

export function ApiSettings({ settings, onUpdate }: ApiSettingsProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Key className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold">API Configuration</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            OpenAI API Key
          </label>
          <input
            type="password"
            className="w-full rounded-md"
            value={settings.openaiApiKey}
            onChange={(e) => onUpdate({ openaiApiKey: e.target.value })}
            placeholder="sk-..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Anthropic API Key
          </label>
          <input
            type="password"
            className="w-full rounded-md"
            value={settings.anthropicApiKey}
            onChange={(e) => onUpdate({ anthropicApiKey: e.target.value })}
            placeholder="sk-ant-..."
          />
        </div>
      </div>
    </div>
  );
}