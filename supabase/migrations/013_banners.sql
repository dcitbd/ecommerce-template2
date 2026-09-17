-- 013_banners.sql
CREATE TABLE IF NOT EXISTS public.banners (
  id VARCHAR(100) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  subtitle TEXT,
  badge VARCHAR(100),
  image_url TEXT NOT NULL,
  link_url TEXT NOT NULL,
  display_order INT DEFAULT 1,
  is_active BOOLEAN DEFAULT TRUE
);
