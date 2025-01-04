export interface EmailSettings {
  tone: 'formal' | 'casual' | 'friendly';
  language: string;
  signature: string;
  replyDelay: number;
  branding?: {
    logoUrl: string | null;
    primaryColor: string;
    secondaryColor: string;
    companyName: string;
    emailSignature: string;
  };
  userId?: string;
  excludedEmails: Array<{
    id: string;
    email: string;
    reason?: string;
    addedAt: Date;
    addedBy: string;
  }>;
  aiRules: {
    enabled: boolean;
    allowedSenders: string[];
    excludedSenders: string[];
    keywords: string[];
    maxTokensPerEmail: number;
    monthlyTokenBudget: number;
    processRules: {
      processAll: boolean;
      processFromList: boolean;
      processWithKeywords: boolean;
    };
  };
  tokenUsage: {
    currentMonthTokens: number;
    monthlyLimit: number;
    costPerThousandTokens: number;
  };
  models: {
    [key: string]: {
      enabled: boolean;
      apiKey: string;
      maxTokens: number;
      temperature: number;
      prompts: {
        systemPrompt: string;
        additionalInstructions: string;
      };
    };
  };
  defaultModel: string;
}

export interface AIProcessingRules {
  enabled: boolean;
  allowedSenders: string[];
  excludedSenders: string[];
  keywords: string[];
  maxTokensPerEmail: number;
  monthlyTokenBudget: number;
  processRules: {
    processAll: boolean;
    processFromList: boolean;
    processWithKeywords: boolean;
  };
}

export interface Email {
  id: string;
  subject: string;
  body: string;
  to: string[];
  from: string;
  timestamp: Date;
  status: 'draft' | 'sent' | 'scheduled' | 'ai_pending' | 'human_pending' | 'approved';
  thread?: Email[];
  attachments?: Array<{
    id: string;
    name: string;
    url: string;
    size: number;
    type?: string;
  }>;
  metadata?: {
    threadId?: string;
    labels?: string[];
    priority?: 'high' | 'normal' | 'low';
  };
  aiMetadata?: {
    sentiment?: string;
    priority?: string;
    category?: string;
    suggestedResponse?: string;
  };
  aiSuggestion?: {
    id: string;
    body: string;
    confidence: number;
    reasoning: string;
  };
}

export interface ModelConfig {
  enabled: boolean;
  apiKey: string;
  maxTokens: number;
  temperature: number;
  prompts: {
    systemPrompt: string;
    additionalInstructions: string;
  };
}

export interface ExcludedEmail {
  id: string;
  email: string;
  reason?: string;
  addedAt: Date;
  addedBy: string;
}

// ... rest of the types ...