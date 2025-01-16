'use client';

import { useState } from 'react';
import { Shield, Check, Github, ExternalLink, X, Bot, Settings } from 'lucide-react';

interface WelcomeStepProps {
  onComplete: () => void;
}

export function WelcomeStep({ onComplete }: WelcomeStepProps) {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = () => {
    setIsConnecting(true);
    window.location.href = '/api/oauth/microsoft';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3 pb-6 border-b">
        <Bot className="w-8 h-8 text-primary" />
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Welcome to Email Manager</h2>
          <p className="text-gray-600">Connect your email account to get started</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">Key Features</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <Check className="w-4 h-4 text-green-500" />
                <span>AI-powered email management</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <Check className="w-4 h-4 text-green-500" />
                <span>Smart categorization and prioritization</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <Check className="w-4 h-4 text-green-500" />
                <span>Automated response suggestions</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <Check className="w-4 h-4 text-green-500" />
                <span>Customizable workflows</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">Privacy & Security</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="w-4 h-4 text-blue-500" />
                <span>End-to-end encryption</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="w-4 h-4 text-blue-500" />
                <span>No email data storage</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="w-4 h-4 text-blue-500" />
                <span>GDPR compliant</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="w-4 h-4 text-blue-500" />
                <span>SOC 2 certified</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Connect Button */}
        <div className="flex justify-center">
          <button
            onClick={handleConnect}
            disabled={isConnecting}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            {isConnecting ? 'Connecting...' : 'Connect Microsoft Account'}
          </button>
        </div>

        {/* Resources */}
        <div className="flex flex-wrap gap-4 justify-center text-sm">
          <a
            href="https://github.com/yourusername/email-manager"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>
          <a
            href="/docs"
            className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Documentation</span>
          </a>
          <a
            href="/settings"
            className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </a>
        </div>
      </div>
    </div>
  );
} 