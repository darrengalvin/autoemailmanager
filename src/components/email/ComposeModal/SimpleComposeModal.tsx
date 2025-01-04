'use client';

import { useState } from 'react';
import { X, Send, Bot, Edit2, Paperclip, Trash2 } from 'lucide-react';
import { useEmailStore } from '@/store/emailStore';

interface SimpleComposeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SimpleComposeModal({ isOpen, onClose }: SimpleComposeModalProps) {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const { addDraft } = useEmailStore();

  const handleGetAIResponse = async () => {
    if (!subject) return;
    
    setIsGenerating(true);
    try {
      // Simulate AI response generation
      await new Promise(resolve => setTimeout(resolve, 1500));
      const response = `Dear ${to},

I hope this email finds you well. I am writing regarding "${subject}".

[AI-generated response based on your request]

Best regards,
[Your Name]`;
      
      setAiResponse(response);
      setBody(response);
      setShowPreview(true);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachments(prev => [...prev, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSend = () => {
    addDraft({
      id: crypto.randomUUID(),
      subject,
      from: 'user@example.com',
      to: to.split(',').map(email => email.trim()),
      body,
      attachments: attachments.map(file => ({
        id: crypto.randomUUID(),
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file)
      })),
      timestamp: new Date(),
      status: 'draft',
      aiSuggestion: aiResponse ? {
        body: aiResponse,
        confidence: 0.85,
        reasoning: 'Generated based on subject and context',
        id: crypto.randomUUID()
      } : undefined
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Compose Email</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {!showPreview ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                <input
                  type="email"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="w-full rounded-md"
                  placeholder="recipient@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full rounded-md"
                  placeholder="Enter subject"
                />
              </div>

              <div className="flex justify-center gap-4">
                <button
                  onClick={handleGetAIResponse}
                  disabled={isGenerating || !subject}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark disabled:opacity-50"
                >
                  <Bot className="w-4 h-4" />
                  {isGenerating ? 'Generating...' : 'Get AI Response'}
                </button>

                <button
                  onClick={() => setShowPreview(true)}
                  className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50"
                >
                  <Edit2 className="w-4 h-4" />
                  Write Manually
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  rows={12}
                  className="w-full rounded-md"
                />
              </div>

              {/* Attachments */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Attachments
                </label>
                <div className="space-y-2">
                  {attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center gap-2">
                        <Paperclip className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{file.name}</span>
                        <span className="text-xs text-gray-400">
                          ({Math.round(file.size / 1024)} KB)
                        </span>
                      </div>
                      <button
                        onClick={() => removeAttachment(index)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <label className="mt-2 cursor-pointer inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                  <Paperclip className="w-4 h-4" />
                  Add Attachment
                  <input
                    type="file"
                    className="hidden"
                    multiple
                    onChange={handleAttachment}
                  />
                </label>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowPreview(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900"
                >
                  Back
                </button>
                <button
                  onClick={handleSend}
                  disabled={!body.trim()}
                  className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  Send
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}