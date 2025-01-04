'use client';

import { Bot, AlertCircle, TrendingUp, Save } from 'lucide-react';
import { EmailSettings } from '@/types';
import { useState } from 'react';

interface TokenUsageStatsProps {
  settings: EmailSettings;
  onUpdate: (settings: Partial<EmailSettings>) => void;
}

export function TokenUsageStats({ settings, onUpdate }: TokenUsageStatsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newLimit, setNewLimit] = useState(settings.tokenUsage?.monthlyLimit || 100000);
  
  const { currentMonthTokens = 0, monthlyLimit = 100000, costPerThousandTokens = 0.02 } = settings.tokenUsage || {};
  const usagePercentage = (currentMonthTokens / monthlyLimit) * 100;
  const estimatedCost = (currentMonthTokens / 1000) * costPerThousandTokens;

  const handleSaveLimit = () => {
    onUpdate({
      tokenUsage: {
        ...settings.tokenUsage,
        monthlyLimit: newLimit
      }
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center gap-2 text-blue-600 mb-2">
            <Bot className="w-5 h-5" />
            <h3 className="font-medium">Current Usage</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">{currentMonthTokens.toLocaleString()}</p>
          <p className="text-sm text-gray-500">tokens this month</p>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center gap-2 text-green-600 mb-2">
            <TrendingUp className="w-5 h-5" />
            <h3 className="font-medium">Monthly Limit</h3>
          </div>
          {isEditing ? (
            <div className="flex gap-2">
              <input
                type="number"
                value={newLimit}
                onChange={(e) => setNewLimit(parseInt(e.target.value))}
                className="w-32 rounded-md"
                min={1000}
                step={1000}
              />
              <button
                onClick={handleSaveLimit}
                className="p-2 text-green-600 hover:bg-green-50 rounded-md"
              >
                <Save className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <p className="text-2xl font-bold text-gray-900">{monthlyLimit.toLocaleString()}</p>
              <button
                onClick={() => setIsEditing(true)}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Edit Limit
              </button>
            </>
          )}
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center gap-2 text-purple-600 mb-2">
            <AlertCircle className="w-5 h-5" />
            <h3 className="font-medium">Estimated Cost</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">${estimatedCost.toFixed(2)}</p>
          <p className="text-sm text-gray-500">this month</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border">
        <h3 className="font-medium text-gray-900 mb-2">Usage Progress</h3>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full ${
              usagePercentage > 90 ? 'bg-red-600' :
              usagePercentage > 75 ? 'bg-yellow-600' :
              'bg-green-600'
            }`}
            style={{ width: `${Math.min(usagePercentage, 100)}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-500">
          <span>{usagePercentage.toFixed(1)}% used</span>
          <span>{(monthlyLimit - currentMonthTokens).toLocaleString()} tokens remaining</span>
        </div>
      </div>
    </div>
  );
}