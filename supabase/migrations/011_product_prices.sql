-- 011_product_prices.sql
CREATE TABLE IF NOT EXISTS public.product_prices (
  product_id VARCHAR(100) PRIMARY KEY REFERENCES public.products(id) ON DELETE CASCADE,
  mrp NUMERIC(12,2) NOT NULL,
  stock_price NUMERIC(12,2),
  pre_order_price NUMERIC(12,2),
  wholesale_price NUMERIC(12,2),
  min_wholesale_qty INT DEFAULT 10
);
