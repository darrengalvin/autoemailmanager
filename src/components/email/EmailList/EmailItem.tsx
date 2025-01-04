'use client';

import { Email } from '@/types';
import { Bot, UserCheck, Clock, AlertCircle, Star, Tag, Paperclip } from 'lucide-react';
import { formatEmailTime } from '@/utils/dateUtils';

interface EmailItemProps {
  email: Email;
  onClick?: () => void;
}

export function EmailItem({ email, onClick }: EmailItemProps) {
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

  const { icon: StatusIcon, color, bgColor, badge } = getStatusInfo();
  const priority = email.aiMetadata?.priority;

  return (
    <div
      onClick={onClick}
      className={`group p-6 hover:bg-gray-50 cursor-pointer transition-all duration-200 border-l-4 ${
        priority === 'high' ? 'border-red-500' :
        priority === 'medium' ? 'border-yellow-500' :
        'border-transparent'
      }`}
    >
      <div className="flex gap-4">
        <div className={`flex-shrink-0 ${bgColor} p-2 rounded-lg transition-transform group-hover:scale-105`}>
          <StatusIcon className={`w-5 h-5 ${color}`} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-medium text-gray-900 text-lg">{email.subject}</h3>
            <span className={`px-2 py-0.5 text-xs rounded-full ${bgColor} ${color}`}>
              {badge}
            </span>
            {email.aiMetadata?.sentiment && (
              <span className={`px-2 py-0.5 text-xs rounded-full ${
                email.aiMetadata.sentiment === 'positive' ? 'bg-green-100 text-green-600' :
                email.aiMetadata.sentiment === 'negative' ? 'bg-red-100 text-red-600' :
                'bg-gray-100 text-gray-600'
              }`}>
                {email.aiMetadata.sentiment}
              </span>
            )}
            {email.attachments && email.attachments.length > 0 && (
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <Paperclip className="w-3 h-3" />
                {email.attachments.length}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <span className="font-medium">{email.from}</span>
            <span>•</span>
            <span>{formatEmailTime(email.timestamp)}</span>
            {email.aiMetadata?.category && (
              <>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  {email.aiMetadata.category}
                </span>
              </>
            )}
          </div>

          <div className="space-y-2">
            <p className="text-gray-600 line-clamp-2">{email.body}</p>

            {email.aiSuggestion && (
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full">
                  <Bot className="w-4 h-4" />
                  <span>AI response ready • {Math.round(email.aiSuggestion.confidence * 100)}% confidence</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-1 hover:bg-gray-100 rounded">
            <Star className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
}