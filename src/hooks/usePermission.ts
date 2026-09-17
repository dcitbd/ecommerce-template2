import { useAuthContext } from "@/contexts/AuthContext";
import { hasPermission } from "@/security/permissionGuard";

export const usePermission = (permission: string) => {
  const { user } = useAuthContext();
  return hasPermission(user, permission);
};
