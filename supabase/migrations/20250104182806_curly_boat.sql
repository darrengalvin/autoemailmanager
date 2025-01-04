-- Create AI model configurations table
CREATE TABLE IF NOT EXISTS ai_model_configs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL UNIQUE,
  models jsonb NOT NULL DEFAULT '{}'::jsonb,
  default_model text NOT NULL DEFAULT 'anthropic',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE ai_model_configs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can manage their own AI model configs"
  ON ai_model_configs
  USING (user_id = auth.uid());

-- Create update trigger
CREATE TRIGGER set_timestamp
  BEFORE UPDATE ON ai_model_configs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Add token usage tracking
ALTER TABLE user_settings
ADD COLUMN IF NOT EXISTS token_usage jsonb DEFAULT '{
  "currentMonthTokens": 0,
  "monthlyLimit": 100000,
  "costPerThousandTokens": 0.02
}'::jsonb;