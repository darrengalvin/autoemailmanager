'use client';

import { useState } from 'react';
import { ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';
import { FeedbackRating } from './FeedbackRating';

interface AIFeedbackFormProps {
  emailId: string;
  suggestionId: string;
  onSubmit: (feedback: AIFeedback) => Promise<void>;
}

interface AIFeedback {
  emailId: string;
  suggestionId: string;
  rating: number;
  helpful: boolean;
  comment?: string;
}

export function AIFeedbackForm({ emailId, suggestionId, onSubmit }: AIFeedbackFormProps) {
  const [rating, setRating] = useState(0);
  const [helpful, setHelpful] = useState<boolean | null>(null);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (helpful === null) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit({
        emailId,
        suggestionId,
        rating,
        helpful,
        comment: comment.trim() || undefined
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4 border-t pt-4">
      <h4 className="text-sm font-medium text-gray-900">Was this AI response helpful?</h4>
      
      <div className="flex items-center gap-4">
        <button
          onClick={() => setHelpful(true)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm ${
            helpful === true
              ? 'bg-green-100 text-green-700'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <ThumbsUp className="w-4 h-4" />
          Yes
        </button>
        
        <button
          onClick={() => setHelpful(false)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm ${
            helpful === false
              ? 'bg-red-100 text-red-700'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <ThumbsDown className="w-4 h-4" />
          No
        </button>
      </div>

      {helpful !== null && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rate the response quality
            </label>
            <FeedbackRating value={rating} onChange={setRating} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional feedback (optional)
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-md"
                placeholder="What could be improved?"
                rows={3}
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </>
      )}
    </div>
  );
}