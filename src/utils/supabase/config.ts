export const supabaseConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  storageUrl: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1`,
  authRedirectUrl: typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : '',
  microsoftConfig: {
    scopes: 'email offline_access Mail.Read Mail.Send User.Read',
    queryParams: {
      prompt: 'consent',
      domain_hint: 'organizations'
    }
  },
  googleConfig: {
    scopes: 'email https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/gmail.labels',
    queryParams: {
      access_type: 'offline',
      prompt: 'consent'
    }
  }
};