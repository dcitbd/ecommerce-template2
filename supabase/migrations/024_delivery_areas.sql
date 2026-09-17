-- 024_delivery_areas.sql
CREATE TABLE IF NOT EXISTS public.delivery_areas (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  base_charge NUMERIC(10,2) NOT NULL,
  per_kg_over_one NUMERIC(10,2) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE
);
