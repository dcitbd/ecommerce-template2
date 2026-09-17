-- 026_payment_methods.sql
CREATE TABLE IF NOT EXISTS public.payment_methods (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  code VARCHAR(50) NOT NULL,
  account_number VARCHAR(100),
  is_online BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  is_default BOOLEAN DEFAULT FALSE
);
