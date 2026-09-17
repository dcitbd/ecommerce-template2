-- 036_product_views.sql
CREATE TABLE IF NOT EXISTS public.product_views (
  id BIGSERIAL PRIMARY KEY,
  product_id VARCHAR(100) REFERENCES public.products(id) ON DELETE CASCADE,
  viewed_at TIMESTAMPTZ DEFAULT NOW()
);
