-- Seed delivery
INSERT INTO public.delivery_areas (id, name, base_charge, per_kg_over_one) VALUES
('inside_dhaka', 'Inside Dhaka', 90.00, 20.00),
('outside_dhaka', 'Outside Dhaka', 130.00, 20.00)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.delivery_methods (id, title, free_shipping) VALUES
('home', 'Home delivery', false),
('office', 'Collect from Office', true),
('point', 'From collection Point', false)
ON CONFLICT (id) DO NOTHING;
