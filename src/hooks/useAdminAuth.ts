import { useAuthContext } from "@/contexts/AuthContext";
import { canAccessAdmin } from "@/security/routeGuard";

export const useAdminAuth = () => {
  const { user, isAdmin } = useAuthContext();
  return {
    user,
    isAdmin,
    canAccess: canAccessAdmin(user),
  };
};
