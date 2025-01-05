import { createClient } from '@/utils/supabase/client';
import { supabaseConfig } from '@/utils/supabase/config';
import { logger } from '@/utils/logger';

export async function signInWithGoogle() {
  try {
    const supabase = createClient();
    if (!supabase) throw new Error('Failed to initialize Supabase client');
    
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: 'email https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/gmail.labels',
        queryParams: {
          access_type: 'offline',
          prompt: 'consent'
        },
        redirectTo: supabaseConfig.authRedirectUrl
      }
    });

    if (error) throw error;
    return data;
  } catch (error) {
    logger.error('Google sign in failed:', error);
    throw error;
  }
}

export async function getGoogleToken() {
  try {
    const supabase = createClient();
    if (!supabase) throw new Error('Failed to initialize Supabase client');
    
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) throw error;
    if (!session?.provider_token) {
      throw new Error('No Google token found');
    }

    return session.provider_token;
  } catch (error) {
    logger.error('Failed to get Google token:', error);
    throw error;
  }
} 