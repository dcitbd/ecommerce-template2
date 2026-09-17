import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { hasPermission } from "@/security/permissionGuard";

export const RoleProtectedRoute: React.FC<{
  permission: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}> = ({ permission, children, fallback = null }) => {
  const { user } = useAuth();
  if (!hasPermission(user, permission)) {
    return <>{fallback}</>;
  }
  return <>{children}</>;
};
