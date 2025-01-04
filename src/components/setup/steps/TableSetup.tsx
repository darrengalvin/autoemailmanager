'use client';

import { useState } from 'react';
import { Database, AlertCircle } from 'lucide-react';
import { TableVerification } from '../TableVerification';
import { requiredTables } from '../config/tables';
import { verifyAllTables, verifyTable, TableInfo } from '@/utils/supabase/tableVerification';

interface TableSetupProps {
  onComplete: () => void;
}

export function TableSetup({ onComplete }: TableSetupProps) {
  const [error, setError] = useState<string | null>(null);
  const [tableStatuses, setTableStatuses] = useState<TableInfo[]>(requiredTables);

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
      <div className="flex items-center gap-3 pb-6 border-b">
        <Database className="w-8 h-8 text-primary" />
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Table Setup</h2>
          <p className="text-gray-600">Verify required database tables</p>
        </div>
      </div>

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
    </div>
  );
}