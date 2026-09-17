-- 005_categories.sql
CREATE TABLE IF NOT EXISTS public.categories (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  parent_id VARCHAR(100) REFERENCES public.categories(id) ON DELETE SET NULL,
  level INT DEFAULT 1, -- 1: Main, 2: Sub, 3: Child
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
