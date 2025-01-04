import { AITestResult } from '@/types/ai';

export async function testAIModel(model: string, config: any): Promise<AITestResult> {
  if (!config.apiKey) {
    return {
      success: false,
      message: 'API key is required'
    };
  }

  try {
    const response = await fetch('/api/ai/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        config,
        testInput: config.prompts.systemPrompt
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'API test failed');
    }

    const data = await response.json();
    return {
      success: true,
      message: 'API test successful',
      response: data.response
    };
  } catch (error) {
    console.error('AI test failed:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'API test failed'
    };
  }
}