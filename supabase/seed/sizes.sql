-- Seed sizes
INSERT INTO public.sizes (id, name) VALUES
('sz-body', 'Body Only'),
('sz-kit-24-70', '24-70mm Kit'),
('sz-kit-28-70', '28-70mm Kit'),
('sz-creator-combo', 'Creator Combo'),
('sz-standard', 'Standard Pack')
ON CONFLICT (id) DO NOTHING;
