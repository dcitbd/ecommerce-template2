export const ROLE_PERMISSIONS: Record<string, string[]> = {
  "Super Admin": ["*"],
  "Admin": [
    "products.*",
    "orders.*",
    "customers.*",
    "fraud.*",
    "courier.*",
    "categories.*",
    "brands.*",
    "settings.*",
    "activity.view"
  ],
  "Manager": [
    "products.view",
    "products.create",
    "products.edit",
    "orders.view",
    "orders.edit",
    "customers.view",
    "fraud.check"
  ],
  "Worker": [
    "orders.view",
    "orders.edit",
    "products.view"
  ]
};
