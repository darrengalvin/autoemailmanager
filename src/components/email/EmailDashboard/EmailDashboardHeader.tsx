'use client';

import { Mail, AlertCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export function EmailDashboardHeader() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="bg-blue-50 p-6 rounded-lg mb-6">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-6 h-6 text-blue-600" />
          <div>
            <h2 className="text-lg font-semibold text-blue-900">Connect Your Email Account</h2>
            <p className="text-blue-700">Connect your email account to start managing your emails with AI assistance.</p>
          </div>
          <button className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Connect Account
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Logged in as:</span>
          <span className="font-medium text-gray-900">{user.email}</span>
        </div>
      </div>
    </div>
  );
}