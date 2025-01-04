'use client';

import { useState } from 'react';
import { ModelConfig } from '@/types';
import { availableModels } from '@/utils/ai/models';
import { AIModelSettings } from './AIModelSettings';

interface AIModelsTabProps {
  models: Record<string, ModelConfig>;
  defaultModel: string;
  onUpdate: (models: Record<string, ModelConfig>, defaultModel?: string) => void;
}

export function AIModelsTab({ models = {}, defaultModel = 'anthropic', onUpdate }: AIModelsTabProps) {
  const handleModelUpdate = (modelId: string, updates: Partial<ModelConfig>) => {
    const updatedModels = {
      ...models,
      [modelId]: { 
        ...(models[modelId] || availableModels[modelId].defaultConfig),
        ...updates
      }
    };
    onUpdate(updatedModels);
  };

  return (
    <div className="space-y-6">
      {/* Available Models */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-blue-900 mb-2">Available Models</h3>
        <div className="grid gap-3">
          {Object.entries(availableModels).map(([id, { name, description }]) => (
            <div key={id} className="flex items-center justify-between">
              <div>
                <span className="font-medium text-blue-900">{name}</span>
                <p className="text-sm text-blue-700">{description}</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={models[id]?.enabled ?? false}
                  onChange={(e) => handleModelUpdate(id, { enabled: e.target.checked })}
                  className="rounded text-primary focus:ring-primary"
                />
                <span className="text-sm text-blue-700">
                  {models[id]?.enabled ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Model Settings */}
      <AIModelSettings
        models={models}
        defaultModel={defaultModel}
        onUpdate={onUpdate}
      />
    </div>
  );
}