import { createClient } from '@/utils/supabase/client';

export async function signInWithMicrosoft() {
  const supabase = createClient();
  if (!supabase) throw new Error('Failed to initialize Supabase client');
  
  return supabase.auth.signInWithOAuth({
    provider: 'azure',
    options: {
      scopes: 'email offline_access Mail.Read Mail.Send User.Read',
      redirectTo: `${window.location.origin}/auth/callback`
    }
  });
}

export async function signOut() {
  const supabase = createClient();
  if (!supabase) throw new Error('Failed to initialize Supabase client');
  
  return supabase.auth.signOut();
}