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

export function EmailDashboard() {
  const { emails } = useEmailStore();
  const { fetchEmails } = useMicrosoftGraph();
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