# Admin Roles & Permissions

| Role | Scope | Permissions |
|---|---|---|
| **Super Admin** | Full System | `*` (All permissions, settings, staff creation) |
| **Admin** | Business Management | `products.*`, `orders.*`, `customers.*`, `courier.*`, `fraud.*` |
| **Manager** | Operations | `products.create`, `products.edit`, `orders.*`, `fraud.check` |
| **Worker** | Logistics | `orders.view`, `orders.edit`, `products.view` |
