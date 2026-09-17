import React, { createContext, useContext, useState, useEffect } from "react";
import { NotificationItem } from "@/types/notification";
import { notificationStore } from "@/store/notificationStore";

interface NotificationContextType {
  notifications: NotificationItem[];
  unreadCount: number;
  markAllRead: () => void;
  notify: (title: string, message: string, type?: NotificationItem["type"]) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(notificationStore.getAll());

  const refresh = () => setNotifications(notificationStore.getAll());

  useEffect(() => {
    window.addEventListener("notif_updated", refresh);
    return () => window.removeEventListener("notif_updated", refresh);
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAllRead: notificationStore.markAllAsRead,
        notify: (title, message, type = "system") => notificationStore.add({ title, message, type })
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotificationContext must be used within NotificationProvider");
  return ctx;
};
