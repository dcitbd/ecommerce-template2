-- 017_order_items.sql
CREATE TABLE IF NOT EXISTS public.order_items (
  id SERIAL PRIMARY KEY,
  order_id VARCHAR(100) REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id VARCHAR(100) REFERENCES public.products(id),
  product_name VARCHAR(255) NOT NULL,
  article VARCHAR(100) NOT NULL,
  image_url TEXT,
  selected_color VARCHAR(50),
  selected_size VARCHAR(50),
  order_type VARCHAR(50) NOT NULL,
  unit_price NUMERIC(12,2) NOT NULL,
  quantity INT NOT NULL,
  total_price NUMERIC(12,2) NOT NULL
);
