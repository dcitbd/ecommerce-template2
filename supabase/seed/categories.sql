-- Seed categories
INSERT INTO public.categories (id, name, slug, level) VALUES
('cat-cameras', 'Digital Cameras', 'digital-cameras', 1),
('cat-lenses', 'Camera Lenses', 'camera-lenses', 1),
('cat-gimbals', 'Gimbals & Action', 'gimbals-action', 1),
('cat-lighting', 'Studio & Lighting', 'studio-lighting', 1),
('cat-audio', 'Wireless Microphones', 'wireless-microphones', 1)
ON CONFLICT (id) DO NOTHING;
