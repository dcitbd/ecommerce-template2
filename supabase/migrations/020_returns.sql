-- 020_returns.sql
CREATE TABLE IF NOT EXISTS public.returns (
  id VARCHAR(100) PRIMARY KEY,
  order_id VARCHAR(100) REFERENCES public.orders(id),
  order_number VARCHAR(100) NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50) NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  return_reason TEXT NOT NULL,
  return_status VARCHAR(50) DEFAULT 'Requested',
  refund_amount NUMERIC(12,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
