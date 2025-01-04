/*
  # Initial Schema Setup for Email Management System

  1. New Tables
    - `emails`
      - Stores all email data including metadata and content
    - `attachments`
      - Stores attachment information linked to emails
    - `embeddings`
      - Stores document embeddings for AI processing
    - `settings`
      - Stores system-wide settings and configurations

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

-- Create attachments table
CREATE TABLE IF NOT EXISTS attachments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email_id uuid REFERENCES emails(id),
  name text NOT NULL,
  type text NOT NULL,
  size integer NOT NULL,
  url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create embeddings table
CREATE TABLE IF NOT EXISTS embeddings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  embedding vector(1536),
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create settings table
CREATE TABLE IF NOT EXISTS settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE emails ENABLE ROW LEVEL SECURITY;
ALTER TABLE attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE embeddings ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read their own emails"
  ON emails FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own emails"
  ON emails FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read their email attachments"
  ON attachments FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM emails
    WHERE emails.id = attachments.email_id
    AND emails.user_id = auth.uid()
  ));

CREATE POLICY "Users can read embeddings"
  ON embeddings FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only admins can modify embeddings"
  ON embeddings FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.role = 'admin'
    )
  );

CREATE POLICY "Only admins can access settings"
  ON settings FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.role = 'admin'
    )
  );