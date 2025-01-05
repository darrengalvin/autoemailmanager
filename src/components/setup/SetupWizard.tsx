import { useState } from 'react';
import { X, ArrowLeft, ArrowRight, Database, Key, Table, Check, HelpCircle } from 'lucide-react';

interface SetupWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

const steps = [
  {
    id: 'supabase',
    title: 'Supabase Setup',
    description: 'Create a new Supabase project and get your credentials',
    icon: Database,
    content: () => (
      <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
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

        <h3 className="text-lg font-medium mt-8 sticky top-0 bg-white py-2">Database Schema</h3>
        <p>Run the following SQL commands in your Supabase SQL editor:</p>
        <pre className="p-4 bg-gray-800 text-white rounded-lg overflow-x-auto text-sm">
          {`-- Create organizations table (for shared Supabase instances)
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  supabase_url TEXT NOT NULL,          -- Their Supabase instance URL
  supabase_anon_key TEXT NOT NULL,     -- Their public anon key
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create users table (minimal tracking for analytics)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  oauth_id TEXT NOT NULL UNIQUE,        -- Microsoft/Google unique ID
  oauth_email TEXT NOT NULL,            -- Microsoft/Google email
  oauth_provider TEXT NOT NULL,         -- 'microsoft' or 'google'
  organization_id UUID REFERENCES organizations(id),
  is_org_admin BOOLEAN DEFAULT false,
  deployment_type TEXT NOT NULL,        -- 'self_hosted' or 'managed'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create usage_stats table (anonymous usage tracking)
CREATE TABLE usage_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id),
  emails_processed INTEGER DEFAULT 0,
  gpt3_tokens_used INTEGER DEFAULT 0,
  gpt4_tokens_used INTEGER DEFAULT 0,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  UNIQUE(organization_id, date)
);

-- Create emails table
CREATE TABLE emails (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subject TEXT NOT NULL,
  body TEXT,
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
  user_id UUID REFERENCES users(id),
  organization_id UUID REFERENCES organizations(id),
  provider TEXT NOT NULL,
  email TEXT NOT NULL,
  access_token TEXT,
  refresh_token TEXT,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  UNIQUE(user_id, provider)
);`}
        </pre>

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
    id: 'credentials',
    title: 'Project Credentials',
    description: 'Configure your environment variables',
    icon: Key,
    content: () => (
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Project Credentials</h3>
        <ol className="list-decimal list-inside space-y-3">
          <li>In your Supabase project dashboard, go to Project Settings</li>
          <li>Find the "API" section in the sidebar</li>
          <li>Copy your project URL and anon/public API key</li>
          <li>Create a .env.local file in your project root</li>
          <li>Add the following environment variables:
            <pre className="mt-2 p-4 bg-gray-800 text-white rounded-lg overflow-x-auto">
              {`NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key`}
            </pre>
          </li>
        </ol>
      </div>
    ),
  },
  {
    id: 'tables',
    title: 'Database Tables',
    description: 'Set up your database schema',
    icon: Table,
    content: () => (
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Database Setup</h3>
        <p>Run the following SQL commands in your Supabase SQL editor:</p>
        <pre className="p-4 bg-gray-800 text-white rounded-lg overflow-x-auto text-sm">
          {`-- Create organizations table (for shared Supabase instances)
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  supabase_url TEXT NOT NULL,          -- Their Supabase instance URL
  supabase_anon_key TEXT NOT NULL,     -- Their public anon key
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create users table (minimal tracking for analytics)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  oauth_id TEXT NOT NULL UNIQUE,        -- Microsoft/Google unique ID
  oauth_email TEXT NOT NULL,            -- Microsoft/Google email
  oauth_provider TEXT NOT NULL,         -- 'microsoft' or 'google'
  organization_id UUID REFERENCES organizations(id),
  is_org_admin BOOLEAN DEFAULT false,
  deployment_type TEXT NOT NULL,        -- 'self_hosted' or 'managed'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create usage_stats table (anonymous usage tracking)
CREATE TABLE usage_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id),
  emails_processed INTEGER DEFAULT 0,
  gpt3_tokens_used INTEGER DEFAULT 0,
  gpt4_tokens_used INTEGER DEFAULT 0,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  UNIQUE(organization_id, date)
);

-- Create emails table
CREATE TABLE emails (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subject TEXT NOT NULL,
  body TEXT,
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
  user_id UUID REFERENCES users(id),
  organization_id UUID REFERENCES organizations(id),
  provider TEXT NOT NULL,
  email TEXT NOT NULL,
  access_token TEXT,
  refresh_token TEXT,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  UNIQUE(user_id, provider)
);`}
        </pre>

        {/* Running Costs Section */}
        <div className="mt-6 space-y-4">
          <h4 className="font-medium text-gray-900">Understanding Running Costs</h4>
          
          <div className="bg-white border rounded-lg divide-y">
            {/* Infrastructure Costs */}
            <div className="p-4">
              <h5 className="font-medium text-gray-900 mb-2">Infrastructure Costs</h5>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Database hosting: £6-8/month (Supabase Pro plan)</li>
                <li>• Storage: Included up to 8GB (sufficient for ~100k emails)</li>
                <li>• No additional server costs (serverless architecture)</li>
              </ul>
            </div>

            {/* Token Usage */}
            <div className="p-4">
              <h5 className="font-medium text-gray-900 mb-2">AI Token Usage</h5>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Costs are based on tokens used. A token is roughly 4 characters or 3/4 of a word.
                  Average email response (200 words) uses about 400-500 tokens.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h6 className="font-medium text-gray-900 mb-1">GPT-3.5-Turbo</h6>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• £0.002 per email response</li>
                      <li>• Best for routine emails</li>
                      <li>• 500 emails ≈ £1</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h6 className="font-medium text-gray-900 mb-1">GPT-4</h6>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• £0.04 per email response</li>
                      <li>• Best for complex emails</li>
                      <li>• 500 emails ≈ £20</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Monthly Estimates */}
            <div className="p-4">
              <h5 className="font-medium text-gray-900 mb-2">Typical Monthly Scenarios</h5>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
                  <div>
                    <span className="font-medium text-blue-900">Light Usage</span>
                    <p className="text-sm text-blue-700">~100 emails/month</p>
                  </div>
                  <div className="text-right">
                    <span className="font-medium text-blue-900">£8-12/month</span>
                    <p className="text-sm text-blue-700">Infrastructure + AI</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
                  <div>
                    <span className="font-medium text-blue-900">Medium Usage</span>
                    <p className="text-sm text-blue-700">~500 emails/month</p>
                  </div>
                  <div className="text-right">
                    <span className="font-medium text-blue-900">£15-25/month</span>
                    <p className="text-sm text-blue-700">Mixed GPT-3.5/GPT-4</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
                  <div>
                    <span className="font-medium text-blue-900">Heavy Usage</span>
                    <p className="text-sm text-blue-700">~1000+ emails/month</p>
                  </div>
                  <div className="text-right">
                    <span className="font-medium text-blue-900">£30-50/month</span>
                    <p className="text-sm text-blue-700">Business scale</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cost Control Tips */}
            <div className="p-4">
              <h5 className="font-medium text-gray-900 mb-2">Cost Control Tips</h5>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Use GPT-3.5 for routine emails (5-10x cheaper than GPT-4)</li>
                <li>• Set monthly usage limits to prevent unexpected costs</li>
                <li>• Monitor token usage in real-time via dashboard</li>
                <li>• Optimize prompts to reduce token consumption</li>
                <li>• Export/delete old emails to manage storage costs</li>
              </ul>
            </div>
          </div>

          <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-medium text-yellow-900 mb-2">💡 Pro Tip:</h4>
            <p className="text-sm text-yellow-800">
              Start with GPT-3.5-Turbo for all emails. Only upgrade specific email types to GPT-4 if needed. 
              This hybrid approach typically reduces costs by 70-80% while maintaining quality.
            </p>
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
    content: () => (
      <div className="space-y-6">
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
            <button className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Connect with Microsoft
            </button>
          </div>

          {/* Self-hosted Option */}
          <div className="p-6 bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Self-hosted Setup</h3>
            <p className="text-sm text-gray-600 mb-4">
              Create your own Microsoft OAuth app for complete control.
            </p>
            <div className="space-y-4">
              <div className="text-sm text-gray-600">
                <h4 className="font-medium mb-2">Required Steps:</h4>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Register app in Azure Portal</li>
                  <li>Configure OAuth settings</li>
                  <li>Set up API permissions</li>
                  <li>Add environment variables</li>
                </ol>
              </div>
              <button 
                onClick={() => window.open('https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationsListBlade', '_blank')}
                className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Open Azure Portal
              </button>
            </div>
          </div>
        </div>

        {/* Self-hosted Instructions (collapsible) */}
        <div className="mt-6 border rounded-lg overflow-hidden">
          <button className="w-full p-4 bg-gray-50 text-left flex items-center justify-between">
            <span className="font-medium text-gray-900">Self-hosted Setup Instructions</span>
            <ArrowRight className="w-5 h-5 text-gray-500" />
          </button>
          <div className="p-4 border-t">
            <ol className="list-decimal list-inside space-y-3">
              <li>In Azure Portal App Registrations:
                <ul className="ml-6 mt-2 space-y-2 text-sm text-gray-600">
                  <li>• Click "New registration"</li>
                  <li>• Name: "Email Manager" (or your choice)</li>
                  <li>• Account type: "Accounts in any organizational directory and personal Microsoft accounts"</li>
                </ul>
              </li>
              <li>Configure Redirect URI:
                <pre className="mt-2 p-4 bg-gray-800 text-white rounded-lg overflow-x-auto text-sm">
                  {`Type: Single-page application (SPA)
URI: https://your-domain.com/auth/callback`}
                </pre>
              </li>
              <li>Add API Permissions:
                <ul className="ml-6 mt-2 space-y-1 text-sm text-gray-600">
                  <li>• User.Read</li>
                  <li>• Mail.Read</li>
                  <li>• Mail.Send</li>
                  <li>• offline_access</li>
                </ul>
              </li>
              <li>Copy credentials and add to .env.local:
                <pre className="mt-2 p-4 bg-gray-800 text-white rounded-lg overflow-x-auto text-sm">
                  {`NEXT_PUBLIC_MICROSOFT_CLIENT_ID=your_client_id
NEXT_PUBLIC_MICROSOFT_TENANT_ID=your_tenant_id
NEXT_PUBLIC_REDIRECT_URI=https://your-domain.com/auth/callback`}
                </pre>
              </li>
            </ol>

            <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-medium text-yellow-900 mb-2">💡 Development Tips:</h4>
              <ul className="space-y-2 text-sm text-yellow-800">
                <li>• For local development, use http://localhost:3000/auth/callback</li>
                <li>• Add both production and development redirect URIs</li>
                <li>• No client secret needed (using MSAL.js)</li>
                <li>• Test with a personal account first</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'explainer',
    title: 'Everything You Need to Know',
    description: 'Complete guide to running costs, AI models, and infrastructure',
    icon: HelpCircle,
    content: () => (
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Running Costs & Infrastructure</h3>
          
          <div className="bg-white border rounded-lg divide-y">
            {/* Infrastructure Costs */}
            <div className="p-4">
              <h5 className="font-medium text-gray-900 mb-2">Infrastructure Costs</h5>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Database hosting: £6-8/month (Supabase Pro plan)</li>
                <li>• Storage: Included up to 8GB (sufficient for ~100k emails)</li>
                <li>• No additional server costs (serverless architecture)</li>
              </ul>
            </div>

            {/* AI Models & Capabilities */}
            <div className="p-4">
              <h5 className="font-medium text-gray-900 mb-2">AI Models & Performance</h5>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  We support multiple state-of-the-art AI models, each with unique strengths:
                </p>
                
                <div className="grid gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h6 className="font-medium text-gray-900 mb-2">GPT-4</h6>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• Superior understanding of context and nuance</li>
                      <li>• Best for complex business communications</li>
                      <li>• £0.04 per email response (avg.)</li>
                      <li>• Recommended for high-stakes emails</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h6 className="font-medium text-gray-900 mb-2">Claude (Anthropic)</h6>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• Excellent at detailed analysis</li>
                      <li>• Strong ethical considerations</li>
                      <li>• £0.03 per email response (avg.)</li>
                      <li>• Great for analytical responses</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h6 className="font-medium text-gray-900 mb-2">Gemini</h6>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• Fast processing speed</li>
                      <li>• Good multilingual support</li>
                      <li>• £0.025 per email response (avg.)</li>
                      <li>• Ideal for international communication</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h6 className="font-medium text-gray-900 mb-2">DeepSeek</h6>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• Emerging powerful model</li>
                      <li>• Strong technical understanding</li>
                      <li>• £0.02 per email response (avg.)</li>
                      <li>• Great for technical communications</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Monthly Estimates */}
            <div className="p-4">
              <h5 className="font-medium text-gray-900 mb-2">Typical Monthly Scenarios</h5>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
                  <div>
                    <span className="font-medium text-blue-900">Light Usage</span>
                    <p className="text-sm text-blue-700">~100 emails/month</p>
                  </div>
                  <div className="text-right">
                    <span className="font-medium text-blue-900">£10-15/month</span>
                    <p className="text-sm text-blue-700">Infrastructure + AI</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
                  <div>
                    <span className="font-medium text-blue-900">Medium Usage</span>
                    <p className="text-sm text-blue-700">~500 emails/month</p>
                  </div>
                  <div className="text-right">
                    <span className="font-medium text-blue-900">£25-35/month</span>
                    <p className="text-sm text-blue-700">Mixed model usage</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
                  <div>
                    <span className="font-medium text-blue-900">Heavy Usage</span>
                    <p className="text-sm text-blue-700">~1000+ emails/month</p>
                  </div>
                  <div className="text-right">
                    <span className="font-medium text-blue-900">£45-60/month</span>
                    <p className="text-sm text-blue-700">Enterprise scale</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Best Practices */}
            <div className="p-4">
              <h5 className="font-medium text-gray-900 mb-2">Best Practices & Tips</h5>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Use GPT-4 for important client communications</li>
                <li>• Claude works great for analytical responses</li>
                <li>• Gemini excels at multilingual emails</li>
                <li>• Set monthly usage limits per department</li>
                <li>• Monitor usage patterns in real-time dashboard</li>
                <li>• Regular exports keep storage costs optimized</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <h3 className="text-lg font-medium">Understanding Running Costs</h3>
            <div className="bg-white border rounded-lg divide-y">
              {/* Infrastructure Costs */}
              <div className="p-4">
                <h5 className="font-medium text-gray-900 mb-2">Infrastructure & Storage</h5>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Database hosting: £6-8/month (Supabase Pro plan)</li>
                  <li>• Storage: Included up to 8GB (sufficient for ~100k emails)</li>
                  <li>• No additional server costs (serverless architecture)</li>
                  <li>• Automatic backups included</li>
                </ul>
              </div>

              {/* AI Processing Costs */}
              <div className="p-4">
                <h5 className="font-medium text-gray-900 mb-2">AI Processing Costs</h5>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Cost per email varies based on model choice and email complexity:
                  </p>
                  <div className="grid gap-3">
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div>
                        <span className="font-medium text-gray-900">GPT-4</span>
                        <p className="text-sm text-gray-600">High-stakes communications</p>
                      </div>
                      <div className="text-right">
                        <span className="font-medium text-gray-900">£0.04/email</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div>
                        <span className="font-medium text-gray-900">Claude</span>
                        <p className="text-sm text-gray-600">Analytical responses</p>
                      </div>
                      <div className="text-right">
                        <span className="font-medium text-gray-900">£0.03/email</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div>
                        <span className="font-medium text-gray-900">Gemini</span>
                        <p className="text-sm text-gray-600">International emails</p>
                      </div>
                      <div className="text-right">
                        <span className="font-medium text-gray-900">£0.025/email</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div>
                        <span className="font-medium text-gray-900">DeepSeek</span>
                        <p className="text-sm text-gray-600">Technical communications</p>
                      </div>
                      <div className="text-right">
                        <span className="font-medium text-gray-900">£0.02/email</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Monthly Scenarios */}
              <div className="p-4">
                <h5 className="font-medium text-gray-900 mb-2">Monthly Cost Scenarios</h5>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
                    <div>
                      <span className="font-medium text-blue-900">Startup</span>
                      <p className="text-sm text-blue-700">~100 emails/month</p>
                    </div>
                    <div className="text-right">
                      <span className="font-medium text-blue-900">£10-15/month</span>
                      <p className="text-sm text-blue-700">Mixed model usage</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
                    <div>
                      <span className="font-medium text-blue-900">Growth</span>
                      <p className="text-sm text-blue-700">~500 emails/month</p>
                    </div>
                    <div className="text-right">
                      <span className="font-medium text-blue-900">£25-35/month</span>
                      <p className="text-sm text-blue-700">Multi-department</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
                    <div>
                      <span className="font-medium text-blue-900">Enterprise</span>
                      <p className="text-sm text-blue-700">1000+ emails/month</p>
                    </div>
                    <div className="text-right">
                      <span className="font-medium text-blue-900">£45-60/month</span>
                      <p className="text-sm text-blue-700">Full organization</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cost Management */}
              <div className="p-4">
                <h5 className="font-medium text-gray-900 mb-2">Cost Management Features</h5>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Set budget limits per department/team</li>
                  <li>• Real-time usage monitoring dashboard</li>
                  <li>• Automated cost optimization suggestions</li>
                  <li>• Custom model selection rules</li>
                  <li>• Usage analytics and reporting</li>
                </ul>
              </div>

              {/* Cancellation & Data */}
              <div className="p-4">
                <h5 className="font-medium text-gray-900 mb-2">Cancellation & Data Ownership</h5>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">
                    Since you own the infrastructure and data, you have complete control:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Export all data at any time</li>
                    <li>• Full database backup provided</li>
                    <li>• Transition to self-hosting with our support</li>
                    <li>• Clear shutdown instructions provided</li>
                    <li>• No long-term contracts or commitments</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-medium text-yellow-900 mb-2">💡 Cost Optimization Tips:</h4>
              <ul className="space-y-2 text-sm text-yellow-800">
                <li>• Use model-specific routing based on email type and importance</li>
                <li>• Implement approval workflows for premium model usage</li>
                <li>• Regular cost analysis to optimize model selection</li>
                <li>• Bulk process similar emails together</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    ),
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
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-3xl mx-4 overflow-hidden">
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
        <div className="p-6">
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