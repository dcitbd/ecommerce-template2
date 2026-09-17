-- 018_order_status_history.sql
CREATE TABLE IF NOT EXISTS public.order_status_history (
  id SERIAL PRIMARY KEY,
  order_id VARCHAR(100) REFERENCES public.orders(id) ON DELETE CASCADE,
  status VARCHAR(50) NOT NULL,
  changed_by VARCHAR(100),
  changed_at TIMESTAMPTZ DEFAULT NOW()
);
