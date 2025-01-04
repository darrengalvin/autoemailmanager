'use client';

import { useState } from 'react';
import { Database, Key, XCircle, AlertCircle, Check, RefreshCw } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { TableVerification } from './TableVerification';
import { requiredTables } from '../config/tables';
import { verifyAllTables, verifyTable, TableInfo } from '@/utils/supabase/tableVerification';

interface DatabaseSetupProps {
  onComplete: () => void;
}

export function DatabaseSetup({ onComplete }: DatabaseSetupProps) {
  const [credentials, setCredentials] = useState({
    url: localStorage.getItem('SUPABASE_URL') || '',
    key: localStorage.getItem('SUPABASE_KEY') || ''
  });
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isConfigured, setIsConfigured] = useState(false);
  const [tableStatuses, setTableStatuses] = useState<TableInfo[]>(requiredTables);

  const handleDisconnect = () => {
    localStorage.removeItem('SUPABASE_URL');
    localStorage.removeItem('SUPABASE_KEY');
    setCredentials({ url: '', key: '' });
    setIsConfigured(false);
    setTableStatuses(requiredTables);
  };

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

      setIsConfigured(true);

      // Verify all tables
      const results = await verifyAllTables(tableStatuses);
      setTableStatuses(results);

      if (results.every(t => t.exists)) {
        onComplete();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect to Supabase');
      setIsConfigured(false);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleRetryTable = async (tableName: string) => {
    // Update status to checking
    setTableStatuses(prev => prev.map(t => 
      t.name === tableName ? { ...t, checking: true, error: undefined } : t
    ));

    const exists = await verifyTable(tableName);
    
    setTableStatuses(prev => prev.map(t => 
      t.name === tableName ? {
        ...t,
        exists,
        checking: false,
        error: exists ? undefined : `Table ${tableName} not found or inaccessible`
      } : t
    ));

    // Check if all tables are verified now
    const allVerified = tableStatuses.every(t => 
      t.name === tableName ? exists : t.exists
    );
    
    if (allVerified) {
      onComplete();
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b">
        <div className="flex items-center gap-3">
          <Database className="w-8 h-8 text-primary" />
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Database Setup</h2>
            <p className="text-gray-600">Connect to your Supabase project</p>
          </div>
        </div>
        {isConfigured && (
          <button
            onClick={handleDisconnect}
            className="flex items-center gap-2 px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-md"
          >
            <XCircle className="w-4 h-4" />
            Disconnect
          </button>
        )}
      </div>

      <div className="grid gap-6">
        {!isConfigured ? (
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
        ) : (
          <>
            {/* Table Verification */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-blue-900 mb-4">Database Structure</h3>
              <TableVerification 
                tables={tableStatuses}
                onRetry={handleRetryTable}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 p-4 bg-red-50 text-red-600 rounded-lg">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {/* Retry All Button */}
            <div className="flex justify-end">
              <button
                onClick={() => tableStatuses.forEach(t => !t.exists && handleRetryTable(t.name))}
                disabled={isConnecting || tableStatuses.every(t => t.exists)}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50"
              >
                {isConnecting ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Verifying...
                  </>
                ) : tableStatuses.every(t => t.exists) ? (
                  <>
                    <Check className="w-5 h-5" />
                    All Tables Verified
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-5 h-5" />
                    Retry Failed Tables
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}