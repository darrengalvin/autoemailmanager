'use client';

import { useEmailStore } from '@/store/emailStore';
import { EmailList } from '../EmailList';
import { DraftsHeader } from './DraftsHeader';

export function DraftsList() {
  const { drafts } = useEmailStore();

  return (
    <div className="p-6">
      <DraftsHeader />
      <EmailList 
        emails={drafts} 
        onEmailClick={(email) => {
          // TODO: Implement draft editing
          console.log('Edit draft:', email.id);
        }}
      />
    </div>
  );
}