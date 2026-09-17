export interface RolePermission {
  role: string;
  allowedRoutes: string[];
  actions: string[]; // 'create', 'edit', 'delete', 'view'
}
