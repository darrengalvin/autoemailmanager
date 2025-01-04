import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (error) {
      console.error('Auth error:', error);
      return NextResponse.redirect(new URL('/auth?error=auth_failed', requestUrl.origin));
    }
    
    // After successful authentication, redirect to the dashboard
    return NextResponse.redirect(new URL('/', requestUrl.origin));
  }

  // If no code, redirect to auth page
  return NextResponse.redirect(new URL('/auth', requestUrl.origin));
}