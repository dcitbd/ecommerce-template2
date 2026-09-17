-- 009_products.sql
CREATE TABLE IF NOT EXISTS public.products (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  article VARCHAR(100) UNIQUE NOT NULL,
  category_id VARCHAR(100) REFERENCES public.categories(id) ON DELETE RESTRICT,
  brand_id VARCHAR(100),
  condition VARCHAR(50) DEFAULT 'Brand New',
  stock INT DEFAULT 0,
  weight_kg NUMERIC(6,3) DEFAULT 0.500,
  origin_country VARCHAR(100) DEFAULT 'Dubai',
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
