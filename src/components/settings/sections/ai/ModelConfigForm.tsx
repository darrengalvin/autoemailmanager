'use client';

import { useState } from 'react';
import { Play, Loader, AlertCircle } from 'lucide-react';
import { ModelConfig } from '@/types';
import { testAIModel } from '@/utils/ai';

interface ModelConfigFormProps {
  modelId: string;
  config: ModelConfig;
  onUpdate: (updates: Partial<ModelConfig>) => void;
  showAdvanced: boolean;
}

export function ModelConfigForm({ modelId, config, onUpdate, showAdvanced }: ModelConfigFormProps) {
  const [isTestingApi, setIsTestingApi] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [testError, setTestError] = useState<string | null>(null);

  const handleTestApi = async () => {
    if (!config.apiKey) {
      setTestError('API key is required');
      return;
    }

    setIsTestingApi(true);
    setTestResult(null);
    setTestError(null);

    try {
      const result = await testAIModel(modelId, config);
      if (result.success) {
        setTestResult('API test successful');
      } else {
        setTestError(result.message);
      }
    } catch (error) {
      setTestError(error instanceof Error ? error.message : 'API test failed');
    } finally {
      setIsTestingApi(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          API Key
        </label>
        <div className="flex gap-2">
          <input
            type="password"
            value={config.apiKey}
            onChange={(e) => onUpdate({ apiKey: e.target.value })}
            className="flex-1 rounded-md"
            placeholder={`Enter ${modelId} API key`}
          />
          <button
            onClick={handleTestApi}
            disabled={isTestingApi || !config.apiKey}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark disabled:opacity-50 flex items-center gap-2"
          >
            {isTestingApi ? (
              <><Loader className="w-4 h-4 animate-spin" /> Testing...</>
            ) : (
              <><Play className="w-4 h-4" /> Test API</>
            )}
          </button>
        </div>
        {testResult && (
          <div className="mt-2 text-sm text-green-600 flex items-center gap-2">
            <Play className="w-4 h-4" />
            {testResult}
          </div>
        )}
        {testError && (
          <div className="mt-2 text-sm text-red-600 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            {testError}
          </div>
        )}
      </div>

      {showAdvanced && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Tokens
            </label>
            <input
              type="number"
              value={config.maxTokens}
              onChange={(e) => onUpdate({ maxTokens: parseInt(e.target.value) })}
              className="w-32 rounded-md"
              min={1}
              max={32000}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Temperature
            </label>
            <input
              type="number"
              value={config.temperature}
              onChange={(e) => onUpdate({ temperature: parseFloat(e.target.value) })}
              className="w-32 rounded-md"
              min={0}
              max={2}
              step={0.1}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              System Prompt
            </label>
            <textarea
              value={config.prompts.systemPrompt}
              onChange={(e) => onUpdate({
                prompts: { ...config.prompts, systemPrompt: e.target.value }
              })}
              rows={4}
              className="w-full rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Instructions
            </label>
            <textarea
              value={config.prompts.additionalInstructions}
              onChange={(e) => onUpdate({
                prompts: { ...config.prompts, additionalInstructions: e.target.value }
              })}
              rows={2}
              className="w-full rounded-md"
            />
          </div>
        </>
      )}
    </div>
  );
}