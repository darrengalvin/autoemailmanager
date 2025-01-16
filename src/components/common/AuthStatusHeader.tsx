'use client';

import { AlertCircle, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useEmailStore } from '@/store/emailStore';
import { useState } from 'react';
import { WelcomeModal } from '@/components/setup/WelcomeModal';
import { ConnectEmailModal } from '@/components/email/ConnectEmailModal';

export function AuthStatusHeader() {
  const { user, signOut } = useAuth();
  const { settings } = useEmailStore();
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const logo = settings.branding?.logoUrl;

  const handleStartSetup = () => {
    setShowWelcomeModal(false);
    setShowConnectModal(true);
  };

  return (
    <>
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Logo */}
              <div className="flex items-center gap-3">
                {logo ? (
                  <img 
                    src={logo} 
                    alt="Logo" 
                    className="h-8 w-8 object-cover rounded-full"
                    crossOrigin="anonymous"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">SE</span>
                  </div>
                )}
                <span className="font-semibold text-gray-900">Smart Email Manager</span>
              </div>

              {/* Status Badge */}
              {!user && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-md text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>Demo Mode</span>
                </div>
              )}
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <div className="text-sm text-gray-600">
                    Signed in as <span className="font-medium text-gray-900">{user.email}</span>
                  </div>
                  <button 
                    onClick={signOut}
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors text-sm"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowWelcomeModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors text-sm"
                >
                  <LogIn className="w-4 h-4" />
                  Get Started
                </button>
              )}
            </div>
          </div>
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