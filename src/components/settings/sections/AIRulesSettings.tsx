'use client';

import { useState } from 'react';
import { Bot, Plus, Trash2, AlertCircle } from 'lucide-react';
import { AIProcessingRules } from '@/types';

interface AIRulesSettingsProps {
  rules: AIProcessingRules;
  onUpdate: (rules: Partial<AIProcessingRules>) => void;
}

export function AIRulesSettings({ rules, onUpdate }: AIRulesSettingsProps) {
  const [newSender, setNewSender] = useState('');
  const [newKeyword, setNewKeyword] = useState('');

  const handleAddSender = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSender) {
      onUpdate({
        allowedSenders: [...rules.allowedSenders, newSender]
      });
      setNewSender('');
    }
  };

  const handleAddKeyword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newKeyword) {
      onUpdate({
        keywords: [...rules.keywords, newKeyword]
      });
      setNewKeyword('');
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">AI Processing Rules</h2>
        
        <div className="space-y-6">
          {/* Enable/Disable AI Processing */}
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-900">Enable AI Processing</label>
              <p className="text-sm text-gray-500">Allow AI to process incoming emails</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={rules.enabled}
                onChange={(e) => onUpdate({ enabled: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {/* Processing Rules */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-900">Processing Mode</label>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={rules.processRules.processAll}
                  onChange={() => onUpdate({
                    processRules: { ...rules.processRules, processAll: true }
                  })}
                  className="text-blue-600"
                />
                <span className="text-sm text-gray-700">Process all emails</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={rules.processRules.processFromList}
                  onChange={() => onUpdate({
                    processRules: { ...rules.processRules, processFromList: true, processAll: false }
                  })}
                  className="text-blue-600"
                />
                <span className="text-sm text-gray-700">Process emails from allowed senders only</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={rules.processRules.processWithKeywords}
                  onChange={() => onUpdate({
                    processRules: { ...rules.processRules, processWithKeywords: true, processAll: false }
                  })}
                  className="text-blue-600"
                />
                <span className="text-sm text-gray-700">Process emails containing specific keywords</span>
              </label>
            </div>
          </div>

          {/* Token Limits */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Maximum Tokens per Email
              </label>
              <input
                type="number"
                value={rules.maxTokensPerEmail}
                onChange={(e) => onUpdate({ maxTokensPerEmail: parseInt(e.target.value) })}
                className="w-full rounded-md border-gray-300"
                min={0}
                step={100}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Monthly Token Budget
              </label>
              <input
                type="number"
                value={rules.monthlyTokenBudget}
                onChange={(e) => onUpdate({ monthlyTokenBudget: parseInt(e.target.value) })}
                className="w-full rounded-md border-gray-300"
                min={0}
                step={1000}
              />
            </div>
          </div>

          {/* Allowed Senders */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Allowed Senders
            </label>
            <form onSubmit={handleAddSender} className="flex gap-2 mb-2">
              <input
                type="email"
                placeholder="Enter email address"
                value={newSender}
                onChange={(e) => setNewSender(e.target.value)}
                className="flex-1 rounded-md border-gray-300"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Plus className="w-4 h-4" />
              </button>
            </form>
            <div className="space-y-2">
              {rules.allowedSenders.map((sender, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                  <span className="text-sm text-gray-600">{sender}</span>
                  <button
                    onClick={() => onUpdate({
                      allowedSenders: rules.allowedSenders.filter((_, i) => i !== index)
                    })}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Keywords */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Keywords
            </label>
            <form onSubmit={handleAddKeyword} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Enter keyword"
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                className="flex-1 rounded-md border-gray-300"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Plus className="w-4 h-4" />
              </button>
            </form>
            <div className="space-y-2">
              {rules.keywords.map((keyword, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                  <span className="text-sm text-gray-600">{keyword}</span>
                  <button
                    onClick={() => onUpdate({
                      keywords: rules.keywords.filter((_, i) => i !== index)
                    })}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}