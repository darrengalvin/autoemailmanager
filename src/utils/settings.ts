import { createClient } from '@/utils/supabase/client';
import { AdminSettings } from '@/types';
import { logger } from '@/utils/logger';
import { getDefaultModels } from './ai/models';

export async function saveSettings(settings: Partial<AdminSettings>) {
  const supabase = createClient();
  if (!supabase) throw new Error('Failed to initialize Supabase client');

  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User not authenticated');
  }

  try {
    const { error } = await supabase
      .from('user_settings')
      .upsert({
        user_id: user.id,
        email_settings: {
          ...settings.emailSettings,
          models: undefined,
          defaultModel: undefined
        },
        branding: settings.branding,
        ai_models: settings.emailSettings?.models || getDefaultModels(),
        default_ai_model: settings.emailSettings?.defaultModel || 'anthropic',
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id'
      });

    if (error) throw error;
    
    logger.info('Settings saved successfully');
  } catch (error) {
    logger.error('Failed to save settings:', error);
    throw error;
  }
}

export async function loadSettings(): Promise<AdminSettings | null> {
  const supabase = createClient();
  if (!supabase) throw new Error('Failed to initialize Supabase client');

  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    logger.warn('No authenticated user found');
    return null;
  }

  try {
    const { data: settings, error } = await (supabase
      .from('user_settings')
      .select('*')
      .eq('user_id', user.id) as any)
      .single();

    if (error) throw error;

    if (!settings) {
      logger.warn('No settings found for user');
      return null;
    }

    return {
      openaiApiKey: '',
      anthropicApiKey: '',
      emailSettings: {
        ...settings.email_settings,
        models: settings.ai_models || getDefaultModels(),
        defaultModel: settings.default_ai_model || 'anthropic'
      },
      branding: settings.branding || {
        logoUrl: null,
        primaryColor: '#014380',
        secondaryColor: '#014584',
        companyName: '',
        emailSignature: ''
      },
      microsoftClientId: '',
      microsoftTenantId: '',
      supabaseConfig: {
        url: '',
        key: '',
        embeddingsTable: 'embeddings'
      }
    };
  } catch (error) {
    logger.error('Failed to load settings:', error);
    throw error;
  }
}