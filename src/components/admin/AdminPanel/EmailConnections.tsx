'use client';

import { useState, useEffect } from 'react';
import { Mail, Shield, Check } from 'lucide-react';
import { MicrosoftIcon } from '@/components/icons/MicrosoftIcon';
import { useAuth } from '@/hooks/useAuth';
import { createClient } from '@/utils/supabase/client';
import { Database } from '@/types/supabase';

export function EmailConnections() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [connections, setConnections] = useState<any[]>([]);
  const supabase = createClient();

  const fetchConnections = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('email_connections')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      setConnections(data || []);
    } catch (error) {
      console.error('Failed to fetch connections:', error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, [user]);

  const handleDisconnect = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      const { error } = await supabase
        .from('email_connections')
        .delete()
        .eq('user_id', user.id)
        .eq('provider', 'microsoft');

      if (error) throw error;
      
      // Refresh connections
      await fetchConnections();
    } catch (error) {
      console.error('Failed to disconnect:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const hasMicrosoftConnection = connections.some(conn => conn.provider === 'microsoft');

  return (
    <div className="space-y-6">
      {/* Microsoft Account */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <MicrosoftIcon className="w-8 h-8 text-blue-500" />
            <div>
              <h3 className="font-medium text-gray-900">Microsoft Account</h3>
              <p className="text-sm text-gray-500">Connect your Microsoft 365 or Outlook account</p>
            </div>
          </div>
          <div>
            {hasMicrosoftConnection ? (
              <button
                onClick={handleDisconnect}
                disabled={isLoading}
                className="text-sm text-red-600 hover:text-red-700"
              >
                {isLoading ? 'Disconnecting...' : 'Disconnect'}
              </button>
            ) : (
              <button
                onClick={() => window.location.href = '/api/oauth/microsoft'}
                disabled={isLoading}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Connect
              </button>
            )}
          </div>
        </div>

        {hasMicrosoftConnection && (
          <div className="mt-4 flex items-center gap-2 text-sm text-green-600">
            <Check className="w-4 h-4" />
            <span>Connected</span>
          </div>
        )}
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
      </div>
    </div>
  );
}