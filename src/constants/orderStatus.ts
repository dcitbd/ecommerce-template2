import { OrderStatus } from "@/types/order";

export const ORDER_STATUSES: OrderStatus[] = [
  'Pending',
  'Accepted',
  'Confirmed',
  'Sent',
  'IN-Courier',
  'Delivered',
  'Cancelled',
  'Returned',
];

export const ORDER_STATUS_COLORS: Record<OrderStatus, { bg: string; text: string; border: string }> = {
  Pending: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  Accepted: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  Confirmed: { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200" },
  Sent: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
  "IN-Courier": { bg: "bg-cyan-50", text: "text-cyan-700", border: "border-cyan-200" },
  Delivered: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  Cancelled: { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200" },
  Returned: { bg: "bg-slate-100", text: "text-slate-700", border: "border-slate-300" },
};
