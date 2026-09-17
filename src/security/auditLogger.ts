import { ActivityLog } from "@/types/activity";

const AUDIT_STORAGE_KEY = "twbd_activity_logs";

export function logAuditAction(
  userId: string,
  userName: string,
  userRole: string,
  action: string,
  details: string
): void {
  try {
    const raw = localStorage.getItem(AUDIT_STORAGE_KEY);
    const logs: ActivityLog[] = raw ? JSON.parse(raw) : [];
    const newLog: ActivityLog = {
      id: "LOG-" + Date.now() + "-" + Math.floor(Math.random() * 1000),
      userId,
      userName,
      userRole,
      action,
      details,
      createdAt: new Date().toISOString(),
    };
    logs.unshift(newLog);
    localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(logs.slice(0, 500)));
  } catch (err) {
    console.error("Audit log error:", err);
  }
}
