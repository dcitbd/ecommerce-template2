-- 019_incomplete_orders.sql
CREATE TABLE IF NOT EXISTS public.incomplete_orders (
  id VARCHAR(100) PRIMARY KEY,
  customer_name VARCHAR(255),
  customer_phone VARCHAR(50),
  customer_email VARCHAR(255),
  delivery_address TEXT,
  cart_payload JSONB,
  total_amount NUMERIC(12,2),
  step_abandoned VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
