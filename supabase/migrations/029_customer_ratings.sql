-- 029_customer_ratings.sql
CREATE TABLE IF NOT EXISTS public.customer_ratings (
  customer_id VARCHAR(100) PRIMARY KEY,
  score_percentage INT DEFAULT 100,
  tier VARCHAR(50) DEFAULT 'Gold Verified'
);
