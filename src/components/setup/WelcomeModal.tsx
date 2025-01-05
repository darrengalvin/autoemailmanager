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
                <div className="flex items-center justify-center mb-6">
                  <img 
                    src="https://firebasestorage.googleapis.com/v0/b/yourcaio-649fe.appspot.com/o/DARRENGALVINPROFILE.JPG?alt=media&token=25b0e7d6-3c2e-4798-9b66-a994fa8e9cc3" 
                    alt="Darren Galvin"
                    className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                  />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-3">Welcome to Smart Email Manager</h1>
                <p className="text-gray-600 mb-2">An open-source project by Darren Galvin</p>
                <p className="text-sm text-gray-500">Software Engineer & AI Specialist</p>
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
                  <h2 className="text-xl font-semibold text-gray-900">Setup Options</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Self-Hosted Option */}
                    <div className="border rounded-lg p-6 bg-white">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-medium">Self-Hosted</h3>
                        <div className="text-right">
                          <div className="text-lg font-bold">FREE</div>
                          <div className="text-sm text-gray-600">(small hosting fee, typically £6-£8/month)</div>
                        </div>
                      </div>
                      <div className="mb-4 p-3 bg-green-50 rounded-lg">
                        <p className="text-sm text-green-800">
                          <Shield className="inline-block w-4 h-4 mr-1" />
                          Your data stays on your infrastructure. We never see your emails.
                        </p>
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

                      {/* AI Usage Information */}
                      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">AI Usage & Credits</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li>• ~500 emails/month: £15-20 in AI credits</li>
                          <li>• ~1000 emails/month: £25-30 in AI credits</li>
                          <li>• Choice of models (GPT-3.5, GPT-4, Claude)</li>
                          <li>• Pay only for what you use</li>
                          <li>• Optimize costs with model selection</li>
                        </ul>
                      </div>

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
                            I understand this is self-hosted and I'm responsible for infrastructure and AI usage costs.
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

                    {/* Managed Option */}
                    <div className="border rounded-lg p-6 bg-white">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-medium">Managed Setup</h3>
                        <div className="text-right">
                          <div className="text-lg font-bold">£499</div>
                          <div className="text-sm text-gray-600">+ £49/month support</div>
                        </div>
                      </div>
                      <div className="mb-4 p-3 bg-green-50 rounded-lg">
                        <p className="text-sm text-green-800">
                          <Shield className="inline-block w-4 h-4 mr-1" />
                          Same privacy: Your data stays on your infrastructure. We only help with setup and maintenance.
                        </p>
                      </div>
                      <ul className="space-y-3 mb-6 text-gray-600">
                        <li className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>Professional installation on your infrastructure</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>Infrastructure maintenance & monitoring</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>Regular updates & security patches</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>Custom integration assistance</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>Priority feature upgrades</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>Ready within 14 working days</span>
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

                {/* Comparison Table */}
                <section className="space-y-4 mt-8">
                  <h2 className="text-xl font-semibold text-gray-900">Detailed Comparison</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="text-left p-4 border">Feature</th>
                          <th className="text-left p-4 border">Self-Hosted</th>
                          <th className="text-left p-4 border">Managed Setup</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-4 border">Initial Cost</td>
                          <td className="p-4 border">Free</td>
                          <td className="p-4 border">£499</td>
                        </tr>
                        <tr>
                          <td className="p-4 border">Monthly Cost</td>
                          <td className="p-4 border">~£10 (hosting only)</td>
                          <td className="p-4 border">£49 + hosting costs</td>
                        </tr>
                        <tr>
                          <td className="p-4 border">Setup Time</td>
                          <td className="p-4 border">1-2 hours</td>
                          <td className="p-4 border">Ready in 14 days</td>
                        </tr>
                        <tr>
                          <td className="p-4 border">Technical Expertise Required</td>
                          <td className="p-4 border">Basic database knowledge</td>
                          <td className="p-4 border">No technical knowledge needed</td>
                        </tr>
                        <tr>
                          <td className="p-4 border">Infrastructure Control</td>
                          <td className="p-4 border">Complete control</td>
                          <td className="p-4 border">Complete control with guidance</td>
                        </tr>
                        <tr>
                          <td className="p-4 border">Support</td>
                          <td className="p-4 border">Community support</td>
                          <td className="p-4 border">Priority technical support</td>
                        </tr>
                        <tr>
                          <td className="p-4 border">Updates & Maintenance</td>
                          <td className="p-4 border">Self-managed</td>
                          <td className="p-4 border">Fully managed</td>
                        </tr>
                        <tr>
                          <td className="p-4 border">Data Privacy</td>
                          <td className="p-4 border font-medium text-green-600">100% Private</td>
                          <td className="p-4 border font-medium text-green-600">100% Private</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* FAQ Section */}
                <section className="space-y-4 mt-8">
                  <h2 className="text-xl font-semibold text-gray-900">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-2">Can you access my emails?</h3>
                      <p className="text-gray-600">
                        No, absolutely not. The software runs entirely on your infrastructure. We have no access to your data or emails. 
                        Even with the managed setup, we only help with infrastructure maintenance - we never see your email content.
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-2">What infrastructure costs should I expect?</h3>
                      <p className="text-gray-600">
                        For most users, a basic database setup costs around £10/month. This includes database hosting and storage. 
                        Costs may vary based on email volume and storage needs. We'll help you choose the most cost-effective setup for your needs.
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-2">How does the AI learn my writing style?</h3>
                      <p className="text-gray-600">
                        You can upload examples of your previous emails or writing. The AI analyzes these to understand your tone, 
                        vocabulary, and writing patterns. It continuously improves as you use the system and provide feedback on its responses.
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-2">What happens if I need to cancel?</h3>
                      <p className="text-gray-600">
                        Since you own the infrastructure and data, you can export everything at any time. For managed setups, 
                        we'll help you transition to self-hosting or provide instructions for shutting down the infrastructure properly.
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

                {/* Reseller Program */}
                <section className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900">Reseller Program</h2>
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100">
                    <p className="text-gray-700 mb-6">
                      Help more businesses take advantage of our AI Email Manager—and earn commissions while you do it. 
                      Our Tiered Reseller Program is designed to reward you based on your level of commitment and success.
                    </p>

                    {/* How It Works */}
                    <div className="mb-8">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">How It Works</h3>
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <h4 className="font-medium text-gray-900 mb-2">1. Refer Clients</h4>
                          <p className="text-sm text-gray-600">
                            Introduce clients to Smart Email Manager and earn commissions on both setup fees and monthly subscriptions.
                          </p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <h4 className="font-medium text-gray-900 mb-2">2. Provide Support</h4>
                          <p className="text-sm text-gray-600">
                            Optionally offer first-line support or training to build trust and move up tiers.
                          </p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <h4 className="font-medium text-gray-900 mb-2">3. Earn More</h4>
                          <p className="text-sm text-gray-600">
                            The more clients you refer and support, the higher your tier and commissions.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Tiers */}
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium text-gray-900">Commission Tiers</h3>
                      <div className="grid md:grid-cols-3 gap-6">
                        {/* Silver */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border">
                          <div className="text-center mb-4">
                            <h4 className="text-xl font-semibold text-gray-900">Silver</h4>
                            <p className="text-sm text-gray-500">1-4 referrals</p>
                          </div>
                          <ul className="space-y-2 text-sm text-gray-600">
                            <li>• Setup Fee: 20-25% of £499</li>
                            <li>• Monthly: 15-20% of £49</li>
                          </ul>
                        </div>
                        {/* Gold */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-yellow-200">
                          <div className="text-center mb-4">
                            <h4 className="text-xl font-semibold text-gray-900">Gold</h4>
                            <p className="text-sm text-gray-500">5-9 referrals</p>
                          </div>
                          <ul className="space-y-2 text-sm text-gray-600">
                            <li>• Setup Fee: 25-30% of £499</li>
                            <li>• Monthly: 20-25% of £49</li>
                          </ul>
                        </div>
                        {/* Platinum */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-200">
                          <div className="text-center mb-4">
                            <h4 className="text-xl font-semibold text-gray-900">Platinum</h4>
                            <p className="text-sm text-gray-500">10+ referrals</p>
                          </div>
                          <ul className="space-y-2 text-sm text-gray-600">
                            <li>• Setup Fee: 35-40% of £499</li>
                            <li>• Monthly: 25-30% of £49</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="mt-8">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Benefits of Joining</h3>
                      <ul className="grid md:grid-cols-2 gap-4">
                        <li className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600">Ongoing revenue from monthly subscriptions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600">Dedicated support & marketing materials</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600">Flexible involvement levels</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600">Official partner endorsement</span>
                        </li>
                      </ul>
                    </div>

                    {/* CTA */}
                    <div className="mt-8 text-center">
                      <a
                        href="mailto:contact@darrengalvin.com?subject=Smart Email Manager - Reseller Program"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Join the Reseller Program
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
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