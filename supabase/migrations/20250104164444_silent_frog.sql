-- Create demo user function
CREATE OR REPLACE FUNCTION create_demo_user()
RETURNS void AS $$
DECLARE
  demo_user_id uuid;
BEGIN
  -- Create demo user if it doesn't exist
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    recovery_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  )
  VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'demo@smartemail.demo',
    crypt('demo123456', gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '{"provider": "email", "providers": ["email"]}',
    '{"name": "Demo User"}',
    NOW(),
    NOW(),
    '',
    '',
    '',
    ''
  )
  ON CONFLICT (email) DO NOTHING
  RETURNING id INTO demo_user_id;

  -- Add demo data if user was created
  IF demo_user_id IS NOT NULL THEN
    -- Add demo email categories
    INSERT INTO email_categories (name, color, description, user_id)
    VALUES
      ('Work', '#0284c7', 'Work-related emails', demo_user_id),
      ('Personal', '#059669', 'Personal communications', demo_user_id),
      ('Important', '#dc2626', 'High priority emails', demo_user_id),
      ('Follow-up', '#f59e0b', 'Emails requiring follow-up', demo_user_id);

    -- Add demo settings
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
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Create demo user
SELECT create_demo_user();