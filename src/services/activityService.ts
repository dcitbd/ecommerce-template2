import { ActivityLog } from "@/types/activity";

const AUDIT_STORAGE_KEY = "twbd_activity_logs";

export function getActivityLogs(): ActivityLog[] {
  try {
    const raw = localStorage.getItem(AUDIT_STORAGE_KEY);
    if (!raw) {
      const initial: ActivityLog[] = [
        {
          id: "LOG-INIT-1",
          userId: "usr-01",
          userName: "Jainal Abedin",
          userRole: "Super Admin",
          action: "System Initialization",
          details: "Techno World BD Store launched with 12 flagship cameras & lenses.",
          createdAt: new Date().toISOString()
        }
      ];
      localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
}
