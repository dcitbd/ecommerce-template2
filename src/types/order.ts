export type OrderStatus =
  | 'Pending'
  | 'Accepted'
  | 'Confirmed'
  | 'Sent'
  | 'IN-Courier'
  | 'Delivered'
  | 'Cancelled'
  | 'Returned';

export type DeliveryMethod = 'Home delivery' | 'Collect from Office' | 'From collection Point';
export type DeliveryArea = 'Inside Dhaka' | 'Outside Dhaka';

export interface OrderItem {
  productId: string;
  productName: string;
  article: string;
  image: string;
  selectedColor?: string;
  selectedSize?: string;
  orderType: 'Stock' | 'Pre-Order' | 'WholeSale';
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  weightKg: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId?: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryAddress: string;
  deliveryMethod: DeliveryMethod;
  deliveryArea: DeliveryArea;
  deliveryCharge: number;
  totalWeightKg: number;
  items: OrderItem[];
  subtotal: number;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: 'Unpaid' | 'Paid' | 'Partial';
  orderStatus: OrderStatus;
  orderType: 'Stock' | 'Pre-Order' | 'WholeSale';
  fraudScore?: number;
  fraudSuccessRate?: number;
  courierName?: string;
  courierTrackingCode?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IncompleteOrder {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryAddress?: string;
  items: OrderItem[];
  totalAmount: number;
  stepAbandoned: string;
  lastActive: string;
  createdAt: string;
}

export interface ReturnOrder {
  id: string;
  orderId: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  productName: string;
  returnReason: string;
  returnStatus: 'Requested' | 'Approved' | 'Received' | 'Refunded' | 'Rejected';
  refundAmount: number;
  createdAt: string;
}
