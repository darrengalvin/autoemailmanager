import { create } from 'zustand';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/client';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  error: null,
  setUser: (user) => set({ user }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  signIn: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      const supabase = createClient();
      if (!supabase) throw new Error('Supabase client not initialized');

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to sign in' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  signUp: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      const supabase = createClient();
      if (!supabase) throw new Error('Supabase client not initialized');

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to sign up' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  signOut: async () => {
    try {
      set({ isLoading: true, error: null });
      const supabase = createClient();
      if (!supabase) throw new Error('Supabase client not initialized');

      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      set({ user: null });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to sign out' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  clearError: () => set({ error: null }),
}));

// Initialize auth state
const supabase = createClient();
if (supabase) {
  supabase.auth.onAuthStateChange((event, session) => {
    useAuthStore.setState({ 
      user: session?.user ?? null,
      isLoading: false,
    });
  });
}