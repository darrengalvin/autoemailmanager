'use client';

import { Mail } from 'lucide-react';

interface EmailHeaderProps {
  title: string;
  onCompose: () => void;
}

export function EmailHeader({ title, onCompose }: EmailHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      <div className="flex gap-4">
        <button onClick={onCompose} className="btn-primary flex items-center gap-2">
          <Mail className="w-4 h-4" />
          Compose
        </button>
      </div>
    </div>
  );
}