-- Create token_usage table
CREATE TABLE IF NOT EXISTS token_usage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  email_id uuid REFERENCES emails(id),
  prompt_tokens integer NOT NULL,
  completion_tokens integer NOT NULL,
  total_tokens integer NOT NULL,
  model text NOT NULL,
  cost numeric(10,4) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Add token usage tracking to user_settings
ALTER TABLE user_settings
ADD COLUMN IF NOT EXISTS ai_rules jsonb NOT NULL DEFAULT '{
  "enabled": true,
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
}'::jsonb;

-- Enable RLS
ALTER TABLE token_usage ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own token usage"
  ON token_usage
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Create function to get monthly token usage
CREATE OR REPLACE FUNCTION get_monthly_token_usage(user_id uuid)
RETURNS TABLE (
  month date,
  total_tokens bigint,
  total_cost numeric
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    date_trunc('month', created_at)::date as month,
    sum(total_tokens) as total_tokens,
    sum(cost) as total_cost
  FROM token_usage
  WHERE token_usage.user_id = get_monthly_token_usage.user_id
  AND created_at >= date_trunc('month', now())
  GROUP BY date_trunc('month', created_at);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;