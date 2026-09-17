import React from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";

export const AdminProtectedRoute: React.FC<{ children: React.ReactNode; fallback: React.ReactNode }> = ({ children, fallback }) => {
  const { canAccess } = useAdminAuth();
  if (!canAccess) return <>{fallback}</>;
  return <>{children}</>;
};
