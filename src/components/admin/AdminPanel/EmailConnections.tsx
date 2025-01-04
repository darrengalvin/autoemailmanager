'use client';

import { useState } from 'react';
import { Mail, MailPlus, AlertCircle, Check, Loader2 } from 'lucide-react';

interface ConnectionStatus {
  microsoft: boolean;
  google: boolean;
}

export function EmailConnections() {
  const [connecting, setConnecting] = useState<'microsoft' | 'google' | null>(null);
  const [connected, setConnected] = useState<ConnectionStatus>({
    microsoft: false,
    google: false
  });

  const handleConnect = async (provider: 'microsoft' | 'google') => {
    setConnecting(provider);
    // Simulate connection process
    await new Promise(resolve => setTimeout(resolve, 1500));
    setConnected(prev => ({ ...prev, [provider]: true }));
    setConnecting(null);
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
                <p className="text-sm text-gray-500">Connect your Outlook or Office 365 account</p>
              </div>
            </div>
            <button
              onClick={() => handleConnect('microsoft')}
              disabled={connecting === 'microsoft' || connected.microsoft}
              className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                connected.microsoft
                  ? 'bg-green-50 text-green-600'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {connecting === 'microsoft' ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Connecting...</>
              ) : connected.microsoft ? (
                <><Check className="w-4 h-4" /> Connected</>
              ) : (
                'Connect'
              )}
            </button>
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
            <button
              onClick={() => handleConnect('google')}
              disabled={connecting === 'google' || connected.google}
              className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                connected.google
                  ? 'bg-green-50 text-green-600'
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              {connecting === 'google' ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Connecting...</>
              ) : connected.google ? (
                <><Check className="w-4 h-4" /> Connected</>
              ) : (
                'Connect'
              )}
            </button>
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