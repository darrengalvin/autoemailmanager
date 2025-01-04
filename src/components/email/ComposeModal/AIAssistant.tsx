'use client';

import { Bot, Wand, Sparkles, AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface AIAssistantProps {
  onSuggestion: (text: string) => void;
  subject: string;
  tone?: 'formal' | 'casual' | 'friendly';
}

export function AIAssistant({ onSuggestion, subject, tone = 'formal' }: AIAssistantProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const suggestions = [
    { icon: Sparkles, label: 'Make more concise' },
    { icon: Wand, label: 'Improve tone' },
    { icon: Bot, label: 'Generate full response' }
  ];

  const handleSuggestion = async (type: string) => {
    setIsGenerating(true);
    setError(null);
    
    try {
      // Simulate AI response
      await new Promise(resolve => setTimeout(resolve, 1500));
      onSuggestion(`AI-generated response for "${subject}" with ${tone} tone.`);
    } catch (err) {
      setError('Failed to generate suggestion');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="border-l border-gray-200 pl-4 space-y-4">
      <div className="flex items-center gap-2 text-blue-600">
        <Bot className="w-5 h-5" />
        <h3 className="font-medium">AI Writing Assistant</h3>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-2 rounded">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}

      <div className="space-y-2">
        {suggestions.map(({ icon: Icon, label }) => (
          <button
            key={label}
            onClick={() => handleSuggestion(label)}
            disabled={isGenerating}
            className="w-full flex items-center gap-2 p-2 text-sm text-gray-600 hover:bg-gray-50 rounded transition-colors"
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {isGenerating && (
        <div className="flex items-center gap-2 text-blue-600 text-sm">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent" />
          Generating suggestion...
        </div>
      )}
    </div>
  );
}