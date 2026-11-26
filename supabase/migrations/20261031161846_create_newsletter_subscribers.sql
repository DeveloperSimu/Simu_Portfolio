/*
# Create newsletter subscribers table

Stores email addresses of visitors who want to be notified about new blog articles.

1. New Tables
- `newsletter_subscribers`
  - `id` (uuid, primary key)
  - `email` (text, unique, lowercase, validated format and length)
  - `created_at` (timestamp, defaults to now)

2. Security
- Row level security is enabled.
- Visitors (anon and authenticated) may only INSERT a row. They cannot read, update or delete any subscriber, so emails are never exposed to the public.
- Only INSERT is granted to anon and authenticated.

3. Notes
- The unique constraint makes repeat sign-ups harmless.
- The format check is enforced in the database as well as in the form.
*/

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT newsletter_subscribers_email_valid CHECK (
    char_length(email) BETWEEN 5 AND 254
    AND email = lower(email)
    AND email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  )
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON newsletter_subscribers TO anon, authenticated;

DROP POLICY IF EXISTS "anon_insert_newsletter_subscribers" ON newsletter_subscribers;
CREATE POLICY "anon_insert_newsletter_subscribers" ON newsletter_subscribers
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
