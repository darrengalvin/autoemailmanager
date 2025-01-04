-- Add AI model configurations to user_settings
ALTER TABLE user_settings
ADD COLUMN IF NOT EXISTS ai_models jsonb DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS default_ai_model text DEFAULT 'anthropic';

-- Create function to initialize default AI models
CREATE OR REPLACE FUNCTION initialize_default_ai_models()
RETURNS trigger AS $$
BEGIN
  NEW.ai_models = '{
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
  }'::jsonb;
  NEW.default_ai_model = 'anthropic';
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to set default AI models
CREATE TRIGGER set_default_ai_models
  BEFORE INSERT ON user_settings
  FOR EACH ROW
  EXECUTE FUNCTION initialize_default_ai_models();