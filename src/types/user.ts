import { UserRole } from "./auth";

export interface StaffUser {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: UserRole;
  permissions: string[];
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
}
