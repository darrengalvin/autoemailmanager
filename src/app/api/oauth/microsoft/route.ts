import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function GET() {
  const headersList = await headers();
  const host = headersList.get('host') || '';
  
  // Determine if we're in development or production
  const isDevelopment = host.includes('localhost') || host.includes('127.0.0.1');
  const redirectUri = isDevelopment 
    ? `${process.env.NEXT_PUBLIC_APP_URL}/api/oauth/microsoft/callback`
    : `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/api/oauth/microsoft/callback`;

  const microsoftOAuthUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?${new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_MICROSOFT_CLIENT_ID!,
    response_type: 'code',
    redirect_uri: redirectUri,
    scope: 'offline_access Mail.Read Mail.Send User.Read',
    response_mode: 'query',
    state: 'managed-setup'
  })}`;

  return Response.redirect(microsoftOAuthUrl, 307);
} 