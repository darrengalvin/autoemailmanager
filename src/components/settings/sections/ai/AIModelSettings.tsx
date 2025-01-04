'use client';

import { useState } from 'react';
import { ModelConfig } from '@/types';
import { AIModelTabs } from './AIModelTabs';
import { ModelConfigForm } from './ModelConfigForm';

interface AIModelSettingsProps {
  models: Record<string, ModelConfig>;
  defaultModel: string;
  onUpdate: (models: Record<string, ModelConfig>, defaultModel?: string) => void;
}

export function AIModelSettings({ models = {}, defaultModel = 'anthropic', onUpdate }: AIModelSettingsProps) {
  const [activeTab, setActiveTab] = useState<string>(defaultModel);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleModelUpdate = (modelId: string, updates: Partial<ModelConfig>) => {
    const updatedModels = {
      ...models,
      [modelId]: { ...models[modelId], ...updates }
    };
    onUpdate(updatedModels);
  };

  return (
    <div className="space-y-6">
      <AIModelTabs
        models={models}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {activeTab && models[activeTab] && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={models[activeTab].enabled}
                onChange={(e) => handleModelUpdate(activeTab, { enabled: e.target.checked })}
                className="rounded text-primary focus:ring-primary"
              />
              <label className="text-sm font-medium text-gray-900">
                Enable {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </label>
            </div>
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-sm text-primary hover:text-primary-dark"
            >
              {showAdvanced ? 'Hide Advanced' : 'Show Advanced'}
            </button>
          </div>

          <ModelConfigForm
            modelId={activeTab}
            config={models[activeTab]}
            onUpdate={(updates) => handleModelUpdate(activeTab, updates)}
            showAdvanced={showAdvanced}
          />
        </div>
      )}
    </div>
  );
}