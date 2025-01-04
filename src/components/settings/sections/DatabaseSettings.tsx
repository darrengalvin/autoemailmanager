'use client';

import { useState } from 'react';
import { Database, Key, Table, RefreshCw, AlertCircle } from 'lucide-react';

interface DatabaseConfig {
  url: string;
  key: string;
  embeddingsTable: string;
}

interface DatabaseSettingsProps {
  config: DatabaseConfig;
  onUpdate: (config: Partial<DatabaseConfig>) => void;
}

export function DatabaseSettings({ config, onUpdate }: DatabaseSettingsProps) {
  const [isInitializing, setIsInitializing] = useState(false);

  const handleInitialize = async () => {
    setIsInitializing(true);
    try {
      // Database initialization logic would go here
      await new Promise(resolve => setTimeout(resolve, 1500));
    } finally {
      setIsInitializing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-medium">Database Configuration</h2>
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
            Database URL
          </label>
          <input
            type="text"
            value={config.url}
            onChange={(e) => onUpdate({ url: e.target.value })}
            className="w-full rounded-md"
            placeholder="postgres://user:pass@host:5432/dbname"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Database Key
          </label>
          <div className="flex gap-2">
            <input
              type="password"
              value={config.key}
              onChange={(e) => onUpdate({ key: e.target.value })}
              className="flex-1 rounded-md"
              placeholder="your-database-key"
            />
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <Key className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-center gap-2 text-blue-700 mb-2">
          <AlertCircle className="w-5 h-5" />
          <h3 className="font-medium">Database Schema</h3>
        </div>
        <div className="space-y-2 text-sm text-blue-600">
          <p>The following tables will be created:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>emails - Store email data and metadata</li>
            <li>embeddings - Vector embeddings for AI training</li>
            <li>email_templates - Reusable email templates</li>
            <li>token_usage - Track AI token consumption</li>
            <li>user_settings - User preferences and configurations</li>
          </ul>
        </div>
      </div>
    </div>
  );
}