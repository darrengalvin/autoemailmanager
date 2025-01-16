import { createBrowserClient } from '@supabase/ssr';
import { Database } from '@/types/supabase';
import { logger } from '@/utils/logger';

let supabaseClient: ReturnType<typeof createBrowserClient<Database>> | null = null;

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Return mock client if credentials are missing
  if (!supabaseUrl || !supabaseKey) {
    logger.warn('Supabase credentials not found, using mock client');
    return createMockClient();
  }

  if (!supabaseClient) {
    supabaseClient = createBrowserClient<Database>(supabaseUrl, supabaseKey);
  }

  return supabaseClient;
}

function createMockClient() {
  const createBuilder = () => {
    const chain: any = {
      eq: (column: string, value: any) => chain,
      then: (onfulfilled: any) => Promise.resolve({ data: [], error: null }).then(onfulfilled)
    };
    return chain;
  };

  return {
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      getUser: async () => ({ data: { user: null }, error: null }),
      signInWithOAuth: async () => ({ data: null, error: null }),
      signInWithPassword: async () => ({ data: null, error: null }),
      signUp: async () => ({ data: null, error: null }),
      signOut: async () => ({ error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
    },
    storage: {
      createBucket: async () => ({ data: null, error: null }),
      from: () => ({
        upload: async () => ({ data: { path: '' }, error: null }),
        getPublicUrl: () => ({ data: { publicUrl: '' } }),
        remove: async () => ({ error: null })
      })
    },
    from: (table: string) => ({
      select: (columns?: string) => createBuilder(),
      insert: async (data: any) => {
        logger.info(`Mock inserting into ${table}:`, data);
        return {
          data: Array.isArray(data) ? data : [data],
          error: null
        };
      },
      upsert: async (data: any) => ({ data, error: null }),
      delete: () => createBuilder()
    })
  };
}