-- Seed brands
INSERT INTO public.brands (id, name, slug, origin_country) VALUES
('b-sony', 'Sony', 'sony', 'Japan'),
('b-canon', 'Canon', 'canon', 'Japan'),
('b-nikon', 'Nikon', 'nikon', 'Japan'),
('b-fuji', 'Fujifilm', 'fujifilm', 'Japan'),
('b-sigma', 'Sigma', 'sigma', 'Japan'),
('b-dji', 'DJI', 'dji', 'China'),
('b-godox', 'Godox', 'godox', 'China'),
('b-gopro', 'GoPro', 'gopro', 'USA')
ON CONFLICT (id) DO NOTHING;
