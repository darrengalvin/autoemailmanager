'use client';

import { useCallback, useEffect, useState } from 'react';
import { useEmailStore } from '@/store/emailStore';
import { EmailList } from '../EmailList';
import { EmailHeader } from '../EmailHeader';
import { EmailStats } from './EmailStats';
import { EmailPreview } from '../EmailPreview/EmailPreview';
import { EmailFilters } from '../EmailFilters/EmailFilters';
import { useMicrosoftGraph } from '@/hooks/useMicrosoftGraph';
import { Email } from '@/types';
import { budgetReviewThread } from '@/utils/mockData';
import { Loader2 } from 'lucide-react';

export function EmailDashboard() {
  const { emails } = useEmailStore();
  const { fetchEmails, loading, isTransitioning, showWelcome } = useMicrosoftGraph();
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [filteredEmails, setFilteredEmails] = useState(emails);

  const handleEmailSelect = (email: Email) => {
    // If it's the budget review email, add the thread data
    if (email.subject === 'Urgent: Q4 Budget Review Meeting') {
      setSelectedEmail({
        ...email,
        thread: budgetReviewThread.messages.map(message => ({
          id: message.id,
          subject: email.subject,
          body: message.body,
          to: email.to,
          from: message.from,
          timestamp: new Date(message.timestamp),
          status: 'sent'
        }))
      });
    } else {
      setSelectedEmail(email);
    }
  };

  const handleCompose = useCallback(() => {
    console.log('Compose clicked');
  }, []);

  useEffect(() => {
    fetchEmails().catch(console.error);
  }, [fetchEmails]);

  useEffect(() => {
    setFilteredEmails(emails);
  }, [emails]);

  if (isTransitioning || showWelcome) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="text-center space-y-4 max-w-lg mx-auto p-8">
          {showWelcome ? (
            <>
              <h2 className="text-2xl font-bold text-blue-900">Welcome to Your Smart Inbox!</h2>
              <p className="text-blue-600">
                You have successfully logged in. We're preparing to show you your real emails...
              </p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-blue-900">Loading Your Emails</h2>
              <p className="text-blue-600">
                Switching from demo mode to your actual inbox...
              </p>
            </>
          )}
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mt-4" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <EmailHeader title="AI-Powered Inbox" onCompose={handleCompose} />
      <EmailStats />
      <EmailFilters 
        onFilterChange={(filters) => {
          // Filter implementation
        }}
        onSortChange={(sort) => {
          // Sort implementation
        }}
      />
      <EmailList 
        emails={filteredEmails}
        onEmailClick={handleEmailSelect}
      />
      <EmailPreview
        email={selectedEmail}
        isOpen={!!selectedEmail}
        onClose={() => setSelectedEmail(null)}
        onApprove={() => {
          console.log('Approved:', selectedEmail?.id);
          setSelectedEmail(null);
        }}
        onReject={() => {
          console.log('Rejected:', selectedEmail?.id);
          setSelectedEmail(null);
        }}
        onEdit={() => {
          console.log('Edit:', selectedEmail?.id);
        }}
      />
    </div>
  );
}