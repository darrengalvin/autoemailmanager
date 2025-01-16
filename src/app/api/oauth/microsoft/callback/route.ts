import { headers, cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { logger } from '@/utils/logger';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');

    if (error) {
      logger.error('OAuth error:', error, errorDescription);
      return Response.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/?error=${error}`);
    }

    if (!code) {
      logger.error('No code received from Microsoft');
      return Response.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/?error=no_code`);
    }

    // Get the current host
    const headersList = await headers();
    const host = headersList.get('host') || '';
    const isDevelopment = host.includes('localhost') || host.includes('127.0.0.1');
    
    const redirectUri = isDevelopment 
      ? `${process.env.NEXT_PUBLIC_APP_URL}/api/oauth/microsoft/callback`
      : `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/api/oauth/microsoft/callback`;

    // Exchange code for tokens
    logger.info('Exchanging code for tokens...');
    const tokenResponse = await fetch('https://login.microsoftonline.com/common/oauth2/v2.0/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_MICROSOFT_CLIENT_ID!,
        client_secret: process.env.MICROSOFT_CLIENT_SECRET!,
        code,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code'
      })
    });

    if (!tokenResponse.ok) {
      const error = await tokenResponse.text();
      logger.error('Token exchange failed:', error);
      return Response.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/?error=token_exchange_failed`);
    }

    const tokens = await tokenResponse.json();
    logger.info('Received tokens:', {
      hasAccessToken: !!tokens.access_token,
      hasRefreshToken: !!tokens.refresh_token,
      tokenType: tokens.token_type,
      scope: tokens.scope
    });

    // Initialize Supabase client
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    // Sign in with Supabase using the Microsoft token
    const { data: authData, error: signInError } = await supabase.auth.signInWithIdToken({
      provider: 'azure',
      token: tokens.access_token,
      nonce: Math.random().toString(36).substring(2)
    });

    if (signInError) {
      logger.error('Supabase sign in error:', signInError);
      return Response.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/?error=auth_failed`);
    }

    // Store the Microsoft tokens
    const { error: updateError } = await supabase
      .from('email_connections')
      .upsert({
        user_id: authData.user.id,
        provider: 'microsoft',
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        expires_at: new Date(Date.now() + tokens.expires_in * 1000).toISOString()
      });

    if (updateError) {
      logger.error('Token storage error:', updateError);
      return Response.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/?error=token_storage_failed`);
    }

    // Successful connection
    return Response.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/?success=true`);
  } catch (error) {
    logger.error('Callback error:', error);
    return Response.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/?error=callback_failed`);
  }
} 