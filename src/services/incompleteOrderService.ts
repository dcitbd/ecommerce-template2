import { IncompleteOrder } from "@/types/order";

const INCOMPLETE_KEY = "twbd_incomplete_orders";

export const INITIAL_INCOMPLETE: IncompleteOrder[] = [
  {
    id: "inc-01",
    customerName: "Rashidul Karim",
    customerPhone: "01788990011",
    customerEmail: "rashidul@gmail.com",
    deliveryAddress: "Chawkbazar, Cumilla",
    items: [
      {
        productId: "prod-008",
        productName: "DJI Osmo Pocket 3 Creator Combo",
        article: "DJI-OP3",
        image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80",
        orderType: "Stock",
        unitPrice: 73500,
        quantity: 1,
        totalPrice: 73500,
        weightKg: 0.2
      }
    ],
    totalAmount: 73630,
    stepAbandoned: "Payment Selection",
    lastActive: "2026-09-16T15:30:00Z",
    createdAt: "2026-09-16T15:20:00Z"
  }
];

export function getIncompleteOrders(): IncompleteOrder[] {
  try {
    const raw = localStorage.getItem(INCOMPLETE_KEY);
    return raw ? JSON.parse(raw) : INITIAL_INCOMPLETE;
  } catch {
    return INITIAL_INCOMPLETE;
  }
}

export function saveIncompleteOrders(orders: IncompleteOrder[]) {
  localStorage.setItem(INCOMPLETE_KEY, JSON.stringify(orders));
}

export function removeIncompleteOrder(id: string) {
  const orders = getIncompleteOrders().filter(o => o.id !== id);
  saveIncompleteOrders(orders);
}
