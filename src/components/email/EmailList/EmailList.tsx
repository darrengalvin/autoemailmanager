'use client';

import { Email } from '@/types';
import { EmailListItem } from './EmailListItem';

interface EmailListProps {
  emails: Email[];
  onEmailClick?: (email: Email) => void;
}

export function EmailList({ emails, onEmailClick }: EmailListProps) {
  if (emails.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
        No emails to display
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
      {emails.map((email) => (
        <EmailListItem
          key={email.id}
          email={email}
          onPreviewClick={() => onEmailClick?.(email)}
        />
      ))}
    </div>
  );
}