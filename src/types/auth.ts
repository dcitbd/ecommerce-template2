export type UserRole = 'Super Admin' | 'Admin' | 'Manager' | 'Worker' | 'Customer';

export interface AuthUser {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: UserRole;
  avatar?: string;
  token?: string;
  permissions?: string[];
}
