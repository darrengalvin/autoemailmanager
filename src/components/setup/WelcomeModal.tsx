import { useState } from 'react';
import { X, Shield, Check, Github, ExternalLink } from 'lucide-react';
import { SetupWizard } from './SetupWizard';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartSetup: () => void;
}

export function WelcomeModal({ isOpen, onClose, onStartSetup }: WelcomeModalProps) {
  const [hasAccepted, setHasAccepted] = useState(false);
  const [showAcceptError, setShowAcceptError] = useState(false);
  const [showSetupWizard, setShowSetupWizard] = useState(false);

  const handleContinue = () => {
    if (!hasAccepted) {
      setShowAcceptError(true);
      return;
    }
    setShowSetupWizard(true);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop with blur only on the edges */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        {/* Modal content with solid background */}
        <div className="relative w-full max-h-[90vh] overflow-y-auto">
          <div className="relative max-w-4xl mx-auto bg-white rounded-xl shadow-xl">
            {/* Close button */}
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="px-8 py-12">
              {/* Header */}
              <div className="text-center pb-6 border-b">
                <div className="flex justify-center mb-6">
                  <img
                    src="/logo.png"
                    alt="Smart Email Manager"
                    className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                  />
                </div>
                <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">
                  Welcome to Smart Email Manager
                </h2>
                <p className="text-gray-600 mb-2 text-center">A powerful AI email assistant</p>
              </div>

              {/* Main Content */}
              <div className="mt-8 space-y-8">
                {/* Security First Message */}
                <section className="bg-green-50 p-6 rounded-lg border border-green-100">
                  <div className="flex items-start gap-3">
                    <Shield className="w-8 h-8 text-green-600 flex-shrink-0" />
                    <div>
                      <h2 className="text-lg font-semibold text-green-900 mb-2">100% Private & Secure</h2>
                      <p className="text-green-800">
                        Unlike traditional SaaS solutions, we never store your data on our servers. Everything runs on your own secure database 
                        and infrastructure that you control. Your emails and data remain exclusively in your possession, hosted wherever you choose. 
                        We provide the software, you own the data.
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

                {/* Setup Options */}
                <section className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900">Get Started</h2>
                  <div className="border rounded-lg p-6 bg-white">
                    <div className="mb-4 p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-800">
                        <Shield className="inline-block w-4 h-4 mr-1" />
                        Your data stays secure. We prioritize your privacy and security.
                      </p>
                    </div>
                    <ul className="space-y-3 mb-6 text-gray-600">
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Step-by-step guided setup</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Quick and easy configuration</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Secure Microsoft OAuth integration</span>
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
                          I understand and agree to the terms of service and privacy policy.
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
                      Get Started
                    </button>
                  </div>
                </section>

                {/* FAQ Section */}
                <section className="space-y-4 mt-8">
                  <h2 className="text-xl font-semibold text-gray-900">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-2">How secure is my data?</h3>
                      <p className="text-gray-600">
                        We take security seriously. Your data is encrypted and securely stored. We use industry-standard 
                        security practices and OAuth 2.0 for authentication.
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-2">What email providers are supported?</h3>
                      <p className="text-gray-600">
                        We currently support Microsoft 365 and Outlook accounts. Support for additional email providers 
                        is coming soon.
                      </p>
                    </div>
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
              </div>
            </div>
          </div>
        </div>
      </div>

      <SetupWizard 
        isOpen={showSetupWizard}
        onClose={() => {
          setShowSetupWizard(false);
          onClose();
        }}
      />
    </>
  );
} 