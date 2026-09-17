import { getCurrentUser, loginUser, logoutUser } from "@/services/authService";
import { AuthUser, UserRole } from "@/types/auth";

export const authStore = {
  getUser: () => getCurrentUser(),
  login: (phone: string, role?: UserRole, name?: string) => loginUser(phone, role, name),
  logout: () => logoutUser(),
};
