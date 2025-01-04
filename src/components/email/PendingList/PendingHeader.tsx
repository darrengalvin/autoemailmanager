'use client';

import { Clock } from 'lucide-react';

export function PendingHeader() {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold text-gray-800">Pending Review</h1>
        <Clock className="w-5 h-5 text-gray-500" />
      </div>
    </div>
  );
}