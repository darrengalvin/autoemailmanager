'use client';

import { Mail } from 'lucide-react';

export function DraftsHeader() {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-gray-800">Drafts</h1>
      <button className="btn-primary flex items-center gap-2">
        <Mail className="w-4 h-4" />
        New Draft
      </button>
    </div>
  );
}