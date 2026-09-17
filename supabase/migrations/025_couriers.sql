-- 025_couriers.sql
CREATE TABLE IF NOT EXISTS public.couriers (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  api_key TEXT,
  api_secret TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  is_default BOOLEAN DEFAULT FALSE
);
