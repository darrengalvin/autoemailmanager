'use client';

import { useState } from 'react';
import { Email } from '@/types';
import { Bot, UserCheck, Clock, AlertCircle, Star, Tag, Paperclip, ChevronDown, ChevronUp } from 'lucide-react';
import { formatEmailTime } from '@/utils/dateUtils';
import { useEmailStore } from '@/store/emailStore';

interface EmailListItemProps {
  email: Email;
  onPreviewClick: () => void;
}

export function EmailListItem({ email, onPreviewClick }: EmailListItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { settings } = useEmailStore();
  const isAutoMode = settings.aiRules?.enabled ?? false;

  const getStatusInfo = () => {
    switch (email.status) {
      case 'ai_pending':
        return {
          icon: Bot,
          color: 'text-blue-500',
          bgColor: 'bg-blue-50',
          badge: 'AI Processing'
        };
      case 'human_pending':
        return {
          icon: Clock,
          color: 'text-yellow-500',
          bgColor: 'bg-yellow-50',
          badge: 'Needs Review'
        };
      case 'approved':
        return {
          icon: UserCheck,
          color: 'text-green-500',
          bgColor: 'bg-green-50',
          badge: 'Approved'
        };
      default:
        return {
          icon: AlertCircle,
          color: 'text-gray-400',
          bgColor: 'bg-gray-50',
          badge: 'New'
        };
    }
  };

  const handleProcess = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Implement manual processing logic here
    console.log('Processing email:', email.id);
  };

  return (
    <div className="group border-b last:border-b-0">
      <div className="flex items-center justify-between p-4">
        {/* Existing email content */}
        <div className="flex-1">
          {/* ... existing content ... */}
        </div>

        {/* Manual Process Button */}
        {!isAutoMode && (email.status === 'ai_pending' || email.status === 'human_pending') && (
          <button
            onClick={handleProcess}
            className="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Bot className="w-4 h-4" />
            Process
          </button>
        )}
      </div>
    </div>
  );
}