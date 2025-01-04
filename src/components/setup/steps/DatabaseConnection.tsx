'use client';

import { useState, useEffect } from 'react';
import { Database, Key, XCircle, AlertCircle, Check, RefreshCw } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

interface DatabaseConnectionProps {
  onComplete: () => void;
}

export function DatabaseConnection({ onComplete }: DatabaseConnectionProps) {
  const [credentials, setCredentials] = useState({
    url: '',
    key: ''
  });
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setCredentials({
      url: localStorage.getItem('SUPABASE_URL') || '',
      key: localStorage.getItem('SUPABASE_KEY') || ''
    });
  }, []);

  const handleConnect = async () => {
    if (!credentials.url || !credentials.key) {
      setError('Please provide both URL and API key');
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      localStorage.setItem('SUPABASE_URL', credentials.url);
      localStorage.setItem('SUPABASE_KEY', credentials.key);

      // Test connection
      const supabase = createClient();
      if (!supabase) throw new Error('Failed to initialize Supabase client');

      const { error: testError } = await supabase.auth.getUser();

      if (testError) {
        throw new Error('Failed to connect to Supabase');
      }

      onComplete();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect to Supabase');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3 pb-6 border-b">
        <Database className="w-8 h-8 text-primary" />
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Database Connection</h2>
          <p className="text-gray-600">Connect to your Supabase project</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Getting Started Guide */}
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-blue-900 mb-2">Getting Started</h3>
          <ol className="space-y-3 text-blue-700">
            <li>1. Create a new project at <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="underline">supabase.com</a></li>
            <li>2. Go to Project Settings → API</li>
            <li>3. Copy your Project URL and anon/public key below</li>
          </ol>
        </div>

        {/* Credentials Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project URL
            </label>
            <input
              type="url"
              value={credentials.url}
              onChange={(e) => setCredentials(prev => ({ ...prev, url: e.target.value }))}
              placeholder="https://your-project.supabase.co"
              className="w-full rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              API Key (anon/public)
            </label>
            <div className="flex gap-2">
              <input
                type="password"
                value={credentials.key}
                onChange={(e) => setCredentials(prev => ({ ...prev, key: e.target.value }))}
                placeholder="your-anon-key"
                className="flex-1 rounded-md"
              />
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Key className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-2 p-4 bg-red-50 text-red-600 rounded-lg">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Connect Button */}
        <button
          onClick={handleConnect}
          disabled={isConnecting || !credentials.url || !credentials.key}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50"
        >
          {isConnecting ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              Connecting...
            </>
          ) : (
            <>
              <Check className="w-5 h-5" />
              Connect to Supabase
            </>
          )}
        </button>
      </div>
    </div>
  );
}