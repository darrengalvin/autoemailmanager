'use client';

import { Bot, UserCheck, Clock } from 'lucide-react';
import { useEmailStore } from '@/store/emailStore';

export function EmailStats() {
  const { emails } = useEmailStore();
  
  const stats = {
    aiHandled: emails.filter(e => e.status === 'ai_pending').length,
    needsReview: emails.filter(e => e.status === 'human_pending').length,
    approved: emails.filter(e => e.status === 'approved').length,
  };

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-blue-50 rounded-lg p-4">
        <div className="flex items-center gap-2 text-blue-600">
          <Bot className="w-5 h-5" />
          <h3 className="font-medium">AI Processing</h3>
        </div>
        <p className="text-2xl font-bold text-blue-700 mt-2">{stats.aiHandled}</p>
      </div>
      
      <div className="bg-yellow-50 rounded-lg p-4">
        <div className="flex items-center gap-2 text-yellow-600">
          <Clock className="w-5 h-5" />
          <h3 className="font-medium">Needs Review</h3>
        </div>
        <p className="text-2xl font-bold text-yellow-700 mt-2">{stats.needsReview}</p>
      </div>
      
      <div className="bg-green-50 rounded-lg p-4">
        <div className="flex items-center gap-2 text-green-600">
          <UserCheck className="w-5 h-5" />
          <h3 className="font-medium">Approved</h3>
        </div>
        <p className="text-2xl font-bold text-green-700 mt-2">{stats.approved}</p>
      </div>
    </div>
  );
}