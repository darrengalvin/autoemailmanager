'use client';

import { useState } from 'react';
import { Bot, Zap, Code, AlertCircle, Play, Loader } from 'lucide-react';
import { testAIModel } from '@/utils/ai';

interface ModelConfig {
  enabled: boolean;
  apiKey: string;
  endpoint?: string;
  maxTokens: number;
  temperature: number;
  prompts: {
    systemPrompt: string;
    additionalInstructions: string;
  };
}

const defaultPrompts = {
  systemPrompt: `You are an AI assistant helping with email management. Your role is to:
1. Analyze incoming emails for intent and priority
2. Generate appropriate responses
3. Maintain professional communication standards
4. Consider context from previous interactions`,
  additionalInstructions: 'Ensure responses are concise and actionable.'
};

interface AIModelSettingsProps {
  models: Record<string, ModelConfig>;
  defaultModel: string;
  onUpdate: (models: Record<string, ModelConfig>, defaultModel?: string) => void;
}

export function AIModelSettings({ models = {}, defaultModel = 'anthropic', onUpdate }: AIModelSettingsProps) {
  const [activeTab, setActiveTab] = useState<string>(defaultModel);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isTestingApi, setIsTestingApi] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  const handleModelUpdate = (modelId: string, updates: Partial<ModelConfig>) => {
    const updatedModels = {
      ...models,
      [modelId]: { ...models[modelId], ...updates }
    };
    onUpdate(updatedModels);
  };

  const handleTestApi = async (modelId: string) => {
    setIsTestingApi(true);
    setTestResult(null);
    try {
      const result = await testAIModel(modelId, models[modelId]);
      setTestResult('API test successful');
    } catch (error) {
      setTestResult(error instanceof Error ? error.message : 'API test failed');
    } finally {
      setIsTestingApi(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Model Tabs */}
      <div className="flex gap-2">
        {Object.entries(models).map(([id, model]) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
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

      {/* Active Model Settings */}
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

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                API Key
              </label>
              <div className="flex gap-2">
                <input
                  type="password"
                  value={models[activeTab].apiKey}
                  onChange={(e) => handleModelUpdate(activeTab, { apiKey: e.target.value })}
                  className="flex-1 rounded-md"
                  placeholder={`Enter ${activeTab} API key`}
                />
                <button
                  onClick={() => handleTestApi(activeTab)}
                  disabled={isTestingApi || !models[activeTab].apiKey}
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
                <div className={`mt-2 text-sm ${
                  testResult.includes('successful') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {testResult}
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
                    value={models[activeTab].maxTokens}
                    onChange={(e) => handleModelUpdate(activeTab, { maxTokens: parseInt(e.target.value) })}
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
                    value={models[activeTab].temperature}
                    onChange={(e) => handleModelUpdate(activeTab, { temperature: parseFloat(e.target.value) })}
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
                    value={models[activeTab].prompts.systemPrompt}
                    onChange={(e) => handleModelUpdate(activeTab, {
                      prompts: { ...models[activeTab].prompts, systemPrompt: e.target.value }
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
                    value={models[activeTab].prompts.additionalInstructions}
                    onChange={(e) => handleModelUpdate(activeTab, {
                      prompts: { ...models[activeTab].prompts, additionalInstructions: e.target.value }
                    })}
                    rows={2}
                    className="w-full rounded-md"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}