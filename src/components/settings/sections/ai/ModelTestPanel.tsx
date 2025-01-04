'use client';

import { useState } from 'react';
import { Play, Loader, AlertCircle } from 'lucide-react';
import { ModelConfig } from '@/types';
import { testAIModel } from '@/utils/ai';

interface ModelTestPanelProps {
  modelId: string;
  config: ModelConfig;
}

export function ModelTestPanel({ modelId, config }: ModelTestPanelProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [testInput, setTestInput] = useState('');
  const [result, setResult] = useState<{
    success: boolean;
    response?: string;
    error?: string;
  } | null>(null);

  const handleTest = async () => {
    if (!testInput.trim()) return;

    setIsLoading(true);
    setResult(null);

    try {
      const response = await testAIModel(modelId, {
        ...config,
        testInput: testInput.trim()
      });
      setResult({
        success: true,
        response: response.response || 'Test completed successfully'
      });
    } catch (error) {
      setResult({
        success: false,
        error: error instanceof Error ? error.message : 'Test failed'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="text-sm font-medium text-gray-900 mb-4">Test Model</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Test Input
          </label>
          <textarea
            value={testInput}
            onChange={(e) => setTestInput(e.target.value)}
            placeholder="Enter test prompt..."
            rows={4}
            className="w-full rounded-md"
          />
        </div>

        <button
          onClick={handleTest}
          disabled={isLoading || !testInput.trim()}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark disabled:opacity-50"
        >
          {isLoading ? (
            <><Loader className="w-4 h-4 animate-spin" /> Testing...</>
          ) : (
            <><Play className="w-4 h-4" /> Run Test</>
          )}
        </button>

        {result && (
          <div className={`mt-4 p-4 rounded-lg ${
            result.success ? 'bg-green-50' : 'bg-red-50'
          }`}>
            {result.success ? (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-green-800">Test Successful</h4>
                <pre className="text-sm text-green-700 whitespace-pre-wrap">
                  {result.response}
                </pre>
              </div>
            ) : (
              <div className="flex items-start gap-2 text-red-800">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Test Failed</h4>
                  <p className="text-sm mt-1">{result.error}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}