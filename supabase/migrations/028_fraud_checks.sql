-- 028_fraud_checks.sql
CREATE TABLE IF NOT EXISTS public.fraud_checks (
  phone VARCHAR(50) PRIMARY KEY,
  total_parcels INT DEFAULT 0,
  delivered_parcels INT DEFAULT 0,
  returned_parcels INT DEFAULT 0,
  success_rate NUMERIC(5,2) DEFAULT 100.0,
  risk_status VARCHAR(50) DEFAULT 'No Risk',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
