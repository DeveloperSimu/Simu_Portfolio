/*
# Create blog posts table

1. New Tables
- `blog_posts`
  - `id` (uuid, primary key)
  - `slug` (text, unique, lowercase letters, numbers and hyphens only)
  - `title`, `excerpt`, `category`, `body` (text)
  - `tags` (text array)
  - `read_minutes` (integer, at least 1)
  - `published` (boolean, defaults to false)
  - `published_at`, `created_at` (timestamps)

2. Security
- Row level security enabled.
- Visitors (anonymous and signed-in) can read only rows where `published` is true.
- No visitor can insert, update or delete posts. Posts are managed from the database dashboard.

3. Notes
- A partial index on published posts keeps the blog listing fast.
*/

CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL CHECK (slug ~ '^[a-z0-9-]+$'),
  title text NOT NULL,
  excerpt text NOT NULL,
  category text NOT NULL,
  tags text[] NOT NULL DEFAULT '{}',
  body text NOT NULL,
  read_minutes integer NOT NULL DEFAULT 5 CHECK (read_minutes >= 1),
  published boolean NOT NULL DEFAULT false,
  published_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON blog_posts TO anon, authenticated;

DROP POLICY IF EXISTS "public_read_published_posts" ON blog_posts;
CREATE POLICY "public_read_published_posts" ON blog_posts
  FOR SELECT
  TO anon, authenticated
  USING (published = true);

CREATE INDEX IF NOT EXISTS blog_posts_published_at_idx
  ON blog_posts (published_at DESC)
  WHERE published = true;
