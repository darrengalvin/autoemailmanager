'use client';

import { useState } from 'react';
import { Ban, Plus, Trash2, Search } from 'lucide-react';
import { ExcludedEmail } from '@/types';

interface EmailExclusionsProps {
  excludedEmails: ExcludedEmail[];
  onAdd: (email: string, reason?: string) => void;
  onRemove: (id: string) => void;
}

export function EmailExclusions({ excludedEmails, onAdd, onRemove }: EmailExclusionsProps) {
  const [newEmail, setNewEmail] = useState('');
  const [reason, setReason] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEmail) {
      onAdd(newEmail, reason);
      setNewEmail('');
      setReason('');
    }
  };

  const filteredEmails = excludedEmails.filter(item => 
    item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.reason?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Excluded Emails</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search exclusions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-4 py-2 border rounded-md text-sm"
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="email"
          placeholder="Email address to exclude"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          className="flex-1 rounded-md border-gray-300"
          required
        />
        <input
          type="text"
          placeholder="Reason (optional)"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="flex-1 rounded-md border-gray-300"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add
        </button>
      </form>

      <div className="bg-white rounded-lg border divide-y">
        {filteredEmails.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No excluded emails found
          </div>
        ) : (
          filteredEmails.map((item) => (
            <div key={item.id} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Ban className="w-5 h-5 text-red-500" />
                <div>
                  <p className="font-medium text-gray-900">{item.email}</p>
                  {item.reason && (
                    <p className="text-sm text-gray-500">{item.reason}</p>
                  )}
                  <p className="text-xs text-gray-400">
                    Added {new Date(item.addedAt).toLocaleDateString()} by {item.addedBy}
                  </p>
                </div>
              </div>
              <button
                onClick={() => onRemove(item.id)}
                className="text-gray-400 hover:text-red-500"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}