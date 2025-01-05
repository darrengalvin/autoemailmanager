import { createClient } from '@/utils/supabase/client';

export async function signInWithMicrosoft() {
  const supabase = createClient();
  if (!supabase) throw new Error('Failed to initialize Supabase client');
  
  return supabase.auth.signInWithOAuth({
    provider: 'azure',
    options: {
      scopes: 'email offline_access Mail.Read Mail.Send User.Read',
      redirectTo: `${window.location.origin}/auth/callback`,
      skipBrowserRedirect: true // Prevent automatic redirect
    }
  }).then(({ data, error }) => {
    if (error) throw error;
    if (!data?.url) throw new Error('No OAuth URL returned');

    // Open popup window
    const popup = window.open(
      data.url,
      'microsoft-oauth',
      'width=600,height=800,left=200,top=100'
    );

    // Return a promise that resolves when the popup completes
    return new Promise((resolve, reject) => {
      // Check popup status every 500ms
      const interval = setInterval(() => {
        try {
          // If popup closed without completing
          if (popup?.closed) {
            clearInterval(interval);
            reject(new Error('Authentication cancelled'));
          }

          // If popup redirected back to our domain
          if (popup?.location?.hostname === window.location.hostname) {
            clearInterval(interval);
            popup.close();
            resolve(data);
          }
        } catch (e) {
          // Cross-origin errors are expected while popup is on Microsoft domain
          if (popup?.closed) {
            clearInterval(interval);
            reject(new Error('Authentication cancelled'));
          }
        }
      }, 500);

      // Cleanup after 5 minutes
      setTimeout(() => {
        clearInterval(interval);
        popup?.close();
        reject(new Error('Authentication timeout'));
      }, 300000);
    });
  });
}

export async function signOut() {
  const supabase = createClient();
  if (!supabase) throw new Error('Failed to initialize Supabase client');
  
  return supabase.auth.signOut();
}