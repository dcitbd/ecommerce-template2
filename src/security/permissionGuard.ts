import { AuthUser } from "@/types/auth";
import { ROLE_PERMISSIONS } from "@/config/permissionConfig";

export function hasPermission(user: AuthUser | null, permission: string): boolean {
  if (!user) return false;
  const userPermissions = ROLE_PERMISSIONS[user.role] || [];
  if (userPermissions.includes("*")) return true;
  return userPermissions.some(p => {
    if (p.endsWith(".*")) {
      const prefix = p.slice(0, -2);
      return permission.startsWith(prefix);
    }
    return p === permission;
  });
}
