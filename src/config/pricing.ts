export const infrastructure = {
  database: {
    cost: '£6-8',
    period: 'month',
    plan: 'Supabase Pro',
    storage: {
      included: '8GB',
      emailCapacity: '~100k emails'
    }
  }
};

export const aiModels = {
  gpt4: {
    cost: 0.04,
    currency: '£',
    unit: 'per email response',
    bestFor: 'complex emails',
    averageTokens: 500
  },
  gpt35: {
    cost: 0.002,
    currency: '£',
    unit: 'per email response',
    bestFor: 'routine emails',
    averageTokens: 500
  },
  claude: {
    cost: 0.03,
    currency: '£',
    unit: 'per email response',
    bestFor: 'analytical responses',
    averageTokens: 500
  },
  gemini: {
    cost: 0.025,
    currency: '£',
    unit: 'per email response',
    bestFor: 'international emails',
    averageTokens: 500
  },
  deepseek: {
    cost: 0.02,
    currency: '£',
    unit: 'per email response',
    bestFor: 'technical communications',
    averageTokens: 500
  }
};

export const monthlyScenarios = {
  startup: {
    emails: 100,
    costRange: '£10-15',
    description: 'Infrastructure + AI'
  },
  growth: {
    emails: 500,
    costRange: '£25-35',
    description: 'Mixed model usage'
  },
  enterprise: {
    emails: 1000,
    costRange: '£45-60',
    description: 'Enterprise scale'
  }
};

export const tokenInfo = {
  averageEmailLength: 200, // words
  tokensPerEmail: {
    average: 500,
    description: 'A token is roughly 4 characters or 3/4 of a word'
  }
}; 