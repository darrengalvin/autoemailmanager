import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { useAuthStore } from '@/store/authStore';
import { logger } from '@/utils/logger';

export function useAuth() {
  const router = useRouter();
  const { user, setUser, isLoading, setIsLoading, error, setError } = useAuthStore();
  const supabase = createClient();

  useEffect(() => {
    if (!supabase) return;
    
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setIsLoading(false);

      if (event === 'SIGNED_OUT') {
        router.push('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase, setUser, setIsLoading, router]);

  const signIn = async (provider: 'microsoft' | 'email', options?: { email?: string; password?: string }) => {
    if (!supabase) throw new Error('Supabase client not initialized');
    try {
      setIsLoading(true);
      setError(null);

      if (provider === 'microsoft') {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'azure',
          options: {
            scopes: 'email offline_access Mail.Read Mail.Send User.Read',
            queryParams: {
              prompt: 'consent',
              domain_hint: 'organizations'
            },
            redirectTo: `${window.location.origin}/auth/callback`
          }
        });
        if (error) throw error;
      } else if (options?.email && options?.password) {
        const { error } = await supabase.auth.signInWithPassword({
          email: options.email,
          password: options.password,
        });
        if (error) throw error;
      }
    } catch (error) {
      logger.error('Sign in failed:', error);
      setError(error instanceof Error ? error.message : 'Authentication failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    if (!supabase) throw new Error('Supabase client not initialized');
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      logger.error('Sign out failed:', error);
      setError(error instanceof Error ? error.message : 'Sign out failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    isLoading,
    error,
    signIn,
    signOut
  };
}