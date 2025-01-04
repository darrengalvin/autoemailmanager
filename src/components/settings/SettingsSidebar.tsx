'use client';

import { Settings, Bot, Mail, Shield, Database, Link2, Palette } from 'lucide-react';

interface SettingsSidebarProps {
  activeSection: string;
  onSectionChange: (section: any) => void;
}

export function SettingsSidebar({ activeSection, onSectionChange }: SettingsSidebarProps) {
  const sections = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'branding', label: 'Branding', icon: Palette },
    { id: 'ai-models', label: 'AI Models', icon: Bot },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'integrations', label: 'Integrations', icon: Link2 },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'database', label: 'Database', icon: Database }
  ];

  return (
    <nav className="w-48 space-y-0.5">
      {sections.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onSectionChange(id)}
          className={`w-full flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
            activeSection === id
              ? 'bg-primary text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Icon className="w-4 h-4" />
          {label}
        </button>
      ))}
    </nav>
  );
}