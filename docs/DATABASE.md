# Database Architecture & Supabase Schema

The database model is organized into 37 migration files (`supabase/migrations/`):
1. **Users & Auth**: `001_profiles.sql`, `002_roles.sql`, `003_permissions.sql`, `004_role_permissions.sql`
2. **Catalog & Taxonomy**: `005_categories.sql` to `013_banners.sql`
3. **Cart & Wishlist**: `014_carts.sql`, `015_wishlists.sql`
4. **Orders & History**: `016_orders.sql`, `017_order_items.sql`, `018_order_status_history.sql`, `019_incomplete_orders.sql`, `020_returns.sql`
5. **Customer CRM & Ratings**: `021_reviews.sql`, `022_customer_addresses.sql`, `028_fraud_checks.sql`, `029_customer_ratings.sql`
6. **Logistics & Payments**: `023_delivery_methods.sql`, `024_delivery_areas.sql`, `025_couriers.sql`, `026_payment_methods.sql`, `027_payment_transactions.sql`
7. **Audit & Settings**: `031_notifications.sql`, `032_activity_logs.sql`, `033_settings.sql`, `037_audit_logs.sql`
