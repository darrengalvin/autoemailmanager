'use client';

import { formatEmailTime } from '@/utils/dateUtils';
import { Paperclip } from 'lucide-react';

interface ThreadMessage {
  id: string;
  from: string;
  to: string[];
  subject: string;
  body: string;
  timestamp: Date;
  attachments?: Array<{
    id: string;
    name: string;
    size: number;
  }>;
}

interface EmailThreadProps {
  messages: ThreadMessage[];
  currentEmailId: string;
}

export function EmailThread({ messages, currentEmailId }: EmailThreadProps) {
  // Sort messages by date, oldest first
  const sortedMessages = [...messages].sort((a, b) => 
    a.timestamp.getTime() - b.timestamp.getTime()
  );

  return (
    <div className="space-y-6 mb-8">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <div className="w-px h-4 bg-gray-300" />
        <span>{messages.length} messages in thread</span>
      </div>

      {sortedMessages.map((message, index) => (
        <div 
          key={message.id}
          className={`relative pl-4 ${
            message.id === currentEmailId 
              ? 'bg-blue-50 border border-blue-100 rounded-lg p-4'
              : 'pl-8'
          }`}
        >
          {/* Thread line */}
          {index < sortedMessages.length - 1 && (
            <div className="absolute left-4 top-8 bottom-0 w-px bg-gray-200" />
          )}

          {/* Message dot */}
          <div className={`absolute left-2 top-6 w-4 h-4 rounded-full ${
            message.id === currentEmailId
              ? 'bg-blue-500'
              : 'bg-gray-300'
          }`} />

          <div className="space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-medium text-gray-900">{message.from}</span>
                <div className="text-sm text-gray-500">
                  To: {message.to.join(', ')}
                </div>
              </div>
              <span className="text-sm text-gray-500">
                {formatEmailTime(message.timestamp)}
              </span>
            </div>
            
            <div className="text-gray-700 whitespace-pre-wrap">
              {message.body}
            </div>

            {message.attachments && message.attachments.length > 0 && (
              <div className="mt-3 pt-3 border-t space-y-2">
                {message.attachments.map(attachment => (
                  <div 
                    key={attachment.id}
                    className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded"
                  >
                    <Paperclip className="w-4 h-4 text-gray-400" />
                    <span>{attachment.name}</span>
                    <span className="text-gray-400">
                      ({Math.round(attachment.size / 1024)} KB)
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}