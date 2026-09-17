-- Seed colors
INSERT INTO public.colors (id, name, hex_code) VALUES
('c-black', 'Black', '#111827'),
('c-silver', 'Silver', '#E5E7EB'),
('c-white', 'White', '#FFFFFF'),
('c-grey', 'Space Grey', '#4B5563')
ON CONFLICT (id) DO NOTHING;
