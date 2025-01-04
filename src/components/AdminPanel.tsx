import React from 'react';
import { Settings, Mail, Upload, Database } from 'lucide-react';
import { AdminSettings } from '../types';

export default function AdminPanel() {
  const [settings, setSettings] = React.useState<AdminSettings>({
    openaiApiKey: '',
    anthropicApiKey: '',
    microsoftClientId: '',
    microsoftTenantId: '',
    supabaseConfig: {
      url: '',
      key: '',
      embeddingsTable: ''
    },
    branding: {
      logoUrl: null,
      primaryColor: '',
      secondaryColor: '',
      companyName: '',
      emailSignature: ''
    },
    emailSettings: {
      tone: 'formal',
      language: 'en',
      signature: '',
      replyDelay: 0,
      excludedEmails: [],
      aiRules: {
        enabled: false,
        allowedSenders: [],
        excludedSenders: [],
        keywords: [],
        maxTokensPerEmail: 0,
        monthlyTokenBudget: 0,
        processRules: {
          processAll: false,
          processFromList: false,
          processWithKeywords: false
        }
      },
      tokenUsage: {
        currentMonthTokens: 0,
        monthlyLimit: 0,
        costPerThousandTokens: 0
      },
      models: {},
      defaultModel: ''
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#014380] to-[#014584]">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-xl p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Control Panel</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Settings className="w-6 h-6 text-[#014380]" />
                  <h2 className="text-xl font-semibold">API Configuration</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">OpenAI API Key</label>
                    <input
                      type="password"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#014380] focus:ring focus:ring-[#014380] focus:ring-opacity-50"
                      value={settings.openaiApiKey}
                      onChange={(e) => setSettings({ ...settings, openaiApiKey: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Anthropic API Key</label>
                    <input
                      type="password"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#014380] focus:ring focus:ring-[#014380] focus:ring-opacity-50"
                      value={settings.anthropicApiKey}
                      onChange={(e) => setSettings({ ...settings, anthropicApiKey: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Mail className="w-6 h-6 text-[#014380]" />
                  <h2 className="text-xl font-semibold">Email Settings</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Tone</label>
                    <select
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#014380] focus:ring focus:ring-[#014380] focus:ring-opacity-50"
                      value={settings.emailSettings.tone}
                      onChange={(e) => setSettings({
                        ...settings,
                        emailSettings: { ...settings.emailSettings, tone: e.target.value as any }
                      })}
                    >
                      <option value="formal">Formal</option>
                      <option value="casual">Casual</option>
                      <option value="friendly">Friendly</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Signature</label>
                    <textarea
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#014380] focus:ring focus:ring-[#014380] focus:ring-opacity-50"
                      value={settings.emailSettings.signature}
                      onChange={(e) => setSettings({
                        ...settings,
                        emailSettings: { ...settings.emailSettings, signature: e.target.value }
                      })}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Upload className="w-6 h-6 text-[#014380]" />
                  <h2 className="text-xl font-semibold">Document Upload</h2>
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <p className="text-gray-600">Drag and drop files here or click to upload</p>
                  <button className="mt-4 px-4 py-2 bg-[#014380] text-white rounded-md hover:bg-[#014584] transition-colors">
                    Select Files
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Database className="w-6 h-6 text-[#014380]" />
                  <h2 className="text-xl font-semibold">Embedding Status</h2>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Documents processed</span>
                    <span className="font-semibold">245</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Total embeddings</span>
                    <span className="font-semibold">1,234</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Last update</span>
                    <span className="font-semibold">2 hours ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button className="px-6 py-2 bg-[#014380] text-white rounded-md hover:bg-[#014584] transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}