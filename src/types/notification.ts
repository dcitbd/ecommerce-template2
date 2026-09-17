export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'customer' | 'inventory' | 'fraud' | 'system';
  link?: string;
  isRead: boolean;
  createdAt: string;
}
