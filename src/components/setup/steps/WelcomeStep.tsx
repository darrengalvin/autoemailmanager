'use client';

import { useState } from 'react';
import { Shield, Check, Github, ExternalLink, X, Bot, Settings } from 'lucide-react';
import { managedService } from '@/config/pricing';

interface WelcomeStepProps {
  onComplete: () => void;
}

export function WelcomeStep({ onComplete }: WelcomeStepProps) {
  return (
    <div className="space-y-8">
      {/* Introduction */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Welcome to Smart Email Manager</h2>
        <div className="grid gap-6">
          <div className="bg-white rounded-lg p-6 border">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Smart Email Processing</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-2">
                <Bot className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>AI-powered email management and response generation</span>
              </li>
              <li className="flex items-start gap-2">
                <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Secure and private email processing</span>
              </li>
              <li className="flex items-start gap-2">
                <Settings className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Customizable AI models and processing rules</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Get Started */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Get Started</h2>
        <div className="border rounded-lg p-6 bg-white">
          <div className="mb-4 p-3 bg-green-50 rounded-lg">
            <p className="text-sm text-green-800">
              <Shield className="inline-block w-4 h-4 mr-1" />
              Your data is secure and private
            </p>
          </div>
          <ul className="space-y-3 mb-6 text-gray-600">
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Quick setup with Microsoft OAuth</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Immediate access to AI features</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Step-by-step guided configuration</span>
            </li>
          </ul>

          <button
            onClick={onComplete}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark"
          >
            Continue Setup
          </button>
        </div>
      </section>
    </div>
  );
} 