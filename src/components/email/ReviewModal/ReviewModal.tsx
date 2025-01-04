'use client';

import { useState } from 'react';
import { X, Check, Edit2, Send } from 'lucide-react';
import { Email } from '@/types';
import { useEmailStore } from '@/store/emailStore';

interface ReviewModalProps {
  email: Email;
  isOpen: boolean;
  onClose: () => void;
}

export function ReviewModal({ email, isOpen, onClose }: ReviewModalProps) {
  const [editedBody, setEditedBody] = useState(email.body);
  const [isEditing, setIsEditing] = useState(false);
  const { updateDraft, approveDraft } = useEmailStore();

  if (!isOpen) return null;

  const handleApprove = () => {
    if (email.status === 'draft') {
      approveDraft(email.id);
    }
    onClose();
  };

  const handleEdit = () => {
    updateDraft(email.id, { ...email, body: editedBody });
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-3xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Review Email</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">To</label>
            <div className="mt-1 p-2 bg-gray-50 rounded-md">
              {email.to.join(', ')}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Subject</label>
            <div className="mt-1 p-2 bg-gray-50 rounded-md">
              {email.subject}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            {isEditing ? (
              <textarea
                value={editedBody}
                onChange={(e) => setEditedBody(e.target.value)}
                rows={8}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              />
            ) : (
              <div className="mt-1 p-2 bg-gray-50 rounded-md whitespace-pre-wrap">
                {editedBody}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={handleEdit}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                Save Changes
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 flex items-center gap-2"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={handleApprove}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                {email.status === 'draft' ? 'Approve & Send' : 'Send Now'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}