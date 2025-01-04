import { createClient } from '@/utils/supabase/client';
import { supabaseConfig } from '@/utils/supabase/config';
import { logger } from '@/utils/logger';

export async function signInWithMicrosoft() {
  try {
    const supabase = createClient();
    if (!supabase) throw new Error('Failed to initialize Supabase client');
    
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'azure',
      options: {
        scopes: supabaseConfig.microsoftConfig.scopes,
        queryParams: supabaseConfig.microsoftConfig.queryParams,
        redirectTo: supabaseConfig.authRedirectUrl
      }
    });

    if (error) throw error;
    return data;
  } catch (error) {
    logger.error('Microsoft sign in failed:', error);
    throw error;
  }
}

export async function getMicrosoftToken() {
  try {
    const supabase = createClient();
    if (!supabase) throw new Error('Failed to initialize Supabase client');
    
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) throw error;
    if (!session?.provider_token) {
      throw new Error('No Microsoft token found');
    }

    return session.provider_token;
  } catch (error) {
    logger.error('Failed to get Microsoft token:', error);
    throw error;
  }
}