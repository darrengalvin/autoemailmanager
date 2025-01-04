'use client';

import { useState } from 'react';
import { Box, Check, RefreshCw, AlertCircle } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { mockEmails } from '@/utils/mockData';

interface DummyDataSetupProps {
  onComplete: () => void;
}

export function DummyDataSetup({ onComplete }: DummyDataSetupProps) {
  const [isInstalling, setIsInstalling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [installedData, setInstalledData] = useState<{
    emails?: number;
    categories?: number;
  }>({});

  const installDummyData = async () => {
    setIsInstalling(true);
    setError(null);

    try {
      const supabase = createClient();
      if (!supabase) throw new Error('Failed to initialize Supabase client');

      // Install demo emails
      const { data: emails, error: emailError } = await supabase
        .from('emails')
        .insert(mockEmails.map(email => ({
          ...email,
          created_at: new Date().toISOString()
        })));

      if (emailError) throw emailError;

      // Install demo categories
      const { data: categories, error: categoryError } = await supabase
        .from('email_categories')
        .insert([
          { name: 'Work', color: '#0284c7', description: 'Work-related emails' },
          { name: 'Personal', color: '#059669', description: 'Personal communications' },
          { name: 'Important', color: '#dc2626', description: 'High priority emails' },
          { name: 'Follow-up', color: '#f59e0b', description: 'Emails requiring follow-up' }
        ]);

      if (categoryError) throw categoryError;

      setInstalledData({
        emails: emails?.length || 0,
        categories: categories?.length || 0
      });

      onComplete();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to install dummy data');
    } finally {
      setIsInstalling(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3 pb-6 border-b">
        <Box className="w-8 h-8 text-primary" />
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Sample Data</h2>
          <p className="text-gray-600">Install sample data to explore the system</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Info Box */}
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-blue-900 mb-2">What's Included</h3>
          <ul className="space-y-2 text-blue-700">
            <li>• Sample emails with different priorities and statuses</li>
            <li>• Pre-configured email categories</li>
            <li>• Example AI suggestions and responses</li>
            <li>• Demonstration of email threading</li>
          </ul>
        </div>

        {/* Installation Status */}
        {Object.keys(installedData).length > 0 && (
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-green-700">
              <Check className="w-5 h-5" />
              <h4 className="font-medium">Installation Complete</h4>
            </div>
            <ul className="mt-2 space-y-1 text-sm text-green-600">
              {installedData.emails && (
                <li>• {installedData.emails} sample emails installed</li>
              )}
              {installedData.categories && (
                <li>• {installedData.categories} email categories created</li>
              )}
            </ul>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-2 p-4 bg-red-50 text-red-600 rounded-lg">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Install Button */}
        <button
          onClick={installDummyData}
          disabled={isInstalling || Object.keys(installedData).length > 0}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50"
        >
          {isInstalling ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              Installing...
            </>
          ) : Object.keys(installedData).length > 0 ? (
            <>
              <Check className="w-5 h-5" />
              Installation Complete
            </>
          ) : (
            <>
              <Box className="w-5 h-5" />
              Install Sample Data
            </>
          )}
        </button>
      </div>
    </div>
  );
}