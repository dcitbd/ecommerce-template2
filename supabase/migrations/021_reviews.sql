-- 021_reviews.sql
CREATE TABLE IF NOT EXISTS public.reviews (
  id VARCHAR(100) PRIMARY KEY,
  product_id VARCHAR(100) REFERENCES public.products(id) ON DELETE CASCADE,
  customer_name VARCHAR(255) NOT NULL,
  rating INT CHECK (rating BETWEEN 1 AND 5),
  comment TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
