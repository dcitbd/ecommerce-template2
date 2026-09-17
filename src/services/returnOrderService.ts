import { ReturnOrder } from "@/types/order";

const RETURNS_KEY = "twbd_return_orders";

export const INITIAL_RETURNS: ReturnOrder[] = [
  {
    id: "ret-01",
    orderId: "ord-99",
    orderNumber: "TWBD-260905-3211",
    customerName: "Kamrul Islam",
    customerPhone: "01611002233",
    productName: "GoPro HERO12 Black",
    returnReason: "Wrong kit selected by mistake",
    returnStatus: "Received",
    refundAmount: 45000,
    createdAt: "2026-09-10T12:00:00Z"
  }
];

export function getReturnOrders(): ReturnOrder[] {
  try {
    const raw = localStorage.getItem(RETURNS_KEY);
    return raw ? JSON.parse(raw) : INITIAL_RETURNS;
  } catch {
    return INITIAL_RETURNS;
  }
}

export function saveReturnOrders(orders: ReturnOrder[]) {
  localStorage.setItem(RETURNS_KEY, JSON.stringify(orders));
}
