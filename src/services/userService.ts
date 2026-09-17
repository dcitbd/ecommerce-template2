import { StaffUser } from "@/types/user";

export const INITIAL_USERS: StaffUser[] = [
  {
    id: "usr-01",
    name: "Jainal Abedin",
    phone: "01351003958",
    email: "jainal@technoworldbangladesh.com",
    role: "Super Admin",
    permissions: ["*"],
    isActive: true,
    createdAt: "2026-01-01T00:00:00Z"
  },
  {
    id: "usr-02",
    name: "Operations Manager",
    phone: "01333301363",
    email: "manager@technoworldbangladesh.com",
    role: "Manager",
    permissions: ["products.*", "orders.*", "customers.*"],
    isActive: true,
    createdAt: "2026-03-01T00:00:00Z"
  },
  {
    id: "usr-03",
    name: "Order Processing Executive",
    phone: "01351009358",
    email: "staff@technoworldbangladesh.com",
    role: "Worker",
    permissions: ["orders.view", "orders.edit"],
    isActive: true,
    createdAt: "2026-05-01T00:00:00Z"
  }
];

export function getStaffUsers(): StaffUser[] {
  try {
    const raw = localStorage.getItem("twbd_staff_users");
    return raw ? JSON.parse(raw) : INITIAL_USERS;
  } catch {
    return INITIAL_USERS;
  }
}

export function saveStaffUsers(users: StaffUser[]) {
  localStorage.setItem("twbd_staff_users", JSON.stringify(users));
}
