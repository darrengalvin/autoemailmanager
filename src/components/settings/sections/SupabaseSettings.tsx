'use client';

import { useState } from 'react';
import { Database, Key, Table, RefreshCw } from 'lucide-react';

interface SupabaseConfig {
  url: string;
  key: string;
  embeddingsTable: string;
}

interface SupabaseSettingsProps {
  config: SupabaseConfig;
  onUpdate: (config: Partial<SupabaseConfig>) => void;
  onInitialize: () => Promise<void>;
}

export function SupabaseSettings({ config, onUpdate, onInitialize }: SupabaseSettingsProps) {
  const [isInitializing, setIsInitializing] = useState(false);

  const handleInitialize = async () => {
    setIsInitializing(true);
    try {
      await onInitialize();
    } finally {
      setIsInitializing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-medium">Supabase Configuration</h2>
        </div>
        <button
          onClick={handleInitialize}
          disabled={isInitializing}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark disabled:opacity-50 flex items-center gap-2"
        >
          {isInitializing ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Initializing...
            </>
          ) : (
            <>
              <Table className="w-4 h-4" />
              Initialize Database
            </>
          )}
        </button>
      </div>

      <div className="grid gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Supabase URL
          </label>
          <input
            type="text"
            value={config.url}
            onChange={(e) => onUpdate({ url: e.target.value })}
            className="w-full rounded-md"
            placeholder="https://your-project.supabase.co"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Supabase Anon Key
          </label>
          <div className="flex gap-2">
            <input
              type="password"
              value={config.key}
              onChange={(e) => onUpdate({ key: e.target.value })}
              className="flex-1 rounded-md"
              placeholder="your-anon-key"
            />
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <Key className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Embeddings Table Name
          </label>
          <input
            type="text"
            value={config.embeddingsTable}
            onChange={(e) => onUpdate({ embeddingsTable: e.target.value })}
            className="w-full rounded-md"
            placeholder="embeddings"
          />
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
        <h3 className="font-medium text-gray-900 mb-2">Database Schema</h3>
        <p className="mb-2">
          Initializing the database will create the following tables:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>embeddings - Stores vector embeddings for training data</li>
          <li>email_templates - Stores email templates and variables</li>
          <li>email_categories - Organizes emails into categories</li>
          <li>token_usage - Tracks AI token usage and costs</li>
        </ul>
      </div>
    </div>
  );
}