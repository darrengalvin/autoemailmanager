/*
  # Create demo data tables and sample content
  
  1. Creates tables for storing demo data
  2. Adds sample emails and settings
  3. Sets up proper RLS policies
*/

-- Create a table to store demo data status
CREATE TABLE IF NOT EXISTS demo_data_status (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  is_initialized boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Function to initialize demo data for a user
CREATE OR REPLACE FUNCTION initialize_demo_data(user_id uuid)
RETURNS void AS $$
BEGIN
  -- Insert demo emails
  INSERT INTO emails (
    subject,
    from_address,
    to_addresses,
    body,
    status,
    user_id
  ) VALUES 
  (
    'Welcome to Smart Email Manager',
    'support@smartemail.demo',
    ARRAY[auth.email()],
    'Welcome to Smart Email Manager! This is a demo account to help you explore our features.',
    'approved',
    user_id
  ),
  (
    'Project Update Meeting',
    'john.doe@company.demo',
    ARRAY[auth.email()],
    'Hi team,\n\nLet''s schedule a meeting to discuss project updates.\n\nBest regards,\nJohn',
    'ai_pending',
    user_id
  ),
  (
    'Client Proposal Review',
    'sarah.smith@client.demo',
    ARRAY[auth.email()],
    'Please review the attached proposal for the new project.\n\nRegards,\nSarah',
    'human_pending',
    user_id
  );

  -- Insert user settings
  INSERT INTO user_settings (
    user_id,
    email_settings,
    notification_settings,
    ui_preferences
  ) VALUES (
    user_id,
    '{
      "tone": "formal",
      "language": "en",
      "signature": "Best regards,\nDemo User",
      "replyDelay": 0,
      "aiPreferences": {
        "autoReply": true,
        "confidenceThreshold": 0.8,
        "priorityThreshold": "medium",
        "reviewRequired": true
      }
    }'::jsonb,
    '{
      "emailNotifications": true,
      "browserNotifications": false
    }'::jsonb,
    '{
      "theme": "light",
      "sidebarCollapsed": false
    }'::jsonb
  );

  -- Insert email categories
  INSERT INTO email_categories (
    name,
    color,
    description,
    user_id
  ) VALUES 
  ('Work', '#0284c7', 'Work-related emails', user_id),
  ('Personal', '#059669', 'Personal communications', user_id),
  ('Important', '#dc2626', 'High priority emails', user_id),
  ('Follow-up', '#f59e0b', 'Emails requiring follow-up', user_id);

  -- Mark demo data as initialized
  INSERT INTO demo_data_status (email, is_initialized)
  VALUES (auth.email(), true)
  ON CONFLICT (email) DO UPDATE SET is_initialized = true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable RLS on demo_data_status
ALTER TABLE demo_data_status ENABLE ROW LEVEL SECURITY;

-- Create policy for demo_data_status
CREATE POLICY "Users can view their own demo status"
  ON demo_data_status
  FOR SELECT
  TO authenticated
  USING (email = auth.email());