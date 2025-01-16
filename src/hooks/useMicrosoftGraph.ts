'use client';

import { useState, useCallback } from 'react';
import { useEmailStore } from '@/store/emailStore';
import { Email } from '@/types';
import { EmailService } from '@/services/emailService';
import { createClient } from '@/utils/supabase/client';

export function useMicrosoftGraph() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { setEmails } = useEmailStore();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  const fetchEmails = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // First show the welcome message
      if (showWelcome) {
        setIsTransitioning(true);
        // Show welcome message for 2 seconds
        await new Promise(resolve => setTimeout(resolve, 2000));
        setShowWelcome(false);
      }

      // Get the current user's Microsoft connection
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('Not authenticated');
      }

      const { data: connections, error: connectionsError } = await supabase
        .from('user_connections')
        .select('*')
        .eq('user_id', user.id)
        .eq('provider', 'microsoft')
        .single();

      if (connectionsError || !connections) {
        throw new Error('No Microsoft connection found');
      }

      // Check if token is expired
      if (connections.expires_at && new Date(connections.expires_at) <= new Date()) {
        throw new Error('Microsoft token has expired');
      }

      // Initialize the email service with the access token
      const emailService = new EmailService(connections.access_token);
      
      // Fetch real emails
      console.log('Fetching real emails...');
      const realEmails = await emailService.fetchEmails();
      console.log('Fetched emails:', realEmails.length);
      
      setEmails(realEmails);
    } catch (err) {
      console.error('Error fetching emails:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch emails'));
      
      // If we fail to get real emails, show an error message
      setEmails([
        {
          id: '1',
          subject: 'Error Loading Emails',
          from: 'system@emailmanager.app',
          to: ['user@example.com'],
          body: `We encountered an error loading your emails. Please try refreshing the page or signing out and back in.\n\nError: ${err instanceof Error ? err.message : 'Unknown error'}`,
          attachments: [],
          timestamp: new Date(),
          status: 'human_pending',
          aiMetadata: {
            sentiment: 'negative',
            priority: 'high',
            category: 'system'
          }
        }
      ]);
    } finally {
      setLoading(false);
      setIsTransitioning(false);
    }
  }, [setEmails, showWelcome]);

  return { 
    loading, 
    error, 
    fetchEmails,
    isTransitioning,
    showWelcome
  };
}