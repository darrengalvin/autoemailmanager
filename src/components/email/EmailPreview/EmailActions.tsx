'use client';

import { Ban, ThumbsUp, ThumbsDown, Edit2 } from 'lucide-react';
import { Email } from '@/types';

interface EmailActionsProps {
  email: Email;
  onApprove?: () => void;
  onReject?: () => void;
  onEdit?: () => void;
  onExclude?: () => void;
}

export function EmailActions({ email, onApprove, onReject, onEdit, onExclude }: EmailActionsProps) {
  return (
    <div className="sticky bottom-0 bg-white border-t -mx-6 -mb-6 p-4 flex justify-end gap-3">
      {onExclude && (
        <button
          onClick={onExclude}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md"
          title="Exclude this sender from AI processing"
        >
          <Ban className="w-4 h-4" />
          Exclude Sender
        </button>
      )}
      {onReject && (
        <button
          onClick={onReject}
          className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-md"
        >
          <ThumbsDown className="w-4 h-4" />
          Reject
        </button>
      )}
      {onEdit && (
        <button
          onClick={onEdit}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md"
        >
          <Edit2 className="w-4 h-4" />
          Edit
        </button>
      )}
      {onApprove && (
        <button
          onClick={onApprove}
          className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white hover:bg-green-700 rounded-md"
        >
          <ThumbsUp className="w-4 h-4" />
          Approve & Send
        </button>
      )}
    </div>
  );
}