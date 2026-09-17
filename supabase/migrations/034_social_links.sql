-- 034_social_links.sql
CREATE TABLE IF NOT EXISTS public.social_links (
  id SERIAL PRIMARY KEY,
  platform VARCHAR(100) NOT NULL,
  url TEXT NOT NULL,
  handle VARCHAR(100)
);
