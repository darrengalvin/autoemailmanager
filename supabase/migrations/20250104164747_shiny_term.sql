/*
  # Create core tables for email management system

  1. New Tables
    - users (auth.users built-in)
    - emails
      - id (uuid, primary key)
      - subject (text)
      - from_address (text)
      - to_addresses (text[])
      - body (text)
      - status (text)
      - created_at (timestamptz)
      - user_id (uuid, foreign key)
    - user_settings
      - user_id (uuid, primary key)
      - email_settings (jsonb)
      - notification_settings (jsonb)
      - ui_preferences (jsonb)
      - updated_at (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create emails table
CREATE TABLE IF NOT EXISTS emails (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject text NOT NULL,
  from_address text NOT NULL,
  to_addresses text[] NOT NULL,
  body text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id)
);

-- Create user_settings table
CREATE TABLE IF NOT EXISTS user_settings (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id),
  email_settings jsonb NOT NULL DEFAULT '{
    "tone": "formal",
    "language": "en",
    "signature": "",
    "replyDelay": 0,
    "aiPreferences": {
      "autoReply": false,
      "confidenceThreshold": 0.8,
      "priorityThreshold": "medium",
      "reviewRequired": true
    }
  }'::jsonb,
  notification_settings jsonb NOT NULL DEFAULT '{
    "emailNotifications": true,
    "browserNotifications": false
  }'::jsonb,
  ui_preferences jsonb NOT NULL DEFAULT '{
    "theme": "light",
    "sidebarCollapsed": false
  }'::jsonb,
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE emails ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can manage their own emails"
  ON emails
  USING (user_id = auth.uid());

CREATE POLICY "Users can manage their own settings"
  ON user_settings
  USING (user_id = auth.uid());

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_emails_user_id ON emails(user_id);
CREATE INDEX IF NOT EXISTS idx_emails_status ON emails(status);
CREATE INDEX IF NOT EXISTS idx_emails_created_at ON emails(created_at);

-- Create update trigger for timestamps
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON emails
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON user_settings
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();