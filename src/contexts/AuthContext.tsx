import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthUser, UserRole } from "@/types/auth";
import { getCurrentUser, loginUser, logoutUser } from "@/services/authService";

interface AuthContextType {
  user: AuthUser | null;
  login: (phone: string, role?: UserRole, name?: string) => void;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(getCurrentUser());

  useEffect(() => {
    const handleStorage = () => setUser(getCurrentUser());
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const login = (phone: string, role?: UserRole, name?: string) => {
    const u = loginUser(phone, role, name);
    setUser(u);
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  const isAdmin = !!user && ["Super Admin", "Admin", "Manager", "Worker"].includes(user.role);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
};
