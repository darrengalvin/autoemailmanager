'use client';

import { ModelConfig } from '@/types';

interface AIModelTabsProps {
  models: Record<string, ModelConfig>;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function AIModelTabs({ models, activeTab, onTabChange }: AIModelTabsProps) {
  return (
    <div className="flex gap-2">
      {Object.entries(models).map(([id]) => (
        <button
          key={id}
          onClick={() => onTabChange(id)}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            activeTab === id
              ? 'bg-primary text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {id.charAt(0).toUpperCase() + id.slice(1)}
        </button>
      ))}
    </div>
  );
}