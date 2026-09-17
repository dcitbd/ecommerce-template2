-- Seed roles
INSERT INTO public.roles (id, name, description) VALUES
(1, 'Super Admin', 'Full system access and settings control'),
(2, 'Admin', 'Management of products, orders, and couriers'),
(3, 'Manager', 'Order processing and product updates'),
(4, 'Worker', 'Order packing and delivery status updates'),
(5, 'Customer', 'Public user purchasing goods')
ON CONFLICT (id) DO NOTHING;
