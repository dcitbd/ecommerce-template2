import { Order, OrderStatus } from "@/types/order";
import { generateOrderNumber } from "@/utils/orderNumberGenerator";

const ORDERS_KEY = "twbd_orders_data";

export const INITIAL_ORDERS: Order[] = [
  {
    id: "ord-101",
    orderNumber: "TWBD-260915-8821",
    customerId: "cust-01",
    customerName: "Mahmudul Hasan",
    customerPhone: "01711223344",
    customerEmail: "mahmudul@example.com",
    deliveryAddress: "House 12, Road 4, Sector 7, Uttara, Dhaka",
    deliveryMethod: "Home delivery",
    deliveryArea: "Inside Dhaka",
    deliveryCharge: 90,
    totalWeightKg: 0.85,
    items: [
      {
        productId: "prod-001",
        productName: "Sony Alpha A7 IV Mirrorless Camera",
        article: "SN-A7M4",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
        selectedColor: "Black",
        selectedSize: "Body Only",
        orderType: "Stock",
        unitPrice: 248000,
        quantity: 1,
        totalPrice: 248000,
        weightKg: 0.85
      }
    ],
    subtotal: 248000,
    totalAmount: 248090,
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Unpaid",
    orderStatus: "Confirmed",
    orderType: "Stock",
    fraudScore: 88,
    fraudSuccessRate: 92,
    courierName: "Steadfast",
    courierTrackingCode: "STDF-992144",
    createdAt: "2026-09-15T08:30:00Z",
    updatedAt: "2026-09-15T11:00:00Z"
  },
  {
    id: "ord-102",
    orderNumber: "TWBD-260914-4112",
    customerId: "cust-02",
    customerName: "Tanvir Ahmed",
    customerPhone: "01822334455",
    customerEmail: "tanvir@example.com",
    deliveryAddress: "সোনাইমুড়ী মধ্যবাজার, সোনাইমুড়ী বরুড়া, কুমিল্লা",
    deliveryMethod: "Home delivery",
    deliveryArea: "Outside Dhaka",
    deliveryCharge: 130,
    totalWeightKg: 0.35,
    items: [
      {
        productId: "prod-002",
        productName: "Canon PowerShot G7 X Mark III",
        article: "CN-G7X3",
        image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80",
        selectedColor: "Black",
        selectedSize: "Standard Kit",
        orderType: "Pre-Order",
        unitPrice: 77000,
        quantity: 1,
        totalPrice: 77000,
        weightKg: 0.35
      }
    ],
    subtotal: 77000,
    totalAmount: 77130,
    paymentMethod: "bKash",
    paymentStatus: "Paid",
    orderStatus: "Pending",
    orderType: "Pre-Order",
    fraudScore: 75,
    fraudSuccessRate: 85,
    createdAt: "2026-09-14T14:20:00Z",
    updatedAt: "2026-09-14T14:20:00Z"
  },
  {
    id: "ord-103",
    orderNumber: "TWBD-260912-1092",
    customerId: "cust-03",
    customerName: "Digital Corner Wholesale",
    customerPhone: "01933445566",
    customerEmail: "digitalcorner@gmail.com",
    deliveryAddress: "Shop 45, Stadium Market, Chattogram",
    deliveryMethod: "Home delivery",
    deliveryArea: "Outside Dhaka",
    deliveryCharge: 210, // 4.5kg: 130 + 4*20 = 210
    totalWeightKg: 4.5,
    items: [
      {
        productId: "prod-010",
        productName: "Godox V1 Round Head Camera Flash",
        article: "GDX-V1",
        image: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=800&q=80",
        selectedColor: "Black",
        selectedSize: "For Sony",
        orderType: "WholeSale",
        unitPrice: 20500,
        quantity: 10,
        totalPrice: 205000,
        weightKg: 0.45
      }
    ],
    subtotal: 205000,
    totalAmount: 205210,
    paymentMethod: "Bank Transfer / Dollar",
    paymentStatus: "Paid",
    orderStatus: "Delivered",
    orderType: "WholeSale",
    fraudScore: 98,
    fraudSuccessRate: 98,
    courierName: "Sundarban",
    courierTrackingCode: "SND-771239",
    createdAt: "2026-09-12T09:15:00Z",
    updatedAt: "2026-09-15T16:00:00Z"
  }
];

export function getOrders(): Order[] {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    if (!raw) {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_ORDERS;
  }
}

export function saveOrders(orders: Order[]) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export function addOrder(orderData: Omit<Order, "id" | "orderNumber" | "createdAt" | "updatedAt">): Order {
  const orders = getOrders();
  const newOrder: Order = {
    ...orderData,
    id: "ord-" + Date.now(),
    orderNumber: generateOrderNumber(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  orders.unshift(newOrder);
  saveOrders(orders);
  return newOrder;
}

export function updateOrderStatus(orderId: string, status: OrderStatus): Order | null {
  const orders = getOrders();
  const index = orders.findIndex(o => o.id === orderId);
  if (index === -1) return null;
  orders[index].orderStatus = status;
  orders[index].updatedAt = new Date().toISOString();
  saveOrders(orders);
  return orders[index];
}

export function updateOrder(orderId: string, updates: Partial<Order>): Order | null {
  const orders = getOrders();
  const index = orders.findIndex(o => o.id === orderId);
  if (index === -1) return null;
  orders[index] = { ...orders[index], ...updates, updatedAt: new Date().toISOString() };
  saveOrders(orders);
  return orders[index];
}

export function deleteOrder(orderId: string): boolean {
  const orders = getOrders();
  const filtered = orders.filter(o => o.id !== orderId);
  if (filtered.length === orders.length) return false;
  saveOrders(filtered);
  return true;
}
