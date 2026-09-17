-- 027_payment_transactions.sql
CREATE TABLE IF NOT EXISTS public.payment_transactions (
  id SERIAL PRIMARY KEY,
  order_id VARCHAR(100) REFERENCES public.orders(id),
  trx_id VARCHAR(100),
  gateway VARCHAR(50),
  amount NUMERIC(12,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'Success',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
