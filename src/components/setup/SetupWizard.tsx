import { useState } from 'react';
import { X, ArrowLeft, ArrowRight, Database, Key, Table, Check, HelpCircle, AlertTriangle } from 'lucide-react';

interface SetupWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

const TechnicalWarning = () => (
  <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
    <h4 className="flex items-center gap-2 text-amber-800 font-medium mb-2">
      <AlertTriangle className="w-5 h-5" />
      Technical Experience Required
    </h4>
    <p className="text-amber-700 text-sm">
      These are setup instructions for the open-source version. While it's free to use, you should be comfortable with:
    </p>
    <ul className="mt-2 space-y-1 text-sm text-amber-700">
      <li>• Database management (PostgreSQL)</li>
      <li>• TypeScript/React development</li>
      <li>• SQL and environment configuration</li>
    </ul>
    <p className="mt-3 text-sm text-amber-700">
      If you prefer a hassle-free setup without technical overhead, consider our <span className="font-medium">managed service</span> option.
    </p>
  </div>
);

const steps = [
  {
    id: 'supabase',
    title: 'Supabase Setup',
    description: 'Create a new Supabase project and get your credentials',
    icon: Database,
    content: () => (
      <div className="space-y-4">
        <TechnicalWarning />
        
        <h3 className="text-lg font-medium sticky top-0 bg-white py-2">Setting up Supabase</h3>
        <ol className="list-decimal list-inside space-y-3">
          <li>Go to <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Supabase.com</a> and sign up or log in</li>
          <li>Click "New Project" and fill in the project details</li>
          <li>Choose a region close to your users</li>
          <li>Set a secure database password</li>
          <li>Wait for your project to be created (usually takes about 1 minute)</li>
        </ol>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            💡 Tip: Make sure to save your database password somewhere secure. You'll need it later.
          </p>
        </div>

        {/* Database Tables */}
        <div className="mt-6">
          <h4 className="font-medium text-gray-900 mb-4">Database Tables Setup</h4>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm whitespace-pre-wrap">
              {`-- Create organizations table (for shared Supabase instances)
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create users table (minimal tracking for analytics)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  auth_email TEXT NOT NULL,      -- Microsoft/Google email
  organization_id UUID REFERENCES organizations(id),
  is_org_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create usage_stats table (anonymous usage tracking)
CREATE TABLE usage_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id),
  emails_processed INTEGER DEFAULT 0,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create emails table
CREATE TABLE emails (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  sender TEXT NOT NULL,
  recipients TEXT[] NOT NULL,
  thread_id TEXT,
  status TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create email_settings table
CREATE TABLE email_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id),
  provider TEXT NOT NULL,
  access_token TEXT,
  refresh_token TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  UNIQUE(organization_id, provider)
);`}
            </pre>
          </div>
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">How This Works:</h4>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• Organizations can share a single Supabase instance</li>
            <li>• Multiple users can belong to the same organization</li>
            <li>• Usage tracking is per-organization, not per-user</li>
            <li>• Email data remains private in your Supabase instance</li>
            <li>• We only store minimal user data for analytics and support</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 'microsoft-oauth',
    title: 'Microsoft OAuth Setup',
    description: 'Configure Microsoft authentication for your app',
    icon: Key,
    content: () => {
      const handleManagedSetup = () => {
        // Store current URL for redirect back after OAuth
        localStorage.setItem('setupRedirectUrl', window.location.href);
        
        // Use our API route instead of hardcoded URL
        window.location.href = '/api/oauth/microsoft';
      };

      return (
        <div className="space-y-6">
          <TechnicalWarning />
          
          <div className="grid gap-6 md:grid-cols-2">
            {/* Managed Option */}
            <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <h3 className="text-lg font-medium text-blue-900 mb-2">Managed Setup</h3>
              <p className="text-sm text-blue-700 mb-4">
                Quickest way to get started. We handle the Microsoft OAuth setup for you.
              </p>
              <ul className="space-y-2 text-sm text-blue-600">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  No Azure setup required
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Instant configuration
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  We handle security updates
                </li>
              </ul>
              <button 
                onClick={handleManagedSetup}
                className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Connect with Microsoft
              </button>
            </div>

            {/* Microsoft OAuth Setup */}
            <div className="p-6 bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Microsoft OAuth Setup</h3>
              <p className="text-sm text-gray-600 mb-4">
                Connect your Microsoft account to get started.
              </p>
              <div className="space-y-4">
                <div className="text-sm text-gray-600">
                  <h4 className="font-medium mb-2">Required Steps:</h4>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Click the button below to connect</li>
                    <li>Sign in to your Microsoft account</li>
                    <li>Grant the required permissions</li>
                    <li>Return to complete setup</li>
                  </ol>
                </div>
                <button 
                  onClick={() => window.location.href = '/api/oauth/microsoft'}
                  className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Connect Microsoft Account
                </button>
              </div>
            </div>

            {/* Setup Instructions */}
            <div className="mt-6 border rounded-lg overflow-hidden">
              <div className="p-4 bg-gray-50">
                <h4 className="font-medium text-gray-900">What happens next?</h4>
              </div>
              <div className="p-4">
                <ol className="list-decimal list-inside space-y-3">
                  <li>You'll be redirected to Microsoft to sign in</li>
                  <li>Review and accept the permissions</li>
                  <li>We'll set up your email integration</li>
                  <li>You can start using the AI assistant</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      );
    },
  },
];

export function SetupWizard({ isOpen, onClose }: SetupWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const CurrentStepContent = steps[currentStep].content;
  const Icon = steps[currentStep].icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-3xl mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <Icon className="w-6 h-6 text-blue-600" />
            <div>
              <h2 className="text-xl font-semibold">{steps[currentStep].title}</h2>
              <p className="text-sm text-gray-600">{steps[currentStep].description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[calc(90vh-200px)] overflow-y-auto">
          <CurrentStepContent />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t bg-gray-50">
          <div className="flex items-center gap-2">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`w-2.5 h-2.5 rounded-full ${
                  index === currentStep ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          <div className="flex gap-3">
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>
            )}
            {currentStep < steps.length - 1 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Complete Setup
                <Check className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 