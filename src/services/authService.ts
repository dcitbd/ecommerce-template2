import { AuthUser, UserRole } from "@/types/auth";
import { logAuditAction } from "@/security/auditLogger";

const AUTH_USER_KEY = "twbd_authenticated_user";

export function getCurrentUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function loginUser(phone: string, role: UserRole = "Customer", name?: string): AuthUser {
  const user: AuthUser = {
    id: "usr-" + Date.now(),
    name: name || (role === "Super Admin" ? "Jainal Abedin" : "Valued Customer"),
    phone,
    email: `${phone}@technoworldbd.com`,
    role,
    avatar: "/public/images/default-avatar.webp"
  };
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  logAuditAction(user.id, user.name, user.role, "User Login", `Logged in with role: ${role}`);
  return user;
}

export function logoutUser(): void {
  const user = getCurrentUser();
  if (user) {
    logAuditAction(user.id, user.name, user.role, "User Logout", "Logged out from session");
  }
  localStorage.removeItem(AUTH_USER_KEY);
}
