import { headers } from 'next/headers';
import { createClient } from '@/utils/supabase/client';
import { logger } from '@/utils/logger';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');

    if (error) {
      logger.error(`OAuth error: ${error} - ${errorDescription || 'No description'}`);
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
      logger.error(`Token exchange failed: ${error}`);
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
    const supabase = createClient();

    // Get the current session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      logger.error(`Session error: ${sessionError.message}`);
      return Response.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/?error=session_error`);
    }

    if (!session?.user) {
      // If no session, try to sign in
      const { error: signInError } = await supabase.auth.signInWithOAuth({
        provider: 'azure',
        options: {
          skipBrowserRedirect: true,
          queryParams: {
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token
          }
        }
      });

      if (signInError) {
        logger.error(`Supabase sign in error: ${signInError.message}`);
        return Response.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/?error=auth_failed`);
      }
    }

    // Get the user ID from the session
    const userId = session?.user?.id;
    if (!userId) {
      logger.error('No user ID available');
      return Response.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/?error=no_user_id`);
    }

    // Store the Microsoft tokens
    const { error: updateError } = await supabase
      .from('email_connections')
      .upsert({
        user_id: userId,
        provider: 'microsoft',
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        expires_at: new Date(Date.now() + tokens.expires_in * 1000).toISOString()
      });

    if (updateError) {
      logger.error(`Token storage error: ${updateError.message}`);
      return Response.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/?error=token_storage_failed`);
    }

    // Successful connection
    return Response.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/?success=true`);
  } catch (error) {
    logger.error(`Callback error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return Response.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/?error=callback_failed`);
  }
} 