/*
  # Add email exclusions table

  1. New Tables
    - `email_exclusions`
      - `id` (uuid, primary key)
      - `email` (text, not null)
      - `reason` (text)
      - `added_at` (timestamptz)
      - `added_by` (uuid, references auth.users)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `email_exclusions` table
    - Add policies for authenticated users to manage their exclusions
*/

CREATE TABLE IF NOT EXISTS email_exclusions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  reason text,
  added_at timestamptz NOT NULL DEFAULT now(),
  added_by uuid REFERENCES auth.users(id) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_email_exclusions_email ON email_exclusions(email);

-- Enable RLS
ALTER TABLE email_exclusions ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own exclusions"
  ON email_exclusions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = added_by);

CREATE POLICY "Users can add exclusions"
  ON email_exclusions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = added_by);

CREATE POLICY "Users can delete their own exclusions"
  ON email_exclusions
  FOR DELETE
  TO authenticated
  USING (auth.uid() = added_by);