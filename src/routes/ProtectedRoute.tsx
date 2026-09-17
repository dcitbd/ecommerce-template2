import React from "react";
import { useAuth } from "@/hooks/useAuth";

export const ProtectedRoute: React.FC<{ children: React.ReactNode; fallback: React.ReactNode }> = ({ children, fallback }) => {
  const { user } = useAuth();
  if (!user) return <>{fallback}</>;
  return <>{children}</>;
};
