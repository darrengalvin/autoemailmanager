'use client';

import { useState } from 'react';
import { Link2, Search, Grid, Star } from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  popular?: boolean;
  connected?: boolean;
}

const integrations: Integration[] = [
  {
    id: 'microsoft365',
    name: 'Microsoft 365',
    description: 'Connect your Outlook or Office 365 account',
    category: 'email',
    icon: '/microsoft.svg',
    popular: true
  },
  {
    id: 'gmail',
    name: 'Gmail',
    description: 'Connect your Gmail or Google Workspace account',
    category: 'email',
    icon: '/gmail.svg',
    popular: true
  },
  {
    id: 'openai',
    name: 'OpenAI',
    description: 'Connect to OpenAI API for advanced AI capabilities',
    category: 'ai',
    icon: '/openai.svg',
    popular: true
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    description: 'Use Claude for enhanced language processing',
    category: 'ai',
    icon: '/anthropic.svg',
    popular: true
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    description: 'Advanced AI model integration',
    category: 'ai',
    icon: '/deepseek.svg'
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    description: 'Google\'s latest AI model integration',
    category: 'ai',
    icon: '/gemini.svg'
  }
];

export function IntegrationsSettings() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [connectedIntegrations, setConnectedIntegrations] = useState<string[]>([]);

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || integration.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleConnect = async (integrationId: string) => {
    // Simulate connection process
    await new Promise(resolve => setTimeout(resolve, 1000));
    setConnectedIntegrations(prev => [...prev, integrationId]);
  };

  const handleDisconnect = async (integrationId: string) => {
    // Simulate disconnection process
    await new Promise(resolve => setTimeout(resolve, 1000));
    setConnectedIntegrations(prev => prev.filter(id => id !== integrationId));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link2 className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-medium">Integrations</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search integrations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 border rounded-md"
            />
          </div>
          <select
            value={selectedCategory || ''}
            onChange={(e) => setSelectedCategory(e.target.value || null)}
            className="border rounded-md px-3 py-2"
          >
            <option value="">All Categories</option>
            <option value="email">Email</option>
            <option value="ai">AI Models</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredIntegrations.map((integration) => (
          <div
            key={integration.id}
            className="p-4 border rounded-lg hover:border-primary transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                {/* Placeholder for integration icon */}
                <Grid className="w-6 h-6 text-gray-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-gray-900">{integration.name}</h3>
                  {integration.popular && (
                    <span className="flex items-center gap-1 text-xs text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-full">
                      <Star className="w-3 h-3" />
                      Popular
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">{integration.description}</p>
                <button
                  onClick={() => connectedIntegrations.includes(integration.id)
                    ? handleDisconnect(integration.id)
                    : handleConnect(integration.id)
                  }
                  className={`mt-3 px-4 py-2 rounded-md text-sm font-medium ${
                    connectedIntegrations.includes(integration.id)
                      ? 'bg-red-50 text-red-600 hover:bg-red-100'
                      : 'bg-primary text-white hover:bg-primary-dark'
                  }`}
                >
                  {connectedIntegrations.includes(integration.id) ? 'Disconnect' : 'Connect'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}