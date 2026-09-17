import { getNotifications, saveNotifications } from "@/services/notificationService";
import { NotificationItem } from "@/types/notification";

export const notificationStore = {
  getAll: getNotifications,
  markAllAsRead: () => {
    const list = getNotifications().map(n => ({ ...n, isRead: true }));
    saveNotifications(list);
    window.dispatchEvent(new Event("notif_updated"));
  },
  add: (item: Omit<NotificationItem, "id" | "isRead" | "createdAt">) => {
    const list = getNotifications();
    list.unshift({
      ...item,
      id: "notif-" + Date.now(),
      isRead: false,
      createdAt: new Date().toISOString()
    });
    saveNotifications(list);
    window.dispatchEvent(new Event("notif_updated"));
  }
};
