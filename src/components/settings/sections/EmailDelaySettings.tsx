'use client';

import { Clock, HelpCircle } from 'lucide-react';
import { EmailSettings } from '@/types';

interface EmailDelaySettingsProps {
  settings: EmailSettings;
  onUpdate: (settings: Partial<EmailSettings>) => void;
}

export function EmailDelaySettings({ settings, onUpdate }: EmailDelaySettingsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-medium">Email Delay Settings</h3>
        </div>
        <button
          className="text-gray-500 hover:text-gray-700"
          title="Learn more about email delay"
        >
          <HelpCircle className="w-5 h-5" />
        </button>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-blue-900 mb-2">What is Email Delay?</h4>
        <p className="text-sm text-blue-700">
          Email delay adds a buffer time between AI processing and sending emails. This gives you time to review and modify AI-generated responses before they're sent. It's particularly useful for:
        </p>
        <ul className="mt-2 space-y-1 text-sm text-blue-700 list-disc list-inside">
          <li>Ensuring accuracy of AI responses</li>
          <li>Making last-minute adjustments</li>
          <li>Preventing accidental sends</li>
          <li>Maintaining quality control</li>
        </ul>
      </div>

      <div className="grid gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Delay Duration (minutes)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={0}
              max={1440}
              value={settings.replyDelay}
              onChange={(e) => onUpdate({ replyDelay: parseInt(e.target.value) })}
              className="w-24 rounded-md"
            />
            <span className="text-sm text-gray-500">minutes</span>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Set to 0 for immediate sending
          </p>
        </div>

        <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg">
          <div className="p-2 bg-yellow-100 rounded-full">
            <Clock className="w-4 h-4 text-yellow-700" />
          </div>
          <p className="text-sm text-yellow-700">
            Current delay: {settings.replyDelay === 0 ? 'No delay' : `${settings.replyDelay} minutes`}
          </p>
        </div>
      </div>
    </div>
  );
}