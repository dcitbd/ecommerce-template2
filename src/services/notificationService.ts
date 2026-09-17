import { NotificationItem } from "@/types/notification";

const NOTIF_KEY = "twbd_notifications";

export const INITIAL_NOTIFS: NotificationItem[] = [
  {
    id: "notif-01",
    title: "নতুন পাইকারি অর্ডার!",
    message: "Digital Corner Wholesale থেকে ১০ পিস গোডক্স স্পিডলাইটের অর্ডার এসেছে।",
    type: "order",
    isRead: false,
    createdAt: new Date().toISOString()
  },
  {
    id: "notif-02",
    title: "স্টক সতর্কতা",
    message: "Canon EOS R6 Mark II এর স্টক কমে ৮ পিস হয়েছে।",
    type: "inventory",
    isRead: false,
    createdAt: new Date().toISOString()
  }
];

export function getNotifications(): NotificationItem[] {
  try {
    const raw = localStorage.getItem(NOTIF_KEY);
    return raw ? JSON.parse(raw) : INITIAL_NOTIFS;
  } catch {
    return INITIAL_NOTIFS;
  }
}

export function saveNotifications(notifs: NotificationItem[]) {
  localStorage.setItem(NOTIF_KEY, JSON.stringify(notifs));
}
