-- 012_product_stock.sql
CREATE TABLE IF NOT EXISTS public.product_stock_logs (
  id SERIAL PRIMARY KEY,
  product_id VARCHAR(100) REFERENCES public.products(id) ON DELETE CASCADE,
  quantity_change INT NOT NULL,
  reason VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
