'use client';

import { AdminSettings } from '@/types';

interface GeneralSettingsProps {
  settings: AdminSettings;
  onUpdate: (settings: Partial<AdminSettings>) => void;
}

export function GeneralSettings({ settings, onUpdate }: GeneralSettingsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">General Settings</h2>
        <div className="grid gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Default Language
            </label>
            <select 
              className="w-full rounded-md border-gray-300"
              value={settings.emailSettings.language}
              onChange={(e) => onUpdate({ 
                emailSettings: { 
                  ...settings.emailSettings, 
                  language: e.target.value 
                } 
              })}
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time Zone
            </label>
            <select className="w-full rounded-md border-gray-300">
              <option>UTC</option>
              <option>Eastern Time</option>
              <option>Pacific Time</option>
              <option>Central European Time</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}