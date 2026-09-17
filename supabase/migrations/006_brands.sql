-- 006_brands.sql
CREATE TABLE IF NOT EXISTS public.brands (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  origin_country VARCHAR(100) DEFAULT 'Japan',
  logo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
