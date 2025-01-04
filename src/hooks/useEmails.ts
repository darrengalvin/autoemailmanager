'use client';

import { useCallback, useState } from 'react';
import { useEmailStore } from '@/store/emailStore';
import { Email } from '@/types';

export function useEmails() {
  const { emails, drafts, addDraft, updateDraft, approveDraft, deleteDraft } = useEmailStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleCreateDraft = useCallback(async (draft: Omit<Email, 'id' | 'timestamp' | 'status'>) => {
    try {
      setLoading(true);
      const newDraft: Email = {
        ...draft,
        id: crypto.randomUUID(),
        timestamp: new Date(),
        status: 'draft'
      };
      
      // Here you would typically save to your backend
      addDraft(newDraft);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create draft'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, [addDraft]);

  const handleUpdateDraft = useCallback(async (id: string, updates: Partial<Email>) => {
    try {
      setLoading(true);
      const draft = drafts.find(d => d.id === id);
      if (!draft) throw new Error('Draft not found');

      const updatedDraft = { ...draft, ...updates };
      updateDraft(id, updatedDraft);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update draft'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, [drafts, updateDraft]);

  return {
    emails,
    drafts,
    loading,
    error,
    createDraft: handleCreateDraft,
    updateDraft: handleUpdateDraft,
    approveDraft,
    deleteDraft,
  };
}