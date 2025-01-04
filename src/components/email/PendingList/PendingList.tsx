'use client';

import { useState } from 'react';
import { useEmailStore } from '@/store/emailStore';
import { EmailList } from '../EmailList';
import { PendingHeader } from './PendingHeader';
import { ReviewModal } from '../ReviewModal/ReviewModal';
import { Email } from '@/types';

export function PendingList() {
  const { emails } = useEmailStore();
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const pendingEmails = emails.filter(email => 
    email.status === 'ai_pending' || email.status === 'human_pending'
  );

  return (
    <div className="p-6">
      <PendingHeader />
      <EmailList 
        emails={pendingEmails}
        onEmailClick={(email) => setSelectedEmail(email)}
      />
      {selectedEmail && (
        <ReviewModal
          email={selectedEmail}
          isOpen={true}
          onClose={() => setSelectedEmail(null)}
        />
      )}
    </div>
  );
}