-- 037_audit_logs.sql
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id BIGSERIAL PRIMARY KEY,
  table_name VARCHAR(100) NOT NULL,
  operation VARCHAR(20) NOT NULL, -- INSERT, UPDATE, DELETE
  old_data JSONB,
  new_data JSONB,
  performed_by VARCHAR(100),
  performed_at TIMESTAMPTZ DEFAULT NOW()
);
