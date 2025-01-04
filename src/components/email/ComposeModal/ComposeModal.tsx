'use client';

import { X } from 'lucide-react';
import { ComposeForm } from './ComposeForm';
import { useEmailStore } from '@/store/emailStore';

interface ComposeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ComposeModal({ isOpen, onClose }: ComposeModalProps) {
  const { addDraft } = useEmailStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-4xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Compose Email</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <ComposeForm
          onSubmit={(email) => {
            addDraft({
              ...email,
              id: crypto.randomUUID(),
              timestamp: new Date(),
              status: 'draft'
            });
            onClose();
          }}
          onCancel={onClose}
        />
      </div>
    </div>
  );
}