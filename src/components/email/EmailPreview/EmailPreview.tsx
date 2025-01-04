'use client';

import { useState } from 'react';
import { X, Bot, ThumbsUp, ThumbsDown, Edit2, Paperclip, Tag, AlertCircle } from 'lucide-react';
import { Email } from '@/types';
import { formatEmailTime } from '@/utils/dateUtils';
import { EmailThread } from './EmailThread';
import { AIFeedbackForm } from '../AIFeedback/AIFeedbackForm';
import { AIReasoningDisplay } from '../AIFeedback/AIReasoningDisplay';

interface EmailPreviewProps {
  email: Email | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove?: () => void;
  onReject?: () => void;
  onEdit?: () => void;
}

export function EmailPreview({ email, isOpen, onClose, onApprove, onReject, onEdit }: EmailPreviewProps) {
  const [showThread, setShowThread] = useState(true);

  if (!isOpen || !email) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-end">
      <div className="w-full max-w-4xl bg-white h-full overflow-auto animate-slide-left">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
              <div>
                <h2 className="font-medium text-gray-900">{email.subject}</h2>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>{email.from}</span>
                  <span>•</span>
                  <span>{formatEmailTime(email.timestamp)}</span>
                </div>
              </div>
            </div>
            {email.aiMetadata?.priority === 'high' && (
              <span className="px-2 py-1 bg-red-100 text-red-600 text-sm rounded-full flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                High Priority
              </span>
            )}
          </div>

          {/* Quick Stats */}
          {email.aiMetadata && (
            <div className="flex divide-x border-t">
              <div className="flex-1 px-4 py-2">
                <span className="text-xs text-gray-500 block">Sentiment</span>
                <span className={`text-sm font-medium ${
                  email.aiMetadata?.sentiment === 'positive' ? 'text-green-600' :
                  email.aiMetadata?.sentiment === 'negative' ? 'text-red-600' :
                  'text-gray-600'
                }`}>
                  {email.aiMetadata?.sentiment ? email.aiMetadata.sentiment.charAt(0).toUpperCase() + email.aiMetadata.sentiment.slice(1) : 'Neutral'}
                </span>
              </div>
              <div className="flex-1 px-4 py-2">
                <span className="text-xs text-gray-500 block">Priority</span>
                <span className={`text-sm font-medium ${
                  email.aiMetadata?.priority === 'high' ? 'text-red-600' :
                  email.aiMetadata?.priority === 'medium' ? 'text-yellow-600' :
                  'text-green-600'
                }`}>
                  {email.aiMetadata?.priority ? email.aiMetadata.priority.toUpperCase() : 'NORMAL'}
                </span>
              </div>
              {email.aiMetadata.category && (
                <div className="flex-1 px-4 py-2">
                  <span className="text-xs text-gray-500 block">Category</span>
                  <span className="text-sm font-medium text-blue-600 flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {email.aiMetadata.category}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="p-6">
          {/* Email Thread */}
          {showThread && email.thread && (
            <EmailThread
              messages={email.thread}
              currentEmailId={email.id}
            />
          )}

          {/* Email Content */}
          <div className="mb-6">
            <div className="prose max-w-none whitespace-pre-wrap">
              {email.body}
            </div>
          </div>

          {/* Attachments */}
          {email.attachments && email.attachments.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Attachments</h3>
              <div className="space-y-2">
                {email.attachments.map((attachment) => (
                  <div key={attachment.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                    <Paperclip className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 flex-1">{attachment.name}</span>
                    <span className="text-xs text-gray-400">({Math.round(attachment.size / 1024)} KB)</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Suggestion */}
          {email.aiSuggestion && (
            <div className="mb-6 bg-blue-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Bot className="w-4 h-4 text-blue-600" />
                <h3 className="font-medium text-blue-600">AI Suggested Response</h3>
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                  {Math.round(email.aiSuggestion.confidence * 100)}% confidence
                </span>
              </div>
              <div className="bg-white/80 p-4 rounded">
                <div className="whitespace-pre-wrap text-gray-900">
                  {email.aiSuggestion.body}
                </div>
                {email.aiSuggestion.reasoning && (
                  <AIReasoningDisplay reasoning={email.aiSuggestion.reasoning} />
                )}
              </div>
              <AIFeedbackForm
                emailId={email.id}
                suggestionId={email.aiSuggestion.id}
                onSubmit={async (feedback) => {
                  // Handle feedback submission
                  console.log('Feedback submitted:', feedback);
                }}
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="sticky bottom-0 bg-white border-t -mx-6 -mb-6 p-4 flex justify-end gap-3">
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
        </div>
      </div>
    </div>
  );
}