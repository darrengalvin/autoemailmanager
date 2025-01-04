'use client';

import { EmailSettings as EmailSettingsType } from '@/types';
import { Settings } from 'lucide-react';

interface EmailSettingsProps {
  settings: EmailSettingsType;
  onUpdate: (settings: Partial<EmailSettingsType>) => void;
}

export function EmailSettings({ settings, onUpdate }: EmailSettingsProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold">Email Settings</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Default Tone
          </label>
          <select
            className="w-full rounded-md"
            value={settings.tone}
            onChange={(e) => onUpdate({ tone: e.target.value as any })}
          >
            <option value="formal">Formal</option>
            <option value="casual">Casual</option>
            <option value="friendly">Friendly</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Language
          </label>
          <select
            className="w-full rounded-md"
            value={settings.language}
            onChange={(e) => onUpdate({ language: e.target.value })}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Signature
          </label>
          <textarea
            className="w-full rounded-md"
            rows={3}
            value={settings.signature}
            onChange={(e) => onUpdate({ signature: e.target.value })}
            placeholder="Your email signature..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Reply Delay (minutes)
          </label>
          <input
            type="number"
            className="w-full rounded-md"
            value={settings.replyDelay}
            onChange={(e) => onUpdate({ replyDelay: parseInt(e.target.value) })}
            min={0}
          />
        </div>
      </div>
    </div>
  );
}