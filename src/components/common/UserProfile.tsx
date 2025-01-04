'use client';

import { User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export function UserProfile() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
      <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center">
        <User className="w-4 h-4" />
      </div>
      <span className="text-sm font-medium">
        {user.email || 'Demo User'}
      </span>
    </div>
  );
}