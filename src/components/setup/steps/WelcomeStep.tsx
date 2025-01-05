'use client';

import { useState } from 'react';
import { Shield, Check, Github, ExternalLink, X } from 'lucide-react';

interface WelcomeStepProps {
  onComplete: () => void;
}

export function WelcomeStep({ onComplete }: WelcomeStepProps) {
  const [hasAccepted, setHasAccepted] = useState(false);
  const [showAcceptError, setShowAcceptError] = useState(false);

  const handleContinue = () => {
    if (!hasAccepted) {
      setShowAcceptError(true);
      return;
    }
    onComplete();
  };

  return (
    <div className="space-y-8">
      {/* Security First Message */}
      <section className="bg-green-50 p-6 rounded-lg border border-green-100">
        <div className="flex items-start gap-3">
          <Shield className="w-8 h-8 text-green-600 flex-shrink-0" />
          <div>
            <h2 className="text-lg font-semibold text-green-900 mb-2">100% Private & Secure</h2>
            <p className="text-green-800">
              Unlike traditional SaaS solutions, we never store your data on our servers. Everything runs on your own infrastructure, 
              giving you complete control and ownership. Your emails, data, and AI configurations remain exclusively in your Supabase instance.
            </p>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">About This Project</h2>
        <div className="space-y-4">
          <p className="text-gray-600">
            Smart Email Manager is your AI email assistant that actually writes responses in your tone of voice. 
            Upload examples of your writing style, and the AI learns to communicate exactly like you would - but you 
            always remain in control with an approval system for every response.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-2">How It Works:</h3>
            <ul className="space-y-3 text-blue-800">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium">Works While You Sleep</span>
                  <p className="text-sm mt-0.5">Drafts responses 24/7, ensuring no email goes unanswered during off-hours</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium">Perfect Tone Matching</span>
                  <p className="text-sm mt-0.5">AI learns your writing style and maintains consistent communication</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium">Smart Prioritization</span>
                  <p className="text-sm mt-0.5">Automatically identifies urgent emails and suggests priority responses</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium">You're Always in Control</span>
                  <p className="text-sm mt-0.5">Review and approve every response before it's sent</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium">Continuous Learning</span>
                  <p className="text-sm mt-0.5">AI improves from your edits and feedback over time</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium">Context-Aware Responses</span>
                  <p className="text-sm mt-0.5">Understands email threads and conversation history for better replies</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Self-Hosted Setup */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Get Started</h2>
        <div className="border rounded-lg p-6 bg-white">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-medium">Self-Hosted Setup</h3>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">FREE</span>
          </div>
          <ul className="space-y-3 mb-6 text-gray-600">
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Complete control over your infrastructure</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>DIY setup with step-by-step guidance</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Requires basic knowledge of database management</span>
            </li>
          </ul>

          {/* Agreement Section */}
          <div className="border-t pt-4 mb-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={hasAccepted}
                onChange={(e) => {
                  setHasAccepted(e.target.checked);
                  if (e.target.checked) setShowAcceptError(false);
                }}
                className="mt-1"
              />
              <span className="text-gray-600 text-sm">
                I understand this is self-hosted and I'm responsible for infrastructure costs.
              </span>
            </label>
            
            {showAcceptError && (
              <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
                <X className="w-4 h-4" />
                <span>Please accept before continuing</span>
              </div>
            )}
          </div>

          <button
            onClick={handleContinue}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark"
          >
            Begin Setup
          </button>
        </div>
      </section>

      {/* Resources */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Resources</h2>
        <div className="flex gap-4">
          <a
            href="https://github.com/darrengalvin/email-manager"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
          >
            <Github className="w-5 h-5" />
            View Source Code
          </a>
          <a
            href="https://github.com/darrengalvin/email-manager/wiki"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <ExternalLink className="w-5 h-5" />
            Documentation
          </a>
        </div>
      </section>

      {/* Need Help? */}
      <section className="text-center pt-8 border-t">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Need Professional Setup?</h3>
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg border p-6 mb-4">
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-lg font-medium">Managed Setup</h4>
              <div className="text-right">
                <div className="text-lg font-bold">£1,499</div>
                <div className="text-sm text-gray-600">+ £25/month support</div>
              </div>
            </div>
            <ul className="space-y-3 text-left mb-6">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">Professional installation & configuration</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">Ongoing technical support</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">Custom integration assistance</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">Ready within 14 working days</span>
              </li>
            </ul>
            <a
              href="mailto:contact@darrengalvin.com?subject=Smart Email Manager - Managed Setup"
              className="block w-full text-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
            >
              Contact for Managed Setup
            </a>
          </div>
        </div>
      </section>
    </div>
  );
} 