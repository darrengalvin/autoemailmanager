'use client';

import { Star } from 'lucide-react';

interface FeedbackRatingProps {
  value: number;
  onChange: (rating: number) => void;
}

export function FeedbackRating({ value, onChange }: FeedbackRatingProps) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((rating) => (
        <button
          key={rating}
          onClick={() => onChange(rating)}
          className="focus:outline-none"
        >
          <Star
            className={`w-5 h-5 ${
              rating <= value
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        </button>
      ))}
    </div>
  );
}