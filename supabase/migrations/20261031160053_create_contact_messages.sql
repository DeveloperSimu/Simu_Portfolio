/*
# Create contact_messages table

1. New Tables
- `contact_messages`
  - `id` (uuid, primary key)
  - `name` (text, required, max 100 chars)
  - `email` (text, required, max 255 chars)
  - `subject` (text, required, max 150 chars)
  - `message` (text, required, max 3000 chars)
  - `created_at` (timestamptz, defaults to now)

2. Security
- Row level security enabled on `contact_messages`.
- Visitors (anon and signed-in) may only INSERT a message; they cannot read, edit, or delete any stored messages.
- Length and format checks are enforced in the database as well as in the browser.
*/

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255 AND email LIKE '%_@_%.__%'),
  subject text NOT NULL CHECK (char_length(subject) BETWEEN 1 AND 150),
  message text NOT NULL CHECK (char_length(message) BETWEEN 1 AND 3000),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON contact_messages TO anon, authenticated;

DROP POLICY IF EXISTS "anon_insert_contact_messages" ON contact_messages;
CREATE POLICY "anon_insert_contact_messages" ON contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
