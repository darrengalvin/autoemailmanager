'use client';

import { useEffect, useState } from 'react';
import { MailPlus, Mail, Loader2, Check, AlertCircle } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

interface ConnectionStatus {
  microsoft: boolean;
  google: boolean;
  loading: boolean;
  email?: string;
}

export function EmailConnections() {
  const [status, setStatus] = useState<ConnectionStatus>({
    microsoft: false,
    google: false,
    loading: true
  });

  useEffect(() => {
    checkConnectionStatus();
  }, []);

  const checkConnectionStatus = async () => {
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setStatus(prev => ({ ...prev, loading: false }));
        return;
      }

      const { data: connections } = await supabase
        .from('user_connections')
        .select('provider, email')
        .eq('user_id', user.id);

      const microsoftConnection = connections?.find(c => c.provider === 'microsoft');
      
      setStatus({
        microsoft: !!microsoftConnection,
        google: false, // Google not implemented yet
        loading: false,
        email: microsoftConnection?.email
      });
    } catch (error) {
      console.error('Failed to check connection status:', error);
      setStatus(prev => ({ ...prev, loading: false }));
    }
  };

  const handleConnect = async () => {
    // Redirect to Microsoft OAuth
    window.location.href = '/api/oauth/microsoft';
  };

  const handleDisconnect = async () => {
    try {
      setStatus(prev => ({ ...prev, loading: true }));
      const supabase = createClient();
      
      // Delete the connection from user_connections using a more specific query
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('user_connections')
        .delete()
        .match({ 
          user_id: user.id,
          provider: 'microsoft'
        });

      if (error) throw error;

      // Sign out from Supabase
      await supabase.auth.signOut();

      setStatus({
        microsoft: false,
        google: false,
        loading: false
      });

      // Refresh the page to reset the app state
      window.location.href = '/';
    } catch (error) {
      console.error('Failed to disconnect:', error);
      setStatus(prev => ({ ...prev, loading: false }));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-900">Email Account Connections</h2>
        <p className="mt-1 text-sm text-gray-500">Connect your email accounts to enable AI-powered email management</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Microsoft Account */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <MailPlus className="w-8 h-8 text-blue-600" />
              <div>
                <h3 className="font-medium text-gray-900">Microsoft Account</h3>
                <p className="text-sm text-gray-500">
                  {status.microsoft && status.email 
                    ? `Connected as ${status.email}`
                    : 'Connect your Outlook or Office 365 account'}
                </p>
              </div>
            </div>
            {status.loading ? (
              <div className="flex items-center gap-2 text-gray-500">
                <Loader2 className="w-4 h-4 animate-spin" /> Checking status...
              </div>
            ) : status.microsoft ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-green-600 flex items-center gap-1">
                  <Check className="w-4 h-4" /> Connected
                </span>
                <button
                  onClick={handleDisconnect}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={handleConnect}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Connect Account
              </button>
            )}
          </div>

          <div className="mt-4 bg-white rounded p-4 border border-gray-200">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Setup Instructions:</h4>
            <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
              <li>Register your application in the Azure Portal</li>
              <li>Configure OAuth 2.0 authentication</li>
              <li>Add the following permissions:
                <ul className="ml-6 mt-1 list-disc text-gray-500">
                  <li>Mail.Read</li>
                  <li>Mail.Send</li>
                  <li>User.Read</li>
                </ul>
              </li>
              <li>Add your redirect URI: <code className="px-2 py-1 bg-gray-100 rounded text-sm">https://yourdomain.com/auth/callback</code></li>
            </ol>
          </div>
        </div>

        {/* Google Account */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Mail className="w-8 h-8 text-red-500" />
              <div>
                <h3 className="font-medium text-gray-900">Google Account</h3>
                <p className="text-sm text-gray-500">Connect your Gmail account</p>
              </div>
            </div>
            <div className="opacity-50">
              <button
                disabled
                className="text-sm text-gray-500"
              >
                Coming Soon
              </button>
            </div>
          </div>

          <div className="mt-4 bg-white rounded p-4 border border-gray-200">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Setup Instructions:</h4>
            <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
              <li>Create a project in Google Cloud Console</li>
              <li>Enable the Gmail API</li>
              <li>Configure OAuth consent screen</li>
              <li>Create OAuth 2.0 credentials with these scopes:
                <ul className="ml-6 mt-1 list-disc text-gray-500">
                  <li>https://www.googleapis.com/auth/gmail.readonly</li>
                  <li>https://www.googleapis.com/auth/gmail.send</li>
                  <li>https://www.googleapis.com/auth/gmail.labels</li>
                </ul>
              </li>
              <li>Add authorized redirect URI: <code className="px-2 py-1 bg-gray-100 rounded text-sm">https://yourdomain.com/auth/google/callback</code></li>
            </ol>
          </div>

          <div className="mt-4 flex items-start gap-2 text-sm text-amber-600 bg-amber-50 p-3 rounded">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>Note: Your application must be verified by Google before you can connect with any Google account.</p>
          </div>
        </div>
      </div>
    </div>
  );
}