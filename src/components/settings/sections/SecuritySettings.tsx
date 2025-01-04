'use client';

import { Shield, Key } from 'lucide-react';
import { AdminSettings } from '@/types';

interface SecuritySettingsProps {
  settings: AdminSettings;
  onUpdate: (settings: Partial<AdminSettings>) => void;
}

export function SecuritySettings({ settings, onUpdate }: SecuritySettingsProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">Security Settings</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Two-Factor Authentication
            </label>
            <div className="mt-2 flex items-center gap-4">
              <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark">
                Enable 2FA
              </button>
              <span className="text-sm text-gray-500">
                Protect your account with an additional layer of security
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Session Management
            </label>
            <div className="mt-2">
              <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                Sign out of all other sessions
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              API Access
            </label>
            <div className="mt-2">
              <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm">
                Generate New API Key
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">Access Logs</h2>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="space-y-3">
            {[
              { event: 'Login from new device', time: '2 hours ago', location: 'London, UK' },
              { event: 'Password changed', time: '3 days ago', location: 'Paris, FR' },
              { event: 'API key generated', time: '1 week ago', location: 'New York, US' },
            ].map((log, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-gray-900">{log.event}</p>
                  <p className="text-xs text-gray-500">{log.location}</p>
                </div>
                <span className="text-xs text-gray-400">{log.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}