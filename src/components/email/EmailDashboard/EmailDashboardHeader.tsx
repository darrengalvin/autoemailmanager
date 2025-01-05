'use client';

import { Mail, AlertCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';
import { WelcomeModal } from '@/components/setup/WelcomeModal';
import { ConnectEmailModal } from '@/components/email/ConnectEmailModal';

export function EmailDashboardHeader() {
  const { user } = useAuth();
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);

  const handleStartSetup = () => {
    setShowWelcomeModal(false);
    setShowConnectModal(true);
  };

  if (!user) {
    return (
      <>
        <div className="bg-blue-50 p-6 rounded-lg mb-6">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-blue-600" />
            <div>
              <h2 className="text-lg font-semibold text-blue-900">Welcome to Smart Email Manager</h2>
              <p className="text-blue-700">Get started with AI-powered email management by connecting your account.</p>
            </div>
            <button
              onClick={() => setShowWelcomeModal(true)}
              className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Get Started
            </button>
          </div>
        </div>

        <WelcomeModal
          isOpen={showWelcomeModal}
          onClose={() => setShowWelcomeModal(false)}
          onStartSetup={handleStartSetup}
        />

        <ConnectEmailModal
          isOpen={showConnectModal}
          onClose={() => setShowConnectModal(false)}
        />
      </>
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