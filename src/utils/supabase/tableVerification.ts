import { createClient } from './client';
import { logger } from '@/utils/logger';

export interface TableInfo {
  name: string;
  description: string;
  exists: boolean;
  checking: boolean;
  error?: string;
}

export async function verifyTable(tableName: string): Promise<boolean> {
  try {
    const supabase = createClient();
    if (!supabase) throw new Error('Could not create Supabase client');
    
    const result = await supabase
      .from(tableName)
      .select('count', { count: 'exact', head: true })
      .single();

    const error = result.error;

    // Table exists if we get a permission denied error (due to RLS)
    // or if the query succeeds
    return !error || error.message.includes('permission denied');
  } catch (err) {
    logger.error(`Failed to verify table ${tableName}:`, err);
    return false;
  }
}

export async function verifyAllTables(tables: TableInfo[]): Promise<TableInfo[]> {
  const results = await Promise.all(
    tables.map(async (table) => {
      const exists = await verifyTable(table.name);
      return {
        ...table,
        exists,
        checking: false,
        error: exists ? undefined : `Table ${table.name} not found or inaccessible`
      };
    })
  );

  return results;
}