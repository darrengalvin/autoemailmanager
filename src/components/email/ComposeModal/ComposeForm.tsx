'use client';

import { useState } from 'react';
import { AIAssistant } from './AIAssistant';
import { Paperclip, X } from 'lucide-react';
import { Email } from '@/types';

interface ComposeFormProps {
  onSubmit: (email: Omit<Email, 'id' | 'timestamp' | 'status'>) => void;
  onCancel: () => void;
}

export function ComposeForm({ onSubmit, onCancel }: ComposeFormProps) {
  const [subject, setSubject] = useState('');
  const [to, setTo] = useState('');
  const [body, setBody] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      subject,
      from: 'user@example.com',
      to: to.split(',').map(email => email.trim()),
      body,
      attachments: []
    });
  };

  const handleAISuggestion = (suggestion: string) => {
    setBody(suggestion);
  };

  const handleAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachments(prev => [...prev, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex gap-6">
      <form onSubmit={handleSubmit} className="flex-1 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
          <input
            type="email"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="recipient@example.com"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={12}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        {attachments.length > 0 && (
          <div className="space-y-2">
            {attachments.map((file, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                <Paperclip className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600 flex-1">{file.name}</span>
                <button
                  type="button"
                  onClick={() => removeAttachment(index)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
        
        <div className="flex justify-between items-center pt-4 border-t">
          <div className="flex items-center gap-4">
            <label className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">
              <input
                type="file"
                className="hidden"
                multiple
                onChange={handleAttachment}
              />
              <Paperclip className="w-4 h-4 inline mr-1" />
              Attach files
            </label>
          </div>
          
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      </form>

      <AIAssistant
        subject={subject}
        onSuggestion={handleAISuggestion}
        tone="formal"
      />
    </div>
  );
}