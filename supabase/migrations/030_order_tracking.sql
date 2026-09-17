-- 030_order_tracking.sql
CREATE TABLE IF NOT EXISTS public.order_tracking (
  id SERIAL PRIMARY KEY,
  order_number VARCHAR(100) REFERENCES public.orders(order_number) ON DELETE CASCADE,
  status VARCHAR(50) NOT NULL,
  location VARCHAR(255),
  remarks TEXT,
  tracked_at TIMESTAMPTZ DEFAULT NOW()
);
