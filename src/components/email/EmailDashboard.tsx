'use client';

import React from 'react';
import { useEmailStore } from '@/store/emailStore';
import { EmailList } from './EmailList';
import { EmailHeader } from './EmailHeader';
import { useMicrosoftGraph } from '@/hooks/useMicrosoftGraph';

export function EmailDashboard() {
  const { emails } = useEmailStore();
  const { fetchEmails } = useMicrosoftGraph();

  const handleCompose = React.useCallback(() => {
    // Handle compose action
    console.log('Compose clicked');
  }, []);

  React.useEffect(() => {
    fetchEmails().catch(console.error);
  }, [fetchEmails]);

  return (
    <div className="p-6">
      <EmailHeader title="Inbox" onCompose={handleCompose} />
      <EmailList emails={emails} />
    </div>
  );
}