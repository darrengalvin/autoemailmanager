import { EmailSettings } from './email';
import { BrandingConfig } from './branding';

export interface AdminSettings {
  openaiApiKey: string;
  anthropicApiKey: string;
  emailSettings: EmailSettings;
  microsoftClientId: string;
  microsoftTenantId: string;
  supabaseConfig: {
    url: string;
    key: string;
    embeddingsTable: string;
  };
  branding: BrandingConfig;
}