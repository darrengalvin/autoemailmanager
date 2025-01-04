'use client';

import { Bot, BookOpen, Zap, FileText } from 'lucide-react';

interface AIReasoningDisplayProps {
  reasoning: string | {
    explanation: string;
    sources?: Array<{
      id: string;
      name: string;
      relevance: number;
      excerpt: string;
    }>;
    embeddings?: Array<{
      id: string;
      text: string;
      similarity: number;
    }>;
    confidence: number;
  };
}

export function AIReasoningDisplay({ reasoning }: AIReasoningDisplayProps) {
  // Handle string reasoning (simple case)
  if (typeof reasoning === 'string') {
    return (
      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-center gap-2 text-blue-700 mb-2">
          <Bot className="w-5 h-5" />
          <h3 className="font-medium">AI Reasoning</h3>
        </div>
        <p className="text-sm text-blue-700">{reasoning}</p>
      </div>
    );
  }

  // Handle structured reasoning
  return (
    <div className="space-y-4 bg-blue-50 p-4 rounded-lg">
      <div className="flex items-center gap-2 text-blue-700">
        <Bot className="w-5 h-5" />
        <h3 className="font-medium">AI Reasoning Details</h3>
      </div>

      <div className="space-y-4">
        {/* Main Reasoning */}
        <div>
          <h4 className="text-sm font-medium text-blue-900 mb-2">Explanation</h4>
          <p className="text-sm text-blue-700">{reasoning.explanation}</p>
        </div>

        {/* Sources Used */}
        {reasoning.sources && reasoning.sources.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4 text-blue-700" />
              <h4 className="text-sm font-medium text-blue-900">Sources Used</h4>
            </div>
            <div className="space-y-2">
              {reasoning.sources.map((source) => (
                <div key={source.id} className="bg-white/60 p-3 rounded-md">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm text-blue-900">{source.name}</span>
                    <span className="text-xs text-blue-600">
                      {Math.round(source.relevance * 100)}% relevant
                    </span>
                  </div>
                  <p className="text-sm text-blue-700">{source.excerpt}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key Embeddings */}
        {reasoning.embeddings && reasoning.embeddings.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-blue-700" />
              <h4 className="text-sm font-medium text-blue-900">Key Embeddings</h4>
            </div>
            <div className="space-y-1">
              {reasoning.embeddings.map((embedding) => (
                <div 
                  key={embedding.id}
                  className="flex items-center justify-between text-sm p-2 bg-white/60 rounded"
                >
                  <span className="text-blue-700">{embedding.text}</span>
                  <span className="text-xs text-blue-600">
                    {Math.round(embedding.similarity * 100)}% match
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Confidence Score */}
        <div className="flex items-center gap-3 p-3 bg-white/60 rounded-md">
          <FileText className="w-5 h-5 text-blue-600" />
          <div>
            <h4 className="text-sm font-medium text-blue-900">Confidence Score</h4>
            <p className="text-sm text-blue-700">
              {Math.round(reasoning.confidence * 100)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}