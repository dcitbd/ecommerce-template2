-- 022_customer_addresses.sql
CREATE TABLE IF NOT EXISTS public.customer_addresses (
  id SERIAL PRIMARY KEY,
  customer_id VARCHAR(100),
  title VARCHAR(100) DEFAULT 'Home',
  address TEXT NOT NULL,
  city VARCHAR(100),
  is_default BOOLEAN DEFAULT TRUE
);
