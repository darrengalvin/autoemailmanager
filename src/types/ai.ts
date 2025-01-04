export interface ModelConfig {
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

export interface AITestResult {
  success: boolean;
  message: string;
  response?: string;
}