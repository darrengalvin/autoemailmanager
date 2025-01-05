'use client';

import { infrastructure, aiModels, monthlyScenarios, tokenInfo } from '@/config/pricing';

export function PricingInfo() {
  return (
    <div className="space-y-6">
      <div className="bg-white border rounded-lg divide-y">
        {/* Infrastructure Costs */}
        <div className="p-4">
          <h5 className="font-medium text-gray-900 mb-2">Infrastructure Costs</h5>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Database hosting: {infrastructure.database.cost}/{infrastructure.database.period} ({infrastructure.database.plan})</li>
            <li>• Storage: {infrastructure.database.storage.included} included ({infrastructure.database.storage.emailCapacity})</li>
            <li>• No additional server costs (serverless architecture)</li>
          </ul>
        </div>

        {/* AI Token Usage */}
        <div className="p-4">
          <h5 className="font-medium text-gray-900 mb-2">AI Token Usage</h5>
          <p className="text-sm text-gray-600 mb-3">
            {tokenInfo.tokensPerEmail.description}. Average email response ({tokenInfo.averageEmailLength} words) 
            uses about {tokenInfo.tokensPerEmail.average} tokens.
          </p>
          <div className="grid gap-3">
            {Object.entries(aiModels).map(([model, info]) => (
              <div key={model} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <div>
                  <span className="font-medium text-gray-900">{model.toUpperCase()}</span>
                  <p className="text-sm text-gray-600">{info.bestFor}</p>
                </div>
                <div className="text-right">
                  <span className="font-medium text-gray-900">
                    {info.currency}{info.cost} {info.unit}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Scenarios */}
        <div className="p-4">
          <h5 className="font-medium text-gray-900 mb-2">Monthly Scenarios</h5>
          <div className="space-y-3">
            {Object.entries(monthlyScenarios).map(([tier, info]) => (
              <div key={tier} className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
                <div>
                  <span className="font-medium text-blue-900">{tier.charAt(0).toUpperCase() + tier.slice(1)}</span>
                  <p className="text-sm text-blue-700">~{info.emails} emails/month</p>
                </div>
                <div className="text-right">
                  <span className="font-medium text-blue-900">{info.costRange}/month</span>
                  <p className="text-sm text-blue-700">{info.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 bg-yellow-50 rounded-lg">
        <h4 className="font-medium text-yellow-900 mb-2">💡 Pro Tip:</h4>
        <p className="text-sm text-yellow-800">
          Start with GPT-3.5-Turbo for all emails. Only upgrade specific email types to GPT-4 if needed. 
          This hybrid approach typically reduces costs by 70-80% while maintaining quality.
        </p>
      </div>
    </div>
  );
} 