import { ModelConfig } from '@/types';

export const availableModels: Record<string, {
  name: string;
  description: string;
  defaultConfig: ModelConfig;
}> = {
  anthropic: {
    name: 'Anthropic Claude',
    description: 'Advanced language model with strong reasoning capabilities',
    defaultConfig: {
      enabled: true,
      apiKey: '',
      maxTokens: 2000,
      temperature: 0.7,
      prompts: {
        systemPrompt: 'You are an AI assistant helping with email management.',
        additionalInstructions: ''
      }
    }
  },
  openai: {
    name: 'OpenAI GPT-4',
    description: 'Latest GPT model with enhanced capabilities',
    defaultConfig: {
      enabled: false,
      apiKey: '',
      maxTokens: 2000,
      temperature: 0.7,
      prompts: {
        systemPrompt: 'You are an AI assistant helping with email management.',
        additionalInstructions: ''
      }
    }
  },
  deepseek: {
    name: 'DeepSeek',
    description: 'Advanced AI model for complex tasks',
    defaultConfig: {
      enabled: false,
      apiKey: '',
      maxTokens: 2000,
      temperature: 0.7,
      prompts: {
        systemPrompt: 'You are an AI assistant helping with email management.',
        additionalInstructions: ''
      }
    }
  }
};

export function getDefaultModels(): Record<string, ModelConfig> {
  return Object.entries(availableModels).reduce((acc, [id, { defaultConfig }]) => ({
    ...acc,
    [id]: defaultConfig
  }), {});
}