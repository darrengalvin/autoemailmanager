/*
  # Initial Schema Setup for Smart Email Manager

  1. Tables Overview
    - users (handled by Supabase Auth)
    - emails (main email storage)
    - email_threads (grouping related emails)
    - email_attachments (file attachments)
    - ai_suggestions (AI-generated responses)
    - email_exclusions (excluded senders)
    - user_settings (per-user configuration)
    - email_templates (reusable templates)
    - email_categories (organization)
    - audit_logs (system activity tracking)

  2. Security
    - RLS enabled on all tables
    - Policies for user data isolation
    - Audit logging for sensitive operations

  3. Features
    - Email threading support
    - AI suggestion tracking
    - Template management
    - User preferences
    - Activity logging
*/

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "vector" WITH SCHEMA public;

-- Email Threads
CREATE TABLE IF NOT EXISTS email_threads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject text NOT NULL,
  last_updated_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) NOT NULL
);

-- Emails
CREATE TABLE IF NOT EXISTS emails (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id uuid REFERENCES email_threads(id),
  subject text NOT NULL,
  from_address text NOT NULL,
  to_addresses text[] NOT NULL,
  cc_addresses text[],
  bcc_addresses text[],
  body text NOT NULL,
  html_body text,
  status text NOT NULL CHECK (status IN ('draft', 'ai_pending', 'human_pending', 'approved', 'sent', 'archived')),
  importance text CHECK (importance IN ('low', 'normal', 'high')),
  sent_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb
);

-- Email Attachments
CREATE TABLE IF NOT EXISTS email_attachments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email_id uuid REFERENCES emails(id) ON DELETE CASCADE,
  name text NOT NULL,
  content_type text NOT NULL,
  size integer NOT NULL,
  storage_path text NOT NULL,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) NOT NULL
);

-- AI Suggestions
CREATE TABLE IF NOT EXISTS ai_suggestions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email_id uuid REFERENCES emails(id) ON DELETE CASCADE,
  suggested_body text NOT NULL,
  confidence numeric(4,3) NOT NULL CHECK (confidence >= 0 AND confidence <= 1),
  reasoning text,
  model_used text NOT NULL,
  embedding vector(1536),
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb
);

-- Email Categories
CREATE TABLE IF NOT EXISTS email_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  color text,
  description text,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  UNIQUE (name, user_id)
);

-- Email Templates
CREATE TABLE IF NOT EXISTS email_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  subject text NOT NULL,
  body text NOT NULL,
  variables jsonb DEFAULT '[]'::jsonb,
  category_id uuid REFERENCES email_categories(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) NOT NULL
);

-- User Settings
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

-- Audit Logs
CREATE TABLE IF NOT EXISTS audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  action text NOT NULL,
  entity_type text NOT NULL,
  entity_id uuid,
  details jsonb,
  ip_address text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE email_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE emails ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_suggestions ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Email Threads
CREATE POLICY "Users can manage their own threads"
  ON email_threads
  USING (user_id = auth.uid());

-- Emails
CREATE POLICY "Users can manage their own emails"
  ON emails
  USING (user_id = auth.uid());

-- Email Attachments
CREATE POLICY "Users can manage their own attachments"
  ON email_attachments
  USING (user_id = auth.uid());

-- AI Suggestions
CREATE POLICY "Users can manage their own suggestions"
  ON ai_suggestions
  USING (user_id = auth.uid());

-- Email Categories
CREATE POLICY "Users can manage their own categories"
  ON email_categories
  USING (user_id = auth.uid());

-- Email Templates
CREATE POLICY "Users can manage their own templates"
  ON email_templates
  USING (user_id = auth.uid());

-- User Settings
CREATE POLICY "Users can manage their own settings"
  ON user_settings
  USING (user_id = auth.uid());

-- Audit Logs
CREATE POLICY "Users can view their own audit logs"
  ON audit_logs
  FOR SELECT
  USING (user_id = auth.uid());

-- Indexes
CREATE INDEX IF NOT EXISTS idx_emails_user_id ON emails(user_id);
CREATE INDEX IF NOT EXISTS idx_emails_thread_id ON emails(thread_id);
CREATE INDEX IF NOT EXISTS idx_emails_status ON emails(status);
CREATE INDEX IF NOT EXISTS idx_emails_created_at ON emails(created_at);
CREATE INDEX IF NOT EXISTS idx_ai_suggestions_email_id ON ai_suggestions(email_id);
CREATE INDEX IF NOT EXISTS idx_email_templates_category_id ON email_templates(category_id);

-- Functions
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON emails
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON email_threads
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON email_templates
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON user_settings
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- Insert default categories for new users
CREATE OR REPLACE FUNCTION create_default_categories()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO email_categories (name, color, description, user_id)
  VALUES
    ('Work', '#0284c7', 'Work-related emails', NEW.id),
    ('Personal', '#059669', 'Personal communications', NEW.id),
    ('Important', '#dc2626', 'High priority emails', NEW.id),
    ('Follow-up', '#f59e0b', 'Emails requiring follow-up', NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_default_categories();