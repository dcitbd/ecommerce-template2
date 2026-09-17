-- 033_settings.sql
CREATE TABLE IF NOT EXISTS public.settings (
  key VARCHAR(100) PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
