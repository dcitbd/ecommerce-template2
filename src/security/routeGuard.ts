import { AuthUser } from "@/types/auth";

export function canAccessAdmin(user: AuthUser | null): boolean {
  if (!user) return false;
  return ["Super Admin", "Admin", "Manager", "Worker"].includes(user.role);
}

export function canAccessCustomerDashboard(user: AuthUser | null): boolean {
  return !!user;
}
