import { create } from 'zustand';
import { Email, EmailSettings } from '../types';
import { createContext, PropsWithChildren } from 'react';

interface EmailStore {
  emails: Email[];
  drafts: Email[];
  settings: EmailSettings;
  setEmails: (emails: Email[]) => void;
  addDraft: (draft: Email) => void;
  updateDraft: (id: string, draft: Email) => void;
  approveDraft: (id: string) => void;
  deleteDraft: (id: string) => void;
  updateSettings: (settings: EmailSettings) => void;
}

export const useEmailStore = create<EmailStore>((set) => ({
  emails: [],
  drafts: [],
  settings: {
    tone: 'formal',
    language: 'en',
    signature: '',
    replyDelay: 0,
    excludedEmails: [],
    branding: {
      logoUrl: null,
      primaryColor: '#014380',
      secondaryColor: '#014584',
      companyName: '',
      emailSignature: ''
    },
    aiRules: {
      enabled: false,
      allowedSenders: [],
      excludedSenders: [],
      keywords: [],
      maxTokensPerEmail: 2000,
      monthlyTokenBudget: 100000,
      processRules: {
        processAll: true,
        processFromList: false,
        processWithKeywords: false
      }
    },
    tokenUsage: {
      currentMonthTokens: 0,
      monthlyLimit: 100000,
      costPerThousandTokens: 0.02
    },
    models: {
      anthropic: {
        enabled: true,
        apiKey: '',
        maxTokens: 2000,
        temperature: 0.7,
        prompts: {
          systemPrompt: '',
          additionalInstructions: ''
        }
      }
    },
    defaultModel: 'anthropic'
  },
  setEmails: (emails) => set({ emails }),
  addDraft: (draft) =>
    set((state) => ({ drafts: [...state.drafts, draft] })),
  updateDraft: (id, draft) =>
    set((state) => ({
      drafts: state.drafts.map((d) => (d.id === id ? draft : d)),
    })),
  approveDraft: (id) =>
    set((state) => ({
      drafts: state.drafts.filter((d) => d.id !== id),
      emails: [...state.emails, state.drafts.find((d) => d.id === id)!],
    })),
  deleteDraft: (id) =>
    set((state) => ({
      drafts: state.drafts.filter((d) => d.id !== id),
    })),
  updateSettings: (settings) => set({ settings }),
}));

export const EmailContext = createContext<ReturnType<typeof useEmailStore> | null>(null);

export function EmailStoreProvider({ children }: PropsWithChildren) {
  const store = useEmailStore();
  return <EmailContext.Provider value={store}>{children}</EmailContext.Provider>;
}