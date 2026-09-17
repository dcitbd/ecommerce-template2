-- 010_product_images.sql
CREATE TABLE IF NOT EXISTS public.product_images (
  id SERIAL PRIMARY KEY,
  product_id VARCHAR(100) REFERENCES public.products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  is_cover BOOLEAN DEFAULT FALSE,
  display_order INT DEFAULT 0
);
