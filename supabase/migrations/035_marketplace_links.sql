-- 035_marketplace_links.sql
CREATE TABLE IF NOT EXISTS public.marketplace_links (
  id SERIAL PRIMARY KEY,
  platform VARCHAR(100) NOT NULL,
  url TEXT NOT NULL,
  account_phone VARCHAR(50),
  status VARCHAR(50) DEFAULT 'Active'
);
