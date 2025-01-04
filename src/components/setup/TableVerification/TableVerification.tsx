'use client';

import { Table, RefreshCw, Check } from 'lucide-react';
import { TableInfo } from '@/utils/supabase/tableVerification';

interface TableVerificationProps {
  tables: TableInfo[];
  onRetry: (tableName: string) => void;
}

export function TableVerification({ tables, onRetry }: TableVerificationProps) {
  return (
    <div className="grid gap-3">
      {tables.map(table => (
        <div 
          key={table.name}
          className={`flex items-center gap-3 p-3 rounded-lg ${
            table.checking ? 'bg-blue-100 ring-2 ring-blue-200' :
            table.exists ? 'bg-green-50' :
            table.error ? 'bg-red-50' : 'bg-white/60'
          }`}
        >
          <Table className={`w-5 h-5 ${
            table.checking ? 'text-blue-600' :
            table.exists ? 'text-green-600' :
            table.error ? 'text-red-500' : 'text-gray-400'
          }`} />
          
          <div className="flex-1">
            <p className="font-medium text-gray-900">{table.name}</p>
            <p className="text-sm text-gray-600">{table.description}</p>
            {table.error && (
              <p className="text-sm text-red-600 mt-1">{table.error}</p>
            )}
          </div>

          {table.checking ? (
            <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
          ) : table.exists ? (
            <Check className="w-4 h-4 text-green-600" />
          ) : (
            <button
              onClick={() => onRetry(table.name)}
              className="px-2 py-1 text-xs bg-red-100 text-red-600 rounded hover:bg-red-200"
            >
              Retry
            </button>
          )}
        </div>
      ))}
    </div>
  );
}