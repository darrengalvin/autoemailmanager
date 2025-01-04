-- Add branding configuration to user_settings
ALTER TABLE user_settings
ADD COLUMN IF NOT EXISTS branding jsonb DEFAULT '{
  "logoUrl": null,
  "primaryColor": "#014380",
  "secondaryColor": "#014584",
  "companyName": "",
  "emailSignature": ""
}'::jsonb;

-- Add AI models configuration
ALTER TABLE user_settings
ADD COLUMN IF NOT EXISTS ai_models jsonb DEFAULT '{
  "anthropic": {
    "enabled": true,
    "apiKey": "",
    "maxTokens": 2000,
    "temperature": 0.7,
    "prompts": {
      "systemPrompt": "You are an AI assistant helping with email management.",
      "additionalInstructions": ""
    }
  },
  "openai": {
    "enabled": false,
    "apiKey": "",
    "maxTokens": 2000,
    "temperature": 0.7,
    "prompts": {
      "systemPrompt": "You are an AI assistant helping with email management.",
      "additionalInstructions": ""
    }
  },
  "deepseek": {
    "enabled": false,
    "apiKey": "",
    "maxTokens": 2000,
    "temperature": 0.7,
    "prompts": {
      "systemPrompt": "You are an AI assistant helping with email management.",
      "additionalInstructions": ""
    }
  }
}'::jsonb;

-- Add default AI model setting
ALTER TABLE user_settings
ADD COLUMN IF NOT EXISTS default_ai_model text DEFAULT 'anthropic';

-- Create or update function to handle settings initialization
CREATE OR REPLACE FUNCTION initialize_user_settings()
RETURNS trigger AS $$
BEGIN
  INSERT INTO user_settings (
    user_id,
    email_settings,
    branding,
    ai_models,
    default_ai_model
  ) VALUES (
    NEW.id,
    '{
      "tone": "formal",
      "language": "en",
      "signature": "",
      "replyDelay": 0,
      "excludedEmails": [],
      "aiRules": {
        "enabled": false,
        "allowedSenders": [],
        "excludedSenders": [],
        "keywords": [],
        "maxTokensPerEmail": 2000,
        "monthlyTokenBudget": 100000,
        "processRules": {
          "processAll": true,
          "processFromList": false,
          "processWithKeywords": false
        }
      }
    }'::jsonb,
    '{
      "logoUrl": null,
      "primaryColor": "#014380",
      "secondaryColor": "#014584",
      "companyName": "",
      "emailSignature": ""
    }'::jsonb,
    '{
      "anthropic": {
        "enabled": true,
        "apiKey": "",
        "maxTokens": 2000,
        "temperature": 0.7,
        "prompts": {
          "systemPrompt": "You are an AI assistant helping with email management.",
          "additionalInstructions": ""
        }
      }
    }'::jsonb,
    'anthropic'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for new user initialization if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created_settings'
  ) THEN
    CREATE TRIGGER on_auth_user_created_settings
      AFTER INSERT ON auth.users
      FOR EACH ROW
      EXECUTE FUNCTION initialize_user_settings();
  END IF;
END $$;