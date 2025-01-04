'use client';

import { Settings } from 'lucide-react';

export function SettingsHeader() {
  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          <Settings className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        </div>
      </div>
    </div>
  );
}