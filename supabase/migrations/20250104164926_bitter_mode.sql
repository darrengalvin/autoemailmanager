/*
  # Create demo user and sample data

  1. Creates demo user account
  2. Adds sample emails
  3. Sets up user settings
  4. Adds sample email categories
*/

-- Create demo user if not exists
DO $$ 
DECLARE
  demo_user_id uuid;
BEGIN
  -- Insert demo user if not exists
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at
  )
  VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'demo@smartemail.demo',
    crypt('demo123456', gen_salt('bf')),
    now(),
    now(),
    '{"provider": "email", "providers": ["email"]}',
    '{"name": "Demo User"}',
    now(),
    now()
  )
  ON CONFLICT (email) DO NOTHING
  RETURNING id INTO demo_user_id;

  -- Only proceed if we created a new demo user
  IF demo_user_id IS NOT NULL THEN
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
      ARRAY['demo@smartemail.demo'],
      'Welcome to Smart Email Manager! This is a demo account to help you explore our features.',
      'approved',
      demo_user_id
    ),
    (
      'Project Update Meeting',
      'john.doe@company.demo',
      ARRAY['demo@smartemail.demo'],
      'Hi team,\n\nLet''s schedule a meeting to discuss project updates.\n\nBest regards,\nJohn',
      'ai_pending',
      demo_user_id
    ),
    (
      'Client Proposal Review',
      'sarah.smith@client.demo',
      ARRAY['demo@smartemail.demo'],
      'Please review the attached proposal for the new project.\n\nRegards,\nSarah',
      'human_pending',
      demo_user_id
    );

    -- Insert user settings
    INSERT INTO user_settings (
      user_id,
      email_settings,
      notification_settings,
      ui_preferences
    ) VALUES (
      demo_user_id,
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
    ('Work', '#0284c7', 'Work-related emails', demo_user_id),
    ('Personal', '#059669', 'Personal communications', demo_user_id),
    ('Important', '#dc2626', 'High priority emails', demo_user_id),
    ('Follow-up', '#f59e0b', 'Emails requiring follow-up', demo_user_id);
  END IF;
END $$;