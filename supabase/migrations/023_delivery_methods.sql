-- 023_delivery_methods.sql
CREATE TABLE IF NOT EXISTS public.delivery_methods (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  free_shipping BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE
);
