/*
# Create anonymous site visit counter

1. New Tables
- `site_visits`: one row per recorded visit (id, visited_at).

2. Functions
- `record_site_visit()`: records a visit and returns the total number of visits.
  Runs with owner rights so visitors never touch the table directly.

3. Security
- Row level security enabled on `site_visits` with no policies, so no visitor can read or write it directly.
- `record_site_visit()` is granted only to the anonymous and signed-in public roles.
- Function search path is fixed to prevent object shadowing.
*/

CREATE TABLE IF NOT EXISTS site_visits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  visited_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE site_visits ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.record_site_visit()
RETURNS bigint
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.site_visits DEFAULT VALUES;
  RETURN (SELECT count(*) FROM public.site_visits);
END;
$$;

REVOKE EXECUTE ON FUNCTION public.record_site_visit() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.record_site_visit() TO anon, authenticated;
